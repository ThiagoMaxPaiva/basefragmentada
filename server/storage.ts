import { db } from "./db";
import { eq, and, or, desc, sql } from "drizzle-orm";
import {
  users, questions, progress, examHistory,
  type User, type InsertUser,
  type Question, type InsertQuestion,
  type Progress,
  type ExamHistory, type InsertExamHistory,
  type ExamSubmissionRequest,
  type ExamSubmissionResponse,
  flashcards, type Flashcard, type InsertFlashcard,
  activityLog, type ActivityLog,
  wrongAnswers, type WrongAnswer,
  subjectProgress, type SubjectProgress,
  topicProgress, type TopicProgress,
  dailyMissions, type DailyMission, type InsertDailyMission
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
  updateProgress(userId: number, correct: number, wrong: number, gainedXp: number): Promise<Progress>;

  // Exam History
  createExamHistory(history: InsertExamHistory): Promise<ExamHistory>;
  getExamHistory(userId: number): Promise<ExamHistory[]>;
  getExamHistoryByDate(userId: number, dateStr: string): Promise<ExamHistory[]>;
  
  // High level
  submitExam(userId: number, submission: ExamSubmissionRequest): Promise<ExamSubmissionResponse>;

  // Flashcards
  getFlashcards(userId: number): Promise<Flashcard[]>;
  getFlashcard(id: number): Promise<Flashcard | undefined>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  updateFlashcard(id: number, updates: Partial<Flashcard>): Promise<Flashcard>;

  // Activity Log
  getActivityLog(userId: number): Promise<ActivityLog[]>;
  logActivity(userId: number, dateStr: string): Promise<void>;

  // Wrong Answers (Caderno de Erros)
  saveWrongAnswer(userId: number, questionId: number, selectedOption: number): Promise<void>;
  getWrongAnswers(userId: number): Promise<(WrongAnswer & { question: Question })[]>;
  removeWrongAnswer(id: number): Promise<void>;

  // Subject Progress
  updateSubjectProgress(userId: number, subject: string, correct: number, wrong: number): Promise<void>;
  getSubjectProgress(userId: number): Promise<SubjectProgress[]>;

  // Topic Progress
  updateTopicProgress(userId: number, subject: string, topic: string, correct: number, wrong: number): Promise<void>;
  getTopicProgress(userId: number): Promise<TopicProgress[]>;

  // User Profile
  updateUser(id: number, updates: { name?: string; passwordHash?: string }): Promise<User>;

  // Daily Missions
  getDailyMissions(userId: number, dateStr: string): Promise<DailyMission[]>;
  updateMissionProgress(userId: number, type: string, increment: number): Promise<void>;
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
    
    // Handle mixed subject (both Portuguese and Specialized IT Knowledge)
    if (subject === "mixed") {
      conditions.push(or(
        eq(questions.subject, "Português"),
        eq(questions.subject, "Specialized IT Knowledge")
      ));
    } else if (subject) {
      conditions.push(eq(questions.subject, subject));
    }
    
    if (topic) conditions.push(eq(questions.topic, topic));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    query = query.orderBy(sql`RANDOM()`);
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    const [q] = await db.select().from(questions).where(eq(questions.id, id));
    return q;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [q] = await db.insert(questions).values(question as any).returning();
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

  async updateProgress(userId: number, correct: number, wrong: number, gainedXp: number = 0): Promise<Progress> {
    const [current] = await db.select().from(progress).where(eq(progress.userId, userId));
    
    if (!current) {
      const [newP] = await db.insert(progress).values({
        userId,
        totalQuestions: correct + wrong,
        correctAnswers: correct,
        wrongAnswers: wrong,
        xp: gainedXp,
        lastUpdated: new Date()
      }).returning();
      return newP;
    }
    
    const [updated] = await db.update(progress)
      .set({
        totalQuestions: current.totalQuestions + correct + wrong,
        correctAnswers: current.correctAnswers + correct,
        wrongAnswers: current.wrongAnswers + wrong,
        xp: current.xp + gainedXp,
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
  
  async getExamHistoryByDate(userId: number, dateStr: string): Promise<ExamHistory[]> {
    const allHistory = await this.getExamHistory(userId);
    // dateStr is expected to be YYYY-MM-DD
    return allHistory.filter(h => {
      if (!h.completedAt) return false;
      // Convert to local ISO string equivalent if needed, or simple prefix match
      return h.completedAt.toISOString().startsWith(dateStr);
    });
  }
  
  // High level
  async submitExam(userId: number, submission: ExamSubmissionRequest): Promise<ExamSubmissionResponse> {
    let correctCount = 0;
    let wrongCount = 0;
    
    const results = [];
    const subjectStats: Record<string, { correct: number; wrong: number }> = {};
    const topicStats: Record<string, Record<string, { correct: number; wrong: number }>> = {};
    
    for (const answer of submission.answers) {
      const question = await this.getQuestion(answer.questionId);
      if (!question) continue;
      
      const isCorrect = question.correctOption === answer.selectedOption;
      
      if (isCorrect) correctCount++;
      else {
        wrongCount++;
        // Save wrong answer to Caderno de Erros
        await this.saveWrongAnswer(userId, question.id, answer.selectedOption);
      }

      // Track per-subject stats
      if (!subjectStats[question.subject]) {
        subjectStats[question.subject] = { correct: 0, wrong: 0 };
      }
      if (isCorrect) subjectStats[question.subject].correct++;
      else subjectStats[question.subject].wrong++;
      
      // Track per-topic stats
      if (!topicStats[question.subject]) {
        topicStats[question.subject] = {};
      }
      if (!topicStats[question.subject][question.topic]) {
        topicStats[question.subject][question.topic] = { correct: 0, wrong: 0 };
      }
      if (isCorrect) topicStats[question.subject][question.topic].correct++;
      else topicStats[question.subject][question.topic].wrong++;
      
      results.push({
        questionId: question.id,
        correct: isCorrect,
        correctOption: question.correctOption,
        explanation: question.explanation
      });
    }
    
    // Calculate XP
    let gainedXp = correctCount * 5;
    const currentProgress = await this.getProgress(userId);
    if (currentProgress) {
      const streak = currentProgress.currentStreak || 0;
      const multiplier = 1 + Math.min(streak * 0.1, 1.0); // +10% per streak day, max +100%
      gainedXp = Math.round(gainedXp * multiplier);
    }

    // Update global progress
    await this.updateProgress(userId, correctCount, wrongCount, gainedXp);

    // Update per-subject progress
    for (const [subject, stats] of Object.entries(subjectStats)) {
      await this.updateSubjectProgress(userId, subject, stats.correct, stats.wrong);
    }
    
    // Update per-topic progress
    for (const [subject, topics] of Object.entries(topicStats)) {
      for (const [topic, stats] of Object.entries(topics)) {
        await this.updateTopicProgress(userId, subject, topic, stats.correct, stats.wrong);
      }
    }
    
    // Save exam history
    await this.createExamHistory({
      userId,
      mode: submission.mode,
      score: correctCount,
      totalQuestions: results.length,
      details: { subjects: subjectStats }
    });
    
    // Update Daily Missions
    await this.updateMissionProgress(userId, "total_questions", results.length);
    if (correctCount > 0) {
      await this.updateMissionProgress(userId, "subject_streak", correctCount);
    }
    
    // Recalculate rank (Patent)
    const rankInfo = await this.updateUserRank(userId);
    
    return {
      score: correctCount,
      totalQuestions: results.length,
      results,
      rankInfo
    };
  }
  
  private async updateUserRank(userId: number) {
    const p = await this.getProgress(userId);
    if (!p) return { previousPatent: "civil", newPatent: "civil", rankedUp: false, totalCorrect: 0 };
    
    const user = await this.getUser(userId);
    const previousPatent = user?.patent || "civil";
    
    // We import getRankForScore and RANKS at the top or just assume they are available from schema
    // Wait, getRankForScore is imported from @shared/schema at the top.
    const { getRankForScore, RANKS } = await import("@shared/schema");
    
    const rank = getRankForScore(p.xp);
    const newPatent = rank.id;
    
    const prevRankTier = RANKS.find(r => r.id === previousPatent)?.tier ?? -1;
    const rankedUp = rank.tier > prevRankTier;
    
    if (previousPatent !== newPatent) {
      await this.updateUserPatent(userId, newPatent);
    }
    
    return {
      previousPatent,
      newPatent,
      rankedUp,
      totalCorrect: p.xp // Using totalCorrect field to pass XP to frontend to avoid changing schema
    };
  }

  // Flashcards
  async getFlashcards(userId: number): Promise<Flashcard[]> {
    return await db.select()
      .from(flashcards)
      .where(eq(flashcards.userId, userId))
      .orderBy(flashcards.nextReview);
  }

  async getFlashcard(id: number): Promise<Flashcard | undefined> {
    const [card] = await db.select().from(flashcards).where(eq(flashcards.id, id));
    return card;
  }

  async createFlashcard(card: InsertFlashcard): Promise<Flashcard> {
    const [newCard] = await db.insert(flashcards).values(card).returning();
    return newCard;
  }

  async updateFlashcard(id: number, updates: Partial<Flashcard>): Promise<Flashcard> {
    const [updated] = await db.update(flashcards)
      .set(updates)
      .where(eq(flashcards.id, id))
      .returning();
    return updated;
  }

  // Activity Log & Streaks
  async getActivityLog(userId: number): Promise<ActivityLog[]> {
    return await db.select().from(activityLog).where(eq(activityLog.userId, userId));
  }

  async logActivity(userId: number, dateStr: string): Promise<void> {
    // 1. Log activity in heatmap
    const [existingLog] = await db.select()
      .from(activityLog)
      .where(and(eq(activityLog.userId, userId), eq(activityLog.date, dateStr)));

    if (existingLog) {
      await db.update(activityLog)
        .set({ count: existingLog.count + 1 })
        .where(eq(activityLog.id, existingLog.id));
    } else {
      await db.insert(activityLog).values({ userId, date: dateStr, count: 1 });
    }

    // 2. Update Streak in progress table
    const p = await this.getProgress(userId);
    if (!p) return; // Progress is created on signup, so this should exist

    const todayDate = new Date(dateStr);
    todayDate.setHours(0, 0, 0, 0);

    let { currentStreak, longestStreak, lastActivityDate } = p;

    if (!lastActivityDate) {
      // First activity ever
      currentStreak = 1;
      longestStreak = 1;
    } else {
      const lastDate = new Date(lastActivityDate);
      lastDate.setHours(0, 0, 0, 0);

      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Consecutive day
        currentStreak += 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else if (diffDays > 1) {
        // Streak broken
        currentStreak = 1;
      }
      // If diffDays === 0, it's the same day, do nothing to streak
    }

    await db.update(progress)
      .set({
        currentStreak,
        longestStreak,
        lastActivityDate: dateStr,
        lastUpdated: new Date()
      })
      .where(eq(progress.userId, userId));
  }

  // Wrong Answers (Caderno de Erros)
  async saveWrongAnswer(userId: number, questionId: number, selectedOption: number): Promise<void> {
    // Check if this question is already in the error book
    const [existing] = await db.select()
      .from(wrongAnswers)
      .where(and(eq(wrongAnswers.userId, userId), eq(wrongAnswers.questionId, questionId)));
    
    if (!existing) {
      await db.insert(wrongAnswers).values({ userId, questionId, selectedOption });
    } else {
      // Update the selected option if they got it wrong again
      await db.update(wrongAnswers)
        .set({ selectedOption, createdAt: new Date() })
        .where(eq(wrongAnswers.id, existing.id));
    }
  }

  async getWrongAnswers(userId: number): Promise<(WrongAnswer & { question: Question })[]> {
    const rows = await db.select({
      id: wrongAnswers.id,
      userId: wrongAnswers.userId,
      questionId: wrongAnswers.questionId,
      selectedOption: wrongAnswers.selectedOption,
      createdAt: wrongAnswers.createdAt,
      question: questions,
    })
      .from(wrongAnswers)
      .innerJoin(questions, eq(wrongAnswers.questionId, questions.id))
      .where(eq(wrongAnswers.userId, userId))
      .orderBy(desc(wrongAnswers.createdAt));
    
    return rows.map(r => ({
      id: r.id,
      userId: r.userId,
      questionId: r.questionId,
      selectedOption: r.selectedOption,
      createdAt: r.createdAt,
      question: r.question,
    }));
  }

  async removeWrongAnswer(id: number): Promise<void> {
    await db.delete(wrongAnswers).where(eq(wrongAnswers.id, id));
  }

  // Subject Progress
  async updateSubjectProgress(userId: number, subject: string, correct: number, wrong: number): Promise<void> {
    const [existing] = await db.select()
      .from(subjectProgress)
      .where(and(eq(subjectProgress.userId, userId), eq(subjectProgress.subject, subject)));
    
    if (existing) {
      await db.update(subjectProgress)
        .set({
          totalQuestions: existing.totalQuestions + correct + wrong,
          correctAnswers: existing.correctAnswers + correct,
        })
        .where(eq(subjectProgress.id, existing.id));
    } else {
      await db.insert(subjectProgress).values({
        userId,
        subject,
        totalQuestions: correct + wrong,
        correctAnswers: correct,
      });
    }
  }

  async getSubjectProgress(userId: number): Promise<SubjectProgress[]> {
    return await db.select()
      .from(subjectProgress)
      .where(eq(subjectProgress.userId, userId));
  }

  // Topic Progress
  async updateTopicProgress(userId: number, subject: string, topic: string, correct: number, wrong: number): Promise<void> {
    const [existing] = await db.select()
      .from(topicProgress)
      .where(and(eq(topicProgress.userId, userId), eq(topicProgress.subject, subject), eq(topicProgress.topic, topic)));
    
    if (existing) {
      await db.update(topicProgress)
        .set({
          totalQuestions: existing.totalQuestions + correct + wrong,
          correctAnswers: existing.correctAnswers + correct,
        })
        .where(eq(topicProgress.id, existing.id));
    } else {
      await db.insert(topicProgress).values({
        userId,
        subject,
        topic,
        totalQuestions: correct + wrong,
        correctAnswers: correct,
      });
    }
  }

  async getTopicProgress(userId: number): Promise<TopicProgress[]> {
    return await db.select()
      .from(topicProgress)
      .where(eq(topicProgress.userId, userId));
  }

  // User Profile
  async updateUser(id: number, updates: { name?: string; passwordHash?: string }): Promise<User> {
    const setObj: any = {};
    if (updates.name) setObj.name = updates.name;
    if (updates.passwordHash) setObj.passwordHash = updates.passwordHash;
    
    const [user] = await db.update(users)
      .set(setObj)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Daily Missions
  async getDailyMissions(userId: number, dateStr: string): Promise<DailyMission[]> {
    let missions = await db.select()
      .from(dailyMissions)
      .where(and(
        eq(dailyMissions.userId, userId),
        eq(dailyMissions.date, dateStr)
      ));

    if (missions.length === 0) {
      // Generate 3 random missions
      const possibleMissions: InsertDailyMission[] = [
        { userId, date: dateStr, type: "total_questions", title: "Resistência Máxima", targetValue: 15, xpReward: 30 },
        { userId, date: dateStr, type: "subject_streak", title: "Operação Específica", targetValue: 5, xpReward: 25 },
        { userId, date: dateStr, type: "flashcard_review", title: "Treinamento de Retenção", targetValue: 10, xpReward: 20 },
        { userId, date: dateStr, type: "review_wrong", title: "Resgate Tático", targetValue: 5, xpReward: 25 },
      ];

      // Shuffle and pick 3
      const shuffled = possibleMissions.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      missions = await db.insert(dailyMissions).values(shuffled).returning();
    }

    return missions;
  }

  async updateMissionProgress(userId: number, type: string, increment: number): Promise<void> {
    const dateStr = new Date().toISOString().split("T")[0];
    const missions = await db.select()
      .from(dailyMissions)
      .where(and(
        eq(dailyMissions.userId, userId),
        eq(dailyMissions.date, dateStr),
        eq(dailyMissions.type, type),
        eq(dailyMissions.completed, false)
      ));

    for (const mission of missions) {
      const newValue = Math.min(mission.currentValue + increment, mission.targetValue);
      const isCompleted = newValue >= mission.targetValue;

      await db.update(dailyMissions)
        .set({ currentValue: newValue, completed: isCompleted })
        .where(eq(dailyMissions.id, mission.id));

      if (isCompleted) {
        // Give XP reward
        await this.updateProgress(userId, 0, 0, mission.xpReward);
      }
    }
  }
}

export const storage = new DatabaseStorage();
