import { z } from 'zod';
import { 
  insertQuestionSchema, 
  questions, 
  users,
  progress,
  examHistory,
  loginSchema,
  registerSchema
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  })
};

const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  patent: z.string(),
  createdAt: z.string().nullable().optional(),
});

const ProgressResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  totalQuestions: z.number(),
  correctAnswers: z.number(),
  wrongAnswers: z.number(),
  lastUpdated: z.string().nullable().optional(),
});

const ExamHistorySchema = z.object({
  id: z.number(),
  userId: z.number(),
  mode: z.string(),
  score: z.number(),
  totalQuestions: z.number(),
  completedAt: z.string().nullable().optional(),
});

export const api = {
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/auth/register' as const,
      input: registerSchema,
      responses: {
        201: UserResponseSchema,
        400: errorSchemas.validation,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: loginSchema,
      responses: {
        200: UserResponseSchema,
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout' as const,
      responses: {
        200: z.object({ message: z.string() }),
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me' as const,
      responses: {
        200: UserResponseSchema,
        401: errorSchemas.unauthorized,
      }
    }
  },
  questions: {
    list: {
      method: 'GET' as const,
      path: '/api/questions' as const,
      input: z.object({
        subject: z.string().optional(),
        topic: z.string().optional(),
        limit: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof questions.$inferSelect>()),
      },
    },
    subjects: {
      method: 'GET' as const,
      path: '/api/questions/subjects' as const,
      responses: {
        200: z.array(z.string()),
      }
    },
    topics: {
      method: 'GET' as const,
      path: '/api/questions/topics' as const,
      input: z.object({
        subject: z.string().optional()
      }).optional(),
      responses: {
        200: z.array(z.string()),
      }
    }
  },
  exams: {
    submit: {
      method: 'POST' as const,
      path: '/api/exams/submit' as const,
      input: z.object({
        mode: z.enum(["mock_exam", "training"]),
        answers: z.array(z.object({
          questionId: z.number(),
          selectedOption: z.number(),
        }))
      }),
      responses: {
        200: z.object({
          score: z.number(),
          totalQuestions: z.number(),
          results: z.array(z.object({
            questionId: z.number(),
            correct: z.boolean(),
            correctOption: z.number(),
            explanation: z.string(),
          }))
        }),
        401: errorSchemas.unauthorized,
      }
    },
    history: {
      method: 'GET' as const,
      path: '/api/exams/history' as const,
      responses: {
        200: z.array(ExamHistorySchema),
        401: errorSchemas.unauthorized,
      }
    }
  },
  progress: {
    get: {
      method: 'GET' as const,
      path: '/api/progress' as const,
      responses: {
        200: ProgressResponseSchema,
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      }
    }
  },
  ai: {
    explain: {
      method: 'POST' as const,
      path: '/api/ai/explain' as const,
      input: z.object({
        questionId: z.number(),
      }),
      responses: {
        200: z.object({
          explanation: z.string(),
        }),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
