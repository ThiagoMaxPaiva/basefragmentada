import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import {
  users, questions, progress, examHistory,
  type User, type InsertUser,
  type Question, type InsertQuestion,
  type Progress,
  type ExamHistory, type InsertExamHistory,
  type ExamSubmissionRequest,
  type ExamSubmissionResponse
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPatent(id: number, patent: string): Promise<User>;

  // Questions
  getQuestions(limit?: number, subject?: string, topic?: string): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  getSubjects(): Promise<string[]>;
  getTopics(subject?: string): Promise<string[]>;

  // Progress
  getProgress(userId: number): Promise<Progress | undefined>;
  updateProgress(userId: number, correct: number, wrong: number): Promise<Progress>;

  // Exam History
  createExamHistory(history: InsertExamHistory): Promise<ExamHistory>;
  getExamHistory(userId: number): Promise<ExamHistory[]>;
  
  // High level
  submitExam(userId: number, submission: ExamSubmissionRequest): Promise<ExamSubmissionResponse>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    
    // Initialize progress
    await db.insert(progress).values({
      userId: user.id,
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    
    return user;
  }

  async updateUserPatent(id: number, patent: string): Promise<User> {
    const [user] = await db.update(users)
      .set({ patent })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Questions
  async getQuestions(limit?: number, subject?: string, topic?: string): Promise<Question[]> {
    let query = db.select().from(questions).$dynamic();
    
    const conditions = [];
    if (subject) conditions.push(eq(questions.subject, subject));
    if (topic) conditions.push(eq(questions.topic, topic));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    // In a real app we might want to order randomly: .orderBy(sql`RANDOM()`)
    return await query;
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    const [q] = await db.select().from(questions).where(eq(questions.id, id));
    return q;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [q] = await db.insert(questions).values(question).returning();
    return q;
  }
  
  async getSubjects(): Promise<string[]> {
    const rows = await db.selectDistinct({ subject: questions.subject }).from(questions);
    return rows.map(r => r.subject);
  }
  
  async getTopics(subject?: string): Promise<string[]> {
    let query = db.selectDistinct({ topic: questions.topic }).from(questions).$dynamic();
    if (subject) {
      query = query.where(eq(questions.subject, subject));
    }
    const rows = await query;
    return rows.map(r => r.topic);
  }

  // Progress
  async getProgress(userId: number): Promise<Progress | undefined> {
    const [p] = await db.select().from(progress).where(eq(progress.userId, userId));
    return p;
  }

  async updateProgress(userId: number, correct: number, wrong: number): Promise<Progress> {
    const [current] = await db.select().from(progress).where(eq(progress.userId, userId));
    
    if (!current) {
      const [newP] = await db.insert(progress).values({
        userId,
        totalQuestions: correct + wrong,
        correctAnswers: correct,
        wrongAnswers: wrong,
        lastUpdated: new Date()
      }).returning();
      return newP;
    }
    
    const [updated] = await db.update(progress)
      .set({
        totalQuestions: current.totalQuestions + correct + wrong,
        correctAnswers: current.correctAnswers + correct,
        wrongAnswers: current.wrongAnswers + wrong,
        lastUpdated: new Date()
      })
      .where(eq(progress.userId, userId))
      .returning();
      
    return updated;
  }

  // Exam History
  async createExamHistory(history: InsertExamHistory): Promise<ExamHistory> {
    const [h] = await db.insert(examHistory).values(history).returning();
    return h;
  }

  async getExamHistory(userId: number): Promise<ExamHistory[]> {
    return await db.select()
      .from(examHistory)
      .where(eq(examHistory.userId, userId))
      .orderBy(desc(examHistory.completedAt));
  }
  
  // High level
  async submitExam(userId: number, submission: ExamSubmissionRequest): Promise<ExamSubmissionResponse> {
    let correctCount = 0;
    let wrongCount = 0;
    
    const results = [];
    
    for (const answer of submission.answers) {
      const question = await this.getQuestion(answer.questionId);
      if (!question) continue;
      
      const isCorrect = question.correctOption === answer.selectedOption;
      
      if (isCorrect) correctCount++;
      else wrongCount++;
      
      results.push({
        questionId: question.id,
        correct: isCorrect,
        correctOption: question.correctOption,
        explanation: question.explanation
      });
    }
    
    // Update global progress
    await this.updateProgress(userId, correctCount, wrongCount);
    
    // Save exam history
    await this.createExamHistory({
      userId,
      mode: submission.mode,
      score: correctCount,
      totalQuestions: results.length
    });
    
    // Recalculate rank (Patent)
    await this.updateUserRank(userId);
    
    return {
      score: correctCount,
      totalQuestions: results.length,
      results
    };
  }
  
  private async updateUserRank(userId: number) {
    const p = await this.getProgress(userId);
    if (!p) return;
    
    const correct = p.correctAnswers;
    let newPatent = "Civilian";
    
    if (correct >= 100) newPatent = "Third Sergeant";
    else if (correct >= 50) newPatent = "Student";
    else if (correct >= 20) newPatent = "Recruit";
    
    await this.updateUserPatent(userId, newPatent);
  }
}

export const storage = new DatabaseStorage();
