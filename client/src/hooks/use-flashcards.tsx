import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Flashcard } from "@shared/schema";
import { useToast } from "./use-toast";

export function useFlashcards() {
  return useQuery<Flashcard[]>({
    queryKey: ["/api/flashcards"],
  });
}

export function useCreateFlashcard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { front: string; back: string; category: string }) => {
      const res = await apiRequest("POST", "/api/flashcards", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/flashcards"] });
      toast({
        title: "Cartão Criado",
        description: "Novo flashcard inserido na sua base de revisão.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro de Operação",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useReviewFlashcard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, score }: { id: number; score: number }) => {
      const res = await apiRequest("POST", `/api/flashcards/${id}/review`, { score });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/flashcards"] });
    },
  });
}
