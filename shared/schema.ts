import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  patent: text("patent").notNull().default("Civilian"), // Ranks: Civilian, Recruit, Student, Third Sergeant, etc.
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
}

export interface AIExplanationRequest {
  questionId: number;
}

export interface AIExplanationResponse {
  explanation: string;
}
