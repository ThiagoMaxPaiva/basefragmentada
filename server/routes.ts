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
        subject: "Portuguese",
        topic: "Interpretação de Texto",
        questionText: "No texto 'O pulo do gato', no terceiro parágrafo, o autor narra um episódio fictício. Pode-se depreender que sua intenção é:",
        options: [
          "denunciar crimes bárbaros que acontecem sem que a população saiba.",
          "mostrar que não é necessário usar adjetivos para emocionar.",
          "exemplificar o pulo do gato, numa referência ao título.",
          "mostrar que um texto pode ser racional e frio."
        ],
        correctOption: 1,
        explanation: "O autor usa o exemplo para demonstrar que a crueza dos fatos dispensa adjetivação para causar impacto emocional."
      },
      {
        subject: "Portuguese",
        topic: "Regência Nominal",
        questionText: "Assinale a alternativa que apresenta desvio de norma padrão em relação à regência nominal:",
        options: [
          "Era um homem ambicioso com a fama. Não descansava sua mente.",
          "A moça era filha da melhor doceira que já existira na região.",
          "Evidente era mais a curiosidade em dizer do que em saber.",
          "Estava tão atarefada em encomendas! Suas mãos sabiam."
        ],
        correctOption: 0,
        explanation: "O adjetivo 'ambicioso' costuma reger a preposição 'de' (ambicioso de fama)."
      },
      {
        subject: "Portuguese",
        topic: "Sintaxe",
        questionText: "Respeitando-se a ordem natural dos termos sintáticos, qual o termo faltante na frase 'No teu colo é o meu abrigo'?",
        options: [
          "Sujeito",
          "Objeto direto",
          "Adjunto adnominal",
          "Predicativo do sujeito"
        ],
        correctOption: 0,
        explanation: "Na ordem direta seria 'O meu abrigo é no teu colo', onde 'O meu abrigo' é o sujeito."
      },
      {
        subject: "Portuguese",
        topic: "Fonética",
        questionText: "Na frase 'Desde os cinco anos merecera eu a alcunha de menino do diabo...', sobre os encontros vocálicos, é correto afirmar que:",
        options: [
          "oito são ditongos crescentes e três são hiatos.",
          "oito são ditongos decrescentes e dois são hiatos.",
          "sete são ditongos decrescentes, um é ditongo crescente e dois são hiatos.",
          "sete são ditongos decrescentes, dois são ditongos crescentes e dois são hiatos."
        ],
        correctOption: 3,
        explanation: "Análise dos encontros vocálicos nas palavras do trecho de Machado de Assis."
      },
      {
        subject: "Portuguese",
        topic: "Concordância Verbal",
        questionText: "Assinale a alternativa que apresenta a concordância verbal correta:",
        options: [
          "Talvez houvessem motivos justos para sua atitude.",
          "Foi encontrado um livro, dois cadernos e um estojo no pátio.",
          "Dois átomos de hidrogênio e um de oxigênio compõe a molécula.",
          "Vai restar, até a semana que vem, apenas alguns poucos exemplares."
        ],
        correctOption: 1,
        explanation: "O verbo 'ser' pode concordar com o primeiro elemento do sujeito composto quando este vem posposto."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Linux",
        questionText: "Linux: Permissão '-rwxr-x---' em octal?",
        options: ["750", "751", "754", "777"],
        correctOption: 0,
        explanation: "Dono(7)+Grupo(5)+Outros(0)."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "SQL",
        questionText: "SQL: Apagar tabela completa?",
        options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
        correctOption: 2,
        explanation: "DROP TABLE remove estrutura e dados."
      }
    ];
    
    for (const q of seedQuestions) {
      await storage.createQuestion(q);
    }
    console.log("Banco de dados preenchido com as novas questões da prova oficial.");
  }
}
