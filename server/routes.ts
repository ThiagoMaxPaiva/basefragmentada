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
  const questionsCount = await storage.getQuestions();
  if (questionsCount.length === 0) {
    const subjects = ["Portuguese", "Specialized IT Knowledge"];
    const topics: Record<string, string[]> = {
      "Portuguese": ["Sintaxe", "Morfologia", "Ortografia", "Pontuação", "Regência", "Concordância", "Semântica", "Interpretação"],
      "Specialized IT Knowledge": ["Redes", "Hardware", "Sistemas Operacionais", "Bancos de Dados", "Engenharia de Software", "Segurança", "Desenvolvimento Web", "Lógica de Programação"]
    };

    for (let i = 0; i < 100; i++) {
      const subject = subjects[i % 2];
      const topicList = topics[subject];
      const topic = topicList[Math.floor(Math.random() * topicList.length)];
      
      await storage.createQuestion({
        subject,
        topic,
        questionText: `[Simulado ${i + 1}] Questão técnica de ${topic} seguindo o padrão da banca da Aeronáutica (EAGS SIN). Analise as opções abaixo:`,
        options: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
        correctOption: Math.floor(Math.random() * 4),
        explanation: `Esta é uma questão simulada de ${topic}. No padrão EAGS, é fundamental dominar os conceitos base de ${subject} para garantir a aprovação.`
      });
    }
    console.log("Banco de dados populado com 100 questões simuladas.");
  }
}
