import { AppLayout } from "@/components/layout/app-layout";
import { useExamHistory } from "@/hooks/use-exams";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Zap, Clock, History as HistoryIcon, ArrowUpRight, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function History() {
  const { data: history, isLoading } = useExamHistory();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pt-2 md:pt-8 space-y-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl text-white shadow-xl relative overflow-hidden"
          style={{ background: "var(--card-gradient)" }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-blue-500 pl-3 italic opacity-80">
              Arquivo Confidencial
            </p>
            <div className="flex items-center gap-3 mb-2">
              <HistoryIcon className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase drop-shadow-sm">
                Registro de Serviço
              </h1>
            </div>
            <p className="opacity-80 font-medium max-w-2xl text-sm leading-relaxed">
              Consulte seu histórico operacional. Cada missão concluída, seja em treinamento ou simulado, fica documentada para auditoria e progressão na carreira.
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-8 w-16 mb-2 ml-auto" />
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : !history || history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 px-4"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Arquivo Vazio</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Você ainda não realizou nenhuma missão de treinamento ou simulado.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {history.map((exam, index) => {
                const pct = exam.totalQuestions > 0 ? Math.round((exam.score / exam.totalQuestions) * 100) : 0;
                const isMock = exam.mode === 'mock_exam';
                
                return (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-border shadow-sm overflow-hidden bg-card hover:border-primary/30 transition-colors group">
                      <CardContent className="p-0">
                        <div className="px-6 py-5 flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div className={`p-3 rounded-xl border flex-shrink-0 ${isMock ? 'bg-blue-500/10 border-blue-500/20 text-blue-500 dark:text-blue-400' : 'bg-secondary/20 border-secondary/30 text-muted-foreground'}`}>
                              {isMock ? <Award className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                            </div>
                            <div>
                              <h4 className="font-black text-base md:text-lg text-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                                {isMock ? 'Simulado Tático' : 'Treinamento Padrão'}
                              </h4>
                              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground mt-1 font-bold">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  {exam.completedAt ? format(new Date(exam.completedAt), "dd/MM/yyyy 'às' HH:mm") : 'Desconhecido'}
                                </span>
                                <span className="hidden md:inline text-border">•</span>
                                <span className="text-[10px] bg-muted/50 px-2 py-0.5 rounded border border-border uppercase tracking-widest">
                                  ID da Operação: #{exam.id}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right flex items-center gap-6">
                            <div className="hidden md:block text-right">
                              <span className="block text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Questões</span>
                              <div className="font-bold">
                                {exam.score} <span className="text-muted-foreground">/ {exam.totalQuestions}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-center">
                              <div className={`text-2xl font-black ${pct >= 70 ? 'text-green-600 dark:text-green-400' : pct >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                {pct}%
                              </div>
                              <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">
                                Eficiência
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
