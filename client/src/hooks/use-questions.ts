import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useQuestions(params?: { subject?: string; topic?: string; limit?: number }) {
  return useQuery({
    queryKey: [api.questions.list.path, params],
    queryFn: async () => {
      const urlParams = new URLSearchParams();
      if (params?.subject) urlParams.append("subject", params.subject);
      if (params?.topic) urlParams.append("topic", params.topic);
      if (params?.limit) urlParams.append("limit", params.limit.toString());
      
      const url = `${api.questions.list.path}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch questions");
      return api.questions.list.responses[200].parse(await res.json());
    },
    enabled: !!params, // Only fetch if params are provided (during exam setup/session)
  });
}

export function useSubjects() {
  return useQuery({
    queryKey: [api.questions.subjects.path],
    queryFn: async () => {
      const res = await fetch(api.questions.subjects.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch subjects");
      return api.questions.subjects.responses[200].parse(await res.json());
    },
  });
}

export function useTopics(subject?: string) {
  return useQuery({
    queryKey: [api.questions.topics.path, subject],
    queryFn: async () => {
      const url = subject ? `${api.questions.topics.path}?subject=${encodeURIComponent(subject)}` : api.questions.topics.path;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch topics");
      return api.questions.topics.responses[200].parse(await res.json());
    },
    enabled: !!subject,
  });
}

interface QuestionStats {
  total: number;
  bySubject: Record<string, number>;
}

export function useQuestionStats() {
  return useQuery<QuestionStats>({
    queryKey: ["/api/questions/stats"],
    queryFn: async () => {
      const res = await fetch("/api/questions/stats", { credentials: "include" });
      if (!res.ok) throw new Error("Falha ao buscar as estatísticas das questões");
      return res.json();
    },
  });
}
