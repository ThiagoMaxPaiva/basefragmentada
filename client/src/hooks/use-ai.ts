import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useAIExplanation() {
  return useMutation({
    mutationFn: async (questionId: number) => {
      const res = await fetch(api.ai.explain.path, {
        method: api.ai.explain.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId }),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to get AI explanation");
      return api.ai.explain.responses[200].parse(await res.json());
    },
  });
}
