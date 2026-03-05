import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import createMemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const MemoryStore = createMemoryStore(session);

declare global {
  namespace Express {
    interface User extends import("@shared/schema").User {}
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session & Auth Setup
  app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 86400000 }),
    cookie: { secure: app.get("env") === "production" }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await storage.getUserByEmail(email);
      if (!user || user.passwordHash !== password) { // Note: Simple password matching for MVP
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    next();
  };

  // Auth Routes
  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existing = await storage.getUserByEmail(input.email);
      if (existing) {
        return res.status(400).json({ message: "O e-mail já existe" });
      }
      const user = await storage.createUser({
        email: input.email,
        passwordHash: input.password, // Plain text for MVP (use bcrypt in production)
        name: input.name,
      });
      req.login(user, (err) => {
        if (err) throw err;
        const { passwordHash, ...safeUser } = user;
        res.status(201).json(safeUser);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  app.post(api.auth.login.path, passport.authenticate("local"), (req, res) => {
    const { passwordHash, ...safeUser } = req.user!;
    res.status(200).json(safeUser);
  });

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Desconectado" });
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Não autorizado" });
    const { passwordHash, ...safeUser } = req.user!;
    res.status(200).json(safeUser);
  });

  // Questions Routes
  app.get(api.questions.list.path, requireAuth, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const subject = req.query.subject as string | undefined;
      const topic = req.query.topic as string | undefined;
      
      const questions = await storage.getQuestions(limit, subject, topic);
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar questões" });
    }
  });

  app.get(api.questions.subjects.path, requireAuth, async (req, res) => {
    const subjects = await storage.getSubjects();
    res.status(200).json(subjects);
  });

  app.get(api.questions.topics.path, requireAuth, async (req, res) => {
    const subject = req.query.subject as string | undefined;
    const topics = await storage.getTopics(subject);
    res.status(200).json(topics);
  });

  // Exam Routes
  app.post(api.exams.submit.path, requireAuth, async (req, res) => {
    try {
      const input = api.exams.submit.input.parse(req.body);
      const result = await storage.submitExam(req.user!.id, input);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Formato de envio inválido" });
      } else {
        res.status(500).json({ message: "Falha ao processar envio do exame" });
      }
    }
  });

  app.get(api.exams.history.path, requireAuth, async (req, res) => {
    const history = await storage.getExamHistory(req.user!.id);
    res.status(200).json(history);
  });

  // Progress Route
  app.get(api.progress.get.path, requireAuth, async (req, res) => {
    const progress = await storage.getProgress(req.user!.id);
    if (!progress) return res.status(404).json({ message: "Progresso não encontrado" });
    res.status(200).json(progress);
  });

  // AI Route
  app.post(api.ai.explain.path, requireAuth, async (req, res) => {
    try {
      const input = api.ai.explain.input.parse(req.body);
      const question = await storage.getQuestion(input.questionId);
      
      if (!question) return res.status(404).json({ message: "Questão não encontrada" });
      
      // MOCK AI Integration
      const mockAiExplanation = `Aqui está uma explicação detalhada personalizada para você:\n\nO conceito correto gira em torno de "${question.topic}" dentro de "${question.subject === 'Portuguese' ? 'Português' : question.subject === 'Specialized IT Knowledge' ? 'Conhecimentos Especializados de TI' : question.subject}". ${question.explanation}\n\nCompreender isso é fundamental para o exame EAGS SIN.`;
      
      res.status(200).json({ explanation: mockAiExplanation });
    } catch (err) {
      res.status(400).json({ message: "Solicitação inválida" });
    }
  });

  // Seed Database with initial data
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const questions = await storage.getQuestions(1);
  if (questions.length === 0) {
    const seedQuestions = [
      {
        subject: "Specialized IT Knowledge",
        topic: "Linux",
        questionText: "Linux: Permissão '-rwxr-x---' em octal?",
        options: ["750", "751", "754", "777"],
        correctOption: 0,
        explanation: "Dono(7)+Grupo(5)+Outros(0)."
      },
      {
        subject: "Portuguese",
        topic: "Regência",
        questionText: "Regência 'Aspirar' (desejar)?",
        options: ["VTD", "VTI (exige 'a')", "Intransitivo", "VTI (exige 'de')"],
        correctOption: 1,
        explanation: "Aspirar ao cargo."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "SQL",
        questionText: "SQL: Apagar tabela completa?",
        options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
        correctOption: 2,
        explanation: "DROP TABLE remove estrutura e dados."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "Hosts em /27?",
        options: ["32", "30", "16", "14"],
        correctOption: 1,
        explanation: "32 IPs - 2 = 30 Hosts."
      },
      {
        subject: "Portuguese",
        topic: "Crase",
        questionText: "Crase obrigatória?",
        options: ["Fui a pé", "Vou à escola", "Falei a ela", "Venda a prazo"],
        correctOption: 1,
        explanation: "Vou a + a escola."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "Transporte confiável?",
        options: ["UDP", "IP", "TCP", "ICMP"],
        correctOption: 2,
        explanation: "TCP garante entrega."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Hardware",
        questionText: "Diferença M.2 SATA vs NVMe?",
        options: ["NVMe usa PCIe (rápido)", "Iguais", "SATA mais rápido", "USB"],
        correctOption: 0,
        explanation: "NVMe via PCIe é superior."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Hardware",
        questionText: "Selo 80 Plus?",
        options: ["80% potência", "Eficiência >= 80%", "80 Volts", "Durabilidade"],
        correctOption: 1,
        explanation: "Eficiência energética."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Hardware",
        questionText: "Hyper-Threading?",
        options: ["Overclock", "2 threads por núcleo", "Virtualização", "Cache"],
        correctOption: 1,
        explanation: "Simula núcleos lógicos."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Hardware",
        questionText: "Bateria CR2032?",
        options: ["CPU", "BIOS/Relógio", "LED", "SSD"],
        correctOption: 1,
        explanation: "Mantém CMOS."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "STP (Spanning Tree)?",
        options: ["Velocidade", "Evitar loops L2", "Roteamento", "Cripto"],
        correctOption: 1,
        explanation: "Evita broadcast storms."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "IP APIPA?",
        options: ["192.168.x.x", "10.x.x.x", "169.254.x.x", "172.16.x.x"],
        correctOption: 2,
        explanation: "Sem DHCP."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "Wi-Fi 6 (802.11ax)?",
        options: ["Alcance", "2.4GHz só", "Eficiência (OFDMA)", "Segurança"],
        correctOption: 2,
        explanation: "Alta densidade."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "Porta Tronco (Cisco)?",
        options: ["access", "trunk", "vlan", "interface"],
        correctOption: 1,
        explanation: "switchport mode trunk."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Redes",
        questionText: "Default Gateway?",
        options: ["DNS", "Roteador de saída", "Broadcast", "Máscara"],
        correctOption: 1,
        explanation: "Saída para internet."
      }
    ];
    
    for (const q of seedQuestions) {
      await storage.createQuestion(q);
    }
    console.log("Banco de dados preenchido com as novas questões.");
  }
}
