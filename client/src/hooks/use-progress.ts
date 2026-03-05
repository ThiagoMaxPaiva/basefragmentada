import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useProgress() {
  return useQuery({
    queryKey: [api.progress.get.path],
    queryFn: async () => {
      const res = await fetch(api.progress.get.path, { credentials: "include" });
      if (res.status === 404) return null; // No progress yet is fine
      if (!res.ok) throw new Error("Falha ao carregar progresso");
      return api.progress.get.responses[200].parse(await res.json());
    },
  });
}
