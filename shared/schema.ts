import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  patent: text("patent").notNull().default("Civil"), // Ranks: Civil, Recruta, Aluno, Terceiro-Sargento, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(), // e.g., Portuguese, Specialized IT Knowledge
  topic: text("topic").notNull(), // e.g., Software Engineering, Computer Networks
  questionText: text("question_text").notNull(),
  options: json("options").$type<string[]>().notNull(), // Array of 4-5 strings
  correctOption: integer("correct_option").notNull(), // Index of the correct option
  explanation: text("explanation").notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  totalQuestions: integer("total_questions").default(0).notNull(),
  correctAnswers: integer("correct_answers").default(0).notNull(),
  wrongAnswers: integer("wrong_answers").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const examHistory = pgTable("exam_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  mode: text("mode").notNull(), // "mock_exam" or "training"
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

// === BASE SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, lastUpdated: true });
export const insertExamHistorySchema = createInsertSchema(examHistory).omit({ id: true, completedAt: true });

// === EXPLICIT API CONTRACT TYPES ===

// Users
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Requests
export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

// Questions
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

// Progress & History
export type Progress = typeof progress.$inferSelect;
export type ExamHistory = typeof examHistory.$inferSelect;
export type InsertExamHistory = z.infer<typeof insertExamHistorySchema>;

export interface ExamSubmissionRequest {
  mode: "mock_exam" | "training";
  answers: { questionId: number; selectedOption: number }[];
}

export interface ExamSubmissionResponse {
  score: number;
  totalQuestions: number;
  results: {
    questionId: number;
    correct: boolean;
    correctOption: number;
    explanation: string;
  }[];
  rankInfo: {
    previousPatent: string;
    newPatent: string;
    rankedUp: boolean;
    totalCorrect: number;
  };
}

export interface AIExplanationRequest {
  questionId: number;
}

export interface AIExplanationResponse {
  explanation: string;
}

// === RANK SYSTEM — Brazilian Army Hierarchy ===

export interface Rank {
  id: string;
  name: string;
  threshold: number;      // min correct answers to reach this rank
  nextThreshold: number | null; // null = max rank
  color: string;          // accent color hex
  bgColor: string;        // background hex for badge
  tier: number;           // 0 = lowest
}

export const RANKS: Rank[] = [
  { id: "recruta",      name: "Recruta",              threshold: 0,    nextThreshold: 10,   color: "#9ca3af", bgColor: "#1f2937", tier: 0 },
  { id: "soldado2",     name: "Soldado 2ª Classe",    threshold: 10,   nextThreshold: 25,   color: "#a3a3a3", bgColor: "#262626", tier: 1 },
  { id: "soldado1",     name: "Soldado 1ª Classe",    threshold: 25,   nextThreshold: 45,   color: "#d4d4aa", bgColor: "#2a2a1a", tier: 2 },
  { id: "cabo",         name: "Cabo",                 threshold: 45,   nextThreshold: 70,   color: "#a8a878", bgColor: "#2a2818", tier: 3 },
  { id: "sgt3",         name: "3º Sargento",          threshold: 70,   nextThreshold: 100,  color: "#d97706", bgColor: "#292013", tier: 4 },
  { id: "sgt2",         name: "2º Sargento",          threshold: 100,  nextThreshold: 140,  color: "#f59e0b", bgColor: "#2d2410", tier: 5 },
  { id: "sgt1",         name: "1º Sargento",          threshold: 140,  nextThreshold: 190,  color: "#fbbf24", bgColor: "#32280e", tier: 6 },
  { id: "subtenente",   name: "Subtenente",           threshold: 190,  nextThreshold: 260,  color: "#fcd34d", bgColor: "#332c0c", tier: 7 },
  { id: "aspirante",    name: "Aspirante a Oficial",  threshold: 260,  nextThreshold: 350,  color: "#6ee7b7", bgColor: "#0d2419", tier: 8 },
  { id: "ten2",         name: "2º Tenente",           threshold: 350,  nextThreshold: 450,  color: "#34d399", bgColor: "#0a2018", tier: 9 },
  { id: "ten1",         name: "1º Tenente",           threshold: 450,  nextThreshold: 580,  color: "#10b981", bgColor: "#082018", tier: 10 },
  { id: "capitao",      name: "Capitão",              threshold: 580,  nextThreshold: 750,  color: "#60a5fa", bgColor: "#0c1a30", tier: 11 },
  { id: "major",        name: "Major",                threshold: 750,  nextThreshold: 950,  color: "#818cf8", bgColor: "#0f0f2e", tier: 12 },
  { id: "tencoronel",   name: "Tenente-Coronel",      threshold: 950,  nextThreshold: 1200, color: "#c084fc", bgColor: "#180a30", tier: 13 },
  { id: "coronel",      name: "Coronel",              threshold: 1200, nextThreshold: 1500, color: "#f472b6", bgColor: "#2d0820", tier: 14 },
  { id: "general",      name: "General de Brigada",   threshold: 1500, nextThreshold: null,  color: "#fbbf24", bgColor: "#2d1800", tier: 15 },
];

export function getRankForScore(correctAnswers: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (correctAnswers >= r.threshold) rank = r;
    else break;
  }
  return rank;
}
