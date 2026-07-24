import { AppLayout } from "@/components/layout/app-layout";
import { useWrongAnswers, useRemoveWrongAnswer } from "@/hooks/use-wrong-answers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { BookX, CheckCircle2, ChevronRight, XCircle } from "lucide-react";

export default function WrongAnswers() {
  const { data: wrongAnswers, isLoading } = useWrongAnswers();
  const removeMutation = useRemoveWrongAnswer();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pt-2 md:pt-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl text-white shadow-xl relative overflow-hidden"
          style={{ background: "var(--card-gradient)" }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-destructive pl-3 italic opacity-80">
              Setor de Revisão Tática
            </p>
            <div className="flex items-center gap-3 mb-2">
              <BookX className="w-8 h-8 text-destructive" />
              <h1 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase drop-shadow-sm">
                Caderno de Erros
              </h1>
            </div>
            <p className="opacity-80 font-medium max-w-2xl text-sm leading-relaxed">
              Questões que você errou nos simulados são salvas aqui automaticamente. Revise suas falhas para transformá-las em pontos fortes no dia da prova.
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : wrongAnswers?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 px-4"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Seu caderno está limpo!</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Você não possui nenhuma questão registrada. Continue realizando simulados!
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {wrongAnswers?.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border shadow-sm overflow-hidden bg-card">
                    <CardContent className="p-0">
                      <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between">
                        <div className="flex gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          <span className="text-primary">{item.question.subject}</span>
                          <span>•</span>
                          <span>{item.question.topic}</span>
                        </div>
                        <span className="text-[10px] bg-background border px-2 py-1 rounded text-muted-foreground">
                          ID: {item.questionId}
                        </span>
                      </div>
                      
                      <div className="p-6">
                        <p className="text-base font-medium mb-6 whitespace-pre-wrap leading-relaxed text-foreground">
                          {item.question.questionText}
                        </p>
                        
                        <div className="space-y-3 mb-6">
                          {(item.question.options as string[]).map((opt, i) => {
                            const isCorrect = i === item.question.correctOption;
                            const isSelected = i === item.selectedOption;
                            
                            let bgClass = "bg-background border-border";
                            let icon = null;
                            
                            if (isCorrect) {
                              bgClass = "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400 font-medium";
                              icon = <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />;
                            } else if (isSelected) {
                              bgClass = "bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-400";
                              icon = <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
                            }
                            
                            return (
                              <div key={i} className={`p-4 rounded-lg border flex items-start gap-3 ${bgClass}`}>
                                <div className="mt-0.5">{icon || <div className="w-4 h-4 rounded-full border border-muted-foreground/30 shrink-0" />}</div>
                                <span className="text-sm leading-relaxed">{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
                          <h4 className="text-xs font-bold uppercase text-primary mb-2 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" /> Explicação Oficial
                          </h4>
                          <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                            {item.question.explanation}
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            className="border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500/10 hover:text-green-500"
                            onClick={() => removeMutation.mutate(item.id)}
                            disabled={removeMutation.isPending}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            DOMINEI ESTE TÓPICO
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
