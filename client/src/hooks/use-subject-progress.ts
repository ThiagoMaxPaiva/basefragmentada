import { useQuery } from "@tanstack/react-query";
import { type SubjectProgress } from "@shared/schema";

export function useSubjectProgress() {
  return useQuery<SubjectProgress[]>({
    queryKey: ["/api/progress/subjects"],
    queryFn: async () => {
      const res = await fetch("/api/progress/subjects");
      if (!res.ok) throw new Error("Falha ao carregar progresso por disciplina");
      return await res.json();
    }
  });
}
