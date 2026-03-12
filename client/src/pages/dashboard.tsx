import { useUser } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { useExamHistory } from "@/hooks/use-exams";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Target, ShieldCheck, Crosshair, Award, Clock, History, TrendingUp, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "wouter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: user } = useUser();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: history, isLoading: historyLoading } = useExamHistory();

  const chartData = progress && progress.totalQuestions > 0 ? [
    { name: 'Correto', value: progress.correctAnswers, color: 'hsl(217 91% 60%)' },
    { name: 'Incorreto', value: progress.wrongAnswers, color: 'hsl(0 62% 55%)' }
  ] : [];

  const accuracy = progress && progress.totalQuestions > 0
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
    : 0;

  const patentLabel =
    user?.patent === "Civilian" ? "Civil" :
    user?.patent === "Recruit" ? "Recruta" :
    user?.patent === "Student" ? "Aluno" :
    user?.patent === "Third Sergeant" ? "Terceiro-Sargento" :
    user?.patent ?? "";

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Hero Banner */}
        <div className="p-8 md:p-12 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-border" style={{ background: "var(--card-gradient)" }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-blue-400 text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-blue-500 pl-3 italic">
                  Força Aérea Brasileira — EAGS SIN
                </p>
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tight mb-3 leading-none">
                  CENTRO DE OPERAÇÕES
                </h1>
                <p className="text-blue-200/80 font-semibold text-sm max-w-lg">
                  Bem-vindo, <span className="text-white font-black">{patentLabel} {user?.name}</span>. Monitore sua prontidão e inicie o treinamento agora.
                </p>
              </div>
              <Link href="/setup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest px-8 h-12 shadow-xl shadow-blue-900/50 border-0 text-xs uppercase">
                  <Crosshair className="w-4 h-4 mr-2" />
                  IMPLANTAR MÓDULO
                </Button>
              </Link>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm border-b-2 border-b-blue-500">
                <span className="block text-[10px] uppercase font-black text-blue-400 tracking-widest mb-1">Total Respondido</span>
                {progressLoading ? <Skeleton className="h-8 w-16 bg-white/10" /> : (
                  <span className="text-3xl font-black text-white">{progress?.totalQuestions ?? 0}</span>
                )}
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm border-b-2 border-b-yellow-500">
                <span className="block text-[10px] uppercase font-black text-yellow-400 tracking-widest mb-1">Total Acertos</span>
                {progressLoading ? <Skeleton className="h-8 w-16 bg-white/10" /> : (
                  <span className="text-3xl font-black text-white">{progress?.correctAnswers ?? 0}</span>
                )}
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm border-b-2 border-b-red-500">
                <span className="block text-[10px] uppercase font-black text-red-400 tracking-widest mb-1">Erros Acumulados</span>
                {progressLoading ? <Skeleton className="h-8 w-16 bg-white/10" /> : (
                  <span className="text-3xl font-black text-white">{progress?.wrongAnswers ?? 0}</span>
                )}
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm border-b-2 border-b-green-500">
                <span className="block text-[10px] uppercase font-black text-green-400 tracking-widest mb-1">Eficiência</span>
                {progressLoading ? <Skeleton className="h-8 w-16 bg-white/10" /> : (
                  <span className="text-3xl font-black text-white">{accuracy}%</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Pie Chart */}
          <Card className="lg:col-span-1 border-border shadow-xl relative overflow-hidden bg-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-black tracking-widest">
                <Activity className="w-4 h-4 text-accent" />
                PRONTIDÃO OPERACIONAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressLoading ? (
                <div className="space-y-4 py-6">
                  <Skeleton className="h-48 w-full rounded-full" />
                </div>
              ) : chartData.length > 0 ? (
                <div className="flex flex-col items-center">
                  <div className="h-48 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={58}
                          outerRadius={78}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(222 47% 9%)', borderColor: 'hsl(217 35% 15%)', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}
                          itemStyle={{ color: 'hsl(210 40% 96%)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-black text-foreground">{accuracy}%</span>
                      <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Precisão</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full mt-4">
                    <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 flex flex-col items-center">
                      <span className="text-2xl font-black text-primary">{progress?.correctAnswers}</span>
                      <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Acertos</span>
                    </div>
                    <div className="bg-destructive/10 p-3 rounded-xl border border-destructive/20 flex flex-col items-center">
                      <span className="text-2xl font-black text-destructive">{progress?.wrongAnswers}</span>
                      <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Erros</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center px-4">
                  <Target className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-xs font-semibold text-muted-foreground">Complete módulos de treinamento para gerar análises táticas.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* History */}
          <Card className="lg:col-span-2 border-border shadow-xl bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
              <div>
                <CardTitle className="flex items-center gap-2 text-base font-black tracking-widest">
                  <History className="w-4 h-4 text-muted-foreground" />
                  DESLOCAMENTOS RECENTES
                </CardTitle>
                <CardDescription className="text-[10px] mt-1 uppercase tracking-widest font-bold">
                  Seus últimos resultados de exames
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {historyLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : history && history.length > 0 ? (
                <div className="divide-y divide-border max-h-[350px] overflow-y-auto">
                  {history.slice(0, 6).map((exam) => {
                    const pct = exam.totalQuestions > 0 ? Math.round((exam.score / exam.totalQuestions) * 100) : 0;
                    const isMock = exam.mode === 'mock_exam';
                    return (
                      <div key={exam.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl border ${isMock ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-secondary/20 border-secondary/30 text-muted-foreground'}`}>
                            {isMock ? <Award className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="font-black text-sm text-foreground uppercase tracking-wider">
                              {isMock ? 'Simulado' : 'Treinamento'}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5 font-bold">
                              <Clock className="w-3 h-3" />
                              {exam.completedAt ? format(new Date(exam.completedAt), "dd/MM/yyyy — HH:mm") : 'Desconhecido'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-foreground">
                            {exam.score}<span className="text-muted-foreground text-sm font-semibold"> / {exam.totalQuestions}</span>
                          </div>
                          <div className={`text-[10px] font-black uppercase tracking-wider ${pct >= 70 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {pct}% eficiência
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="bg-muted/30 p-4 rounded-2xl mb-4">
                    <ShieldCheck className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-black text-base uppercase tracking-wider">Nenhum Registro Encontrado</h3>
                  <p className="text-xs text-muted-foreground mt-2 max-w-sm font-medium leading-relaxed">
                    Você ainda não completou nenhum módulo. Implante agora para construir seu registro de serviço.
                  </p>
                  <Link href="/setup" className="mt-4">
                    <Button size="sm" className="font-black uppercase tracking-widest text-xs">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      INICIAR AGORA
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
