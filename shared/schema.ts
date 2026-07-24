import { pgTable, text, serial, integer, boolean, json, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === INTERFACES ===
export interface ExamDetails {
  subjects: Record<string, { correct: number; wrong: number }>;
}

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
  xp: integer("xp").default(0).notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastActivityDate: text("last_activity_date"), // YYYY-MM-DD
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const examHistory = pgTable("exam_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  mode: text("mode").notNull(), // "mock_exam" or "training"
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  details: json("details").$type<ExamDetails>(), // Added details for tracking subjects
  completedAt: timestamp("completed_at").defaultNow(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  category: text("category").notNull(),
  nextReview: timestamp("next_review").defaultNow().notNull(),
  easeFactor: real("ease_factor").default(2.5).notNull(),
  interval: integer("interval").default(0).notNull(),
  repetitions: integer("repetitions").default(0).notNull(),
});

export const activityLog = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  count: integer("count").default(0).notNull(),
});

export const session = pgTable("session", {
  sid: text("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});

export const wrongAnswers = pgTable("wrong_answers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  questionId: integer("question_id").references(() => questions.id).notNull(),
  selectedOption: integer("selected_option").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subjectProgress = pgTable("subject_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  subject: text("subject").notNull(),
  totalQuestions: integer("total_questions").default(0).notNull(),
  correctAnswers: integer("correct_answers").default(0).notNull(),
});

export const dailyMissions = pgTable("daily_missions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  title: text("title").notNull(),
  type: text("type").notNull(), // e.g., 'total_questions', 'subject_streak', 'flashcard_review'
  targetValue: integer("target_value").notNull(),
  currentValue: integer("current_value").default(0).notNull(),
  xpReward: integer("xp_reward").notNull(),
  completed: boolean("completed").default(false).notNull(),
});

export const topicProgress = pgTable("topic_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  subject: text("subject").notNull(),
  topic: text("topic").notNull(),
  totalQuestions: integer("total_questions").default(0).notNull(),
  correctAnswers: integer("correct_answers").default(0).notNull(),
});

// === BASE SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, lastUpdated: true });
export const insertExamHistorySchema = createInsertSchema(examHistory).omit({ id: true, completedAt: true });
export const insertFlashcardSchema = createInsertSchema(flashcards).omit({ 
  id: true, 
  nextReview: true, 
  easeFactor: true, 
  interval: true, 
  repetitions: true 
});
export const insertActivityLogSchema = createInsertSchema(activityLog).omit({ id: true });
export const insertWrongAnswerSchema = createInsertSchema(wrongAnswers).omit({ id: true, createdAt: true });
export const insertSubjectProgressSchema = createInsertSchema(subjectProgress).omit({ id: true });
export const insertTopicProgressSchema = createInsertSchema(topicProgress).omit({ id: true });
export const insertDailyMissionSchema = createInsertSchema(dailyMissions).omit({ id: true });

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

// Flashcards
export type Flashcard = typeof flashcards.$inferSelect;
export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;

// Activity Log
export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;

// Wrong Answers (Caderno de Erros)
export type WrongAnswer = typeof wrongAnswers.$inferSelect;
export type InsertWrongAnswer = z.infer<typeof insertWrongAnswerSchema>;

// Subject Progress (Análise por Disciplina)
export type SubjectProgress = typeof subjectProgress.$inferSelect;
export type InsertSubjectProgress = z.infer<typeof insertSubjectProgressSchema>;

// Topic Progress (Análise por Tópico)
export type TopicProgress = typeof topicProgress.$inferSelect;
export type InsertTopicProgress = z.infer<typeof insertTopicProgressSchema>;

// Daily Missions
export type DailyMission = typeof dailyMissions.$inferSelect;
export type InsertDailyMission = z.infer<typeof insertDailyMissionSchema>;

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
  { id: "civil",        name: "Civil",                threshold: 0,    nextThreshold: 50,   color: "#9ca3af", bgColor: "#1f2937", tier: 0 },
  { id: "recruta",      name: "Recruta",              threshold: 50,   nextThreshold: 250,  color: "#a3a3a3", bgColor: "#262626", tier: 1 },
  { id: "soldado",      name: "Soldado",              threshold: 250,  nextThreshold: 750,  color: "#d4d4aa", bgColor: "#2a2a1a", tier: 2 },
  { id: "cabo",         name: "Cabo",                 threshold: 750,  nextThreshold: 1500, color: "#a8a878", bgColor: "#2a2818", tier: 3 },
  { id: "sgt3",         name: "3º Sargento",          threshold: 1500, nextThreshold: 3000, color: "#d97706", bgColor: "#292013", tier: 4 },
  { id: "sgt2",         name: "2º Sargento",          threshold: 3000, nextThreshold: 5000, color: "#f59e0b", bgColor: "#2d2410", tier: 5 },
  { id: "sgt1",         name: "1º Sargento",          threshold: 5000, nextThreshold: null, color: "#fbbf24", bgColor: "#32280e", tier: 6 },
];

export function getRankForScore(correctAnswers: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (correctAnswers >= r.threshold) rank = r;
    else break;
  }
  return rank;
}
