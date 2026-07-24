import { AppLayout } from "@/components/layout/app-layout";
import { useQuestionStats } from "@/hooks/use-questions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database, Server, DatabaseZap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Arsenal() {
  const { data: stats, isLoading } = useQuestionStats();

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-8 md:p-12 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-border" style={{ background: "var(--card-gradient)" }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="relative z-10 flex items-center gap-6">
            <div className="p-4 bg-primary/20 rounded-2xl border border-primary/30">
              <Database className="w-12 h-12 text-primary" />
            </div>
            <div>
              <p className="text-primary text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-primary pl-3 italic">
                Base de Conhecimento
              </p>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tight mb-3 leading-none">
                BANCO DE QUESTÕES
              </h1>
              <p className="text-primary-foreground/80 font-semibold text-sm max-w-lg">
                Visão geral de todos os dados táticos alimentados no sistema e disponíveis para treinamento.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border shadow-xl relative overflow-hidden bg-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-black tracking-widest">
                <DatabaseZap className="w-4 h-4 text-blue-500" />
                TOTAL NO ARSENAL
              </CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold tracking-widest mt-1">
                Volume de dados global
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-16 w-32" />
              ) : (
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-6xl font-black text-foreground">{stats?.total ?? 0}</span>
                  <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Questões</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-border shadow-xl bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
              <div>
                <CardTitle className="flex items-center gap-2 text-base font-black tracking-widest">
                  <Server className="w-4 h-4 text-muted-foreground" />
                  DISTRIBUIÇÃO POR DISCIPLINA
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : stats && stats.bySubject ? (
                <div className="divide-y divide-border">
                  {Object.entries(stats.bySubject).map(([subject, count]) => {
                    const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                    return (
                      <div key={subject} className="px-6 py-4 hover:bg-muted/10 transition-colors flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-sm text-foreground uppercase tracking-wider">{subject}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground">{percentage}%</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black">{count}</span>
                          <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Registros</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground font-semibold text-sm">
                  Nenhum dado encontrado no banco.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
