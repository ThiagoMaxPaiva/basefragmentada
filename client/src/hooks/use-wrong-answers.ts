import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type WrongAnswer, type Question } from "@shared/schema";
import { useToast } from "./use-toast";

type WrongAnswerWithQuestion = WrongAnswer & { question: Question };

export function useWrongAnswers() {
  return useQuery<WrongAnswerWithQuestion[]>({
    queryKey: ["/api/wrong-answers"],
    queryFn: async () => {
      const res = await fetch("/api/wrong-answers");
      if (!res.ok) throw new Error("Falha ao carregar caderno de erros");
      return await res.json();
    }
  });
}

export function useRemoveWrongAnswer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/wrong-answers/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Falha ao remover questão do caderno de erros");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wrong-answers"] });
      toast({
        title: "Questão removida",
        description: "Você dominou essa questão! Ela não aparecerá mais no caderno de erros."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });
}
