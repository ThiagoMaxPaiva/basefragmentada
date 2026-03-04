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
        return res.status(400).json({ message: "Email already exists" });
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
        res.status(500).json({ message: "Internal server error" });
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
      res.status(200).json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
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
      res.status(500).json({ message: "Failed to fetch questions" });
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
        res.status(400).json({ message: "Invalid submission format" });
      } else {
        res.status(500).json({ message: "Failed to process exam submission" });
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
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    res.status(200).json(progress);
  });

  // AI Route
  app.post(api.ai.explain.path, requireAuth, async (req, res) => {
    try {
      const input = api.ai.explain.input.parse(req.body);
      const question = await storage.getQuestion(input.questionId);
      
      if (!question) return res.status(404).json({ message: "Question not found" });
      
      // MOCK AI Integration
      const mockAiExplanation = `Here is a detailed explanation tailored for you:\n\nThe correct concept revolves around "${question.topic}" within "${question.subject}". ${question.explanation}\n\nUnderstanding this is critical for the EAGS SIN exam.`;
      
      res.status(200).json({ explanation: mockAiExplanation });
    } catch (err) {
      res.status(400).json({ message: "Invalid request" });
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
        topic: "Syntax",
        questionText: "Identify the sentence where the comma is used correctly:",
        options: [
          "The boy who was studying, passed the exam.",
          "The boy, who was studying, passed the exam.",
          "The boy, who was studying passed the exam.",
          "The boy who was studying passed, the exam."
        ],
        correctOption: 1,
        explanation: "The explanatory relative clause must be enclosed in commas."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Computer Networks",
        questionText: "Which layer of the OSI model is responsible for routing?",
        options: [
          "Data Link Layer",
          "Transport Layer",
          "Network Layer",
          "Session Layer"
        ],
        correctOption: 2,
        explanation: "The Network layer (Layer 3) handles packet routing using logical addresses (like IP)."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Software Engineering",
        questionText: "Which Agile methodology uses Sprints and a Scrum Master?",
        options: [
          "Kanban",
          "Scrum",
          "Waterfall",
          "Extreme Programming"
        ],
        correctOption: 1,
        explanation: "Scrum is an agile framework that manages work through iterations called Sprints."
      },
      {
        subject: "Specialized IT Knowledge",
        topic: "Databases",
        questionText: "What does the ACID property 'Atomicity' ensure?",
        options: [
          "Transactions are isolated from each other",
          "Data is consistent before and after the transaction",
          "A transaction is treated as a single, indivisible unit of work",
          "Data survives system failures"
        ],
        correctOption: 2,
        explanation: "Atomicity ensures that all parts of a transaction are completed; if any part fails, the entire transaction fails and leaves the database unchanged."
      }
    ];
    
    for (const q of seedQuestions) {
      await storage.createQuestion(q);
    }
    console.log("Database seeded with sample questions.");
  }
}
