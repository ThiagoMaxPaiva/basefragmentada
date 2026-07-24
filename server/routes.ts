import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { pool } from "./db";

const PostgresStore = connectPgSimple(session);

// Hashing helpers
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  if (!salt) {
    // Legacy plain text check
    return supplied === stored;
  }
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = scryptSync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      passwordHash: string;
      name: string;
      patent: string;
      createdAt: Date | null;
    }
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
    store: new PostgresStore({ 
      pool, 
      createTableIfMissing: true 
    }),
    cookie: { 
      secure: false, // Set to false to allow local HTTP testing
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await storage.getUserByEmail(email);
      if (!user || !comparePasswords(password, user.passwordHash)) {
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
        passwordHash: hashPassword(input.password),
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
      
      // Log activity for heatmap & streaks
      const today = new Date().toISOString().split('T')[0];
      await storage.logActivity(req.user!.id, today);

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

  app.get("/api/exams/history/date/:date", requireAuth, async (req, res) => {
    try {
      const dateStr = req.params.date;
      const history = await storage.getExamHistoryByDate(req.user!.id, dateStr);
      res.status(200).json(history);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar histórico detalhado" });
    }
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
      
      const apiKey = process.env.GEMINI_API_KEY;
      let aiExplanation = "";

      if (!apiKey) {
        // Fallback se não houver chave
        aiExplanation = `[Modo Offline - Chave de IA não configurada]\n\nAqui está uma explicação detalhada personalizada para você:\n\nO conceito correto gira em torno de "${question.topic}" dentro de "${question.subject === 'Portuguese' ? 'Português' : question.subject === 'Specialized IT Knowledge' ? 'Conhecimentos Especializados de TI' : question.subject}". ${question.explanation}\n\nCompreender isso é fundamental para o exame EAGS SIN.`;
      } else {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `Você é um Sargento Instrutor rigoroso, mas didático, da Força Aérea Brasileira (FAB). 
Seu objetivo é ajudar candidatos do concurso EAGS SIN (Estágio de Adaptação à Graduação de Sargento - Sistema de Informação).
O aluno errou ou pediu explicação para a seguinte questão:
- Disciplina: ${question.subject}
- Tópico: ${question.topic}
- Enunciado: ${question.questionText}
- Opções: ${question.options.join(" | ")}
- Opção Correta (índice 0-3): ${question.correctOption}
- Explicação Padrão: ${question.explanation}

Escreva uma explicação tática, motivadora e detalhada, chamando-o de "Candidato". Foque no porquê da alternativa correta ser a certa. Seja direto, use termos como "Atenção" ou "Bizú" (dica de concurso militar no Brasil). Não use saudações longas.`;

        const result = await model.generateContent(prompt);
        aiExplanation = result.response.text();
      }
      
      res.status(200).json({ explanation: aiExplanation });
    } catch (err) {
      console.error("AI Error:", err);
      res.status(400).json({ message: "Solicitação inválida ou falha na IA" });
    }
  });

  // Flashcards Routes
  app.get(api.flashcards.list.path, requireAuth, async (req, res) => {
    try {
      const cards = await storage.getFlashcards(req.user!.id);
      res.status(200).json(cards);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar flashcards" });
    }
  });

  app.post(api.flashcards.create.path, requireAuth, async (req, res) => {
    try {
      const input = api.flashcards.create.input.parse(req.body);
      const card = await storage.createFlashcard({
        ...input,
        userId: req.user!.id,
      });
      res.status(201).json(card);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos" });
      } else {
        res.status(500).json({ message: "Falha ao criar flashcard" });
      }
    }
  });

  app.post(api.flashcards.review.path, requireAuth, async (req, res) => {
    try {
      const cardId = parseInt(req.params.id);
      const input = api.flashcards.review.input.parse(req.body);
      
      const card = await storage.getFlashcard(cardId);
      if (!card || card.userId !== req.user!.id) {
        return res.status(404).json({ message: "Flashcard não encontrado" });
      }

      // SM-2 Algorithm
      let { interval, repetitions, easeFactor } = card;
      const score = input.score;

      if (score >= 3) {
        if (repetitions === 0) {
          interval = 1;
        } else if (repetitions === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
      } else {
        repetitions = 0;
        interval = 1;
      }

      easeFactor = easeFactor + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;

      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + interval);

      const updated = await storage.updateFlashcard(cardId, {
        interval,
        repetitions,
        easeFactor,
        nextReview,
      });

      // Log activity for heatmap & streaks
      const today = new Date().toISOString().split('T')[0];
      await storage.logActivity(req.user!.id, today);
      
      // Update Daily Missions
      await storage.updateMissionProgress(req.user!.id, "flashcard_review", 1);

      res.status(200).json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Nota inválida" });
      } else {
        res.status(500).json({ message: "Falha ao atualizar flashcard" });
      }
    }
  });

  // Activity Log Route
  app.get("/api/activity", requireAuth, async (req, res) => {
    try {
      const logs = await storage.getActivityLog(req.user!.id);
      res.status(200).json(logs);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar logs de atividade" });
    }
  });

  app.post("/api/activity/pomodoro", requireAuth, async (req, res) => {
    try {
      // 1. Log activity for the habit radar
      const today = new Date().toISOString().split('T')[0];
      await storage.logActivity(req.user!.id, today);
      
      // 2. Grant 15 XP for completing a Pomodoro session
      const updatedProgress = await storage.updateProgress(req.user!.id, 0, 0, 15);
      
      res.status(200).json({ message: "Sessão registrada com sucesso", xpGained: 15, progress: updatedProgress });
    } catch (err) {
      res.status(500).json({ message: "Falha ao registrar sessão pomodoro" });
    }
  });

  // Question Stats Route
  app.get("/api/questions/stats", requireAuth, async (req, res) => {
    try {
      const allQuestions = await storage.getQuestions();
      const total = allQuestions.length;
      const bySubject = allQuestions.reduce((acc, q) => {
        acc[q.subject] = (acc[q.subject] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      res.status(200).json({ total, bySubject });
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar estatísticas das questões" });
    }
  });

  // Wrong Answers (Caderno de Erros) Routes
  app.get("/api/wrong-answers", requireAuth, async (req, res) => {
    try {
      const items = await storage.getWrongAnswers(req.user!.id);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar caderno de erros" });
    }
  });

  app.delete("/api/wrong-answers/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeWrongAnswer(id);
      res.status(200).json({ message: "Questão removida do caderno de erros" });
    } catch (err) {
      res.status(500).json({ message: "Falha ao remover questão" });
    }
  });

  // Subject Progress Route
  app.get("/api/progress/subjects", requireAuth, async (req, res) => {
    try {
      const subjectStats = await storage.getSubjectProgress(req.user!.id);
      res.status(200).json(subjectStats);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar progresso por disciplina" });
    }
  });

  // Topic Progress Route
  app.get("/api/progress/topics", requireAuth, async (req, res) => {
    try {
      const topicStats = await storage.getTopicProgress(req.user!.id);
      res.status(200).json(topicStats);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar progresso por tópico" });
    }
  });

  // Profile Update Route
  app.patch("/api/auth/profile", requireAuth, async (req, res) => {
    try {
      const { name, currentPassword, newPassword } = req.body;
      const user = req.user!;
      const updates: { name?: string; passwordHash?: string } = {};

      if (name && name.trim().length >= 2) {
        updates.name = name.trim();
      }

      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ message: "Senha atual é obrigatória para alterar a senha" });
        }
        if (!comparePasswords(currentPassword, user.passwordHash)) {
          return res.status(400).json({ message: "Senha atual incorreta" });
        }
        if (newPassword.length < 6) {
          return res.status(400).json({ message: "Nova senha deve ter no mínimo 6 caracteres" });
        }
        updates.passwordHash = hashPassword(newPassword);
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "Nenhuma alteração fornecida" });
      }

      const updated = await storage.updateUser(user.id, updates);
      const { passwordHash, ...safeUser } = updated;
      res.status(200).json(safeUser);
    } catch (err) {
      res.status(500).json({ message: "Falha ao atualizar perfil" });
    }
  });

  // Daily Missions Route
  app.get("/api/missions/daily", requireAuth, async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const missions = await storage.getDailyMissions(req.user!.id, today);
      res.status(200).json(missions);
    } catch (err) {
      res.status(500).json({ message: "Falha ao buscar missões diárias" });
    }
  });

  // Seed Database with initial data
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  // Database is now populated via external SQL import for high volume.
  // This seed function is kept empty to avoid overwriting production-ready questions.
  console.log("Sistema de questões pronto.");
}
