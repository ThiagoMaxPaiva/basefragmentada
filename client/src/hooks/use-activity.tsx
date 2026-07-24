import { useQuery } from "@tanstack/react-query";
import type { ActivityLog } from "@shared/schema";

export function useActivityLog() {
  return useQuery<ActivityLog[]>({
    queryKey: ["/api/activity"],
    queryFn: async () => {
      const res = await fetch("/api/activity", { credentials: "include" });
      if (!res.ok) throw new Error("Falha ao buscar atividades");
      return res.json();
    },
  });
}
