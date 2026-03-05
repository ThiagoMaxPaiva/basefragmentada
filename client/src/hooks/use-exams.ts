import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type ExamSubmissionRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSubmitExam() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ExamSubmissionRequest) => {
      const res = await fetch(api.exams.submit.path, {
        method: api.exams.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Falha ao enviar exame");
      return api.exams.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate both history and progress on new submission
      queryClient.invalidateQueries({ queryKey: [api.exams.history.path] });
      queryClient.invalidateQueries({ queryKey: [api.progress.get.path] });
      toast({ title: "Missão Cumprida", description: "Exame enviado e registrado." });
    },
    onError: (error) => {
      toast({ title: "Falha no Envio", description: error.message, variant: "destructive" });
    }
  });
}

export function useExamHistory() {
  return useQuery({
    queryKey: [api.exams.history.path],
    queryFn: async () => {
      const res = await fetch(api.exams.history.path, { credentials: "include" });
      if (!res.ok) throw new Error("Falha ao buscar histórico de exames");
      return api.exams.history.responses[200].parse(await res.json());
    },
  });
}
