import { useUser } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { useExamHistory, useExamHistoryByDate } from "@/hooks/use-exams";
import { useActivityLog } from "@/hooks/use-activity";
import { useSubjectProgress } from "@/hooks/use-subject-progress";
import { useDailyMissions } from "@/hooks/use-missions";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { Activity, Target, Shield, ShieldCheck, Crosshair, Award, Clock, History, TrendingUp, Zap, Flame, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Link } from "wouter";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { RANKS, getRankForScore } from "@shared/schema";

export default function Dashboard() {
  const { data: user } = useUser();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: history, isLoading: historyLoading } = useExamHistory();
  const { data: activityLogs, isLoading: activityLoading } = useActivityLog();
  const { data: subjectProgress, isLoading: subjectLoading } = useSubjectProgress();
  const { data: missions, isLoading: missionsLoading } = useDailyMissions();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data: dailyHistory, isLoading: dailyHistoryLoading } = useExamHistoryByDate(selectedDate);

  const rank = progress ? getRankForScore(progress.xp) : RANKS[0];
  const nextRank = RANKS.find(r => r.tier === rank.tier + 1);
  const currentXP = progress?.xp || 0;
  const rankProgress = nextRank 
    ? ((currentXP - rank.threshold) / (nextRank.threshold - rank.threshold)) * 100 
    : 100;

  const chartData = progress && progress.totalQuestions > 0 ? [
    { name: 'Correto', value: progress.correctAnswers, color: 'hsl(217 91% 60%)' },
    { name: 'Incorreto', value: progress.wrongAnswers, color: 'hsl(0 62% 55%)' }
  ] : [];

  const accuracy = progress && progress.totalQuestions > 0
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
    : 0;

  const subjectChartData = subjectProgress?.map(sp => ({
    name: sp.subject.length > 15 ? sp.subject.substring(0, 15) + "..." : sp.subject,
    fullName: sp.subject,
    acertos: Math.round((sp.correctAnswers / sp.totalQuestions) * 100),
    total: sp.totalQuestions,
    fill: Math.round((sp.correctAnswers / sp.totalQuestions) * 100) >= 70 ? 'hsl(142.1 76.2% 36.3%)' :
          Math.round((sp.correctAnswers / sp.totalQuestions) * 100) >= 50 ? 'hsl(47.9 95.8% 53.1%)' : 'hsl(0 84.2% 60.2%)'
  })) || [];

  const patentLabel =
    user?.patent === "Civilian" ? "Civil" :
    user?.patent === "Recruit" ? "Recruta" :
    user?.patent === "Student" ? "Aluno" :
    user?.patent === "Third Sergeant" ? "Terceiro-Sargento" :
    user?.patent ?? "";

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">

        {/* XP Progress Bar Card */}
        <div className="mb-2">
          <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Shield className="w-32 h-32" />
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 relative">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 relative"
                    style={{ backgroundColor: rank.bgColor }}
                  >
                    <Shield className="w-10 h-10" style={{ color: rank.color }} />
                  </div>
                  {nextRank && (
                    <div className="absolute -bottom-2 -right-2 bg-slate-800 text-[10px] font-black px-2 py-1 rounded border border-slate-700">
                      LVL {rank.tier}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 w-full space-y-3 z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-wider" style={{ color: rank.color }}>
                        {rank.name}
                      </h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {user?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-200">{currentXP} XP</span>
                      {nextRank && (
                        <span className="text-xs text-slate-500 font-bold ml-1">/ {nextRank.threshold} XP</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, Math.max(0, rankProgress))}%` }}
                    />
                  </div>
                  
                  {nextRank ? (
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-right">
                      Próxima Promoção: <span className="text-slate-300">{nextRank.name}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-yellow-500 font-black uppercase tracking-widest text-right">
                      Patente Máxima Alcançada!
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest px-8 h-12 shadow-xl shadow-blue-900/50 border-0 text-xs uppercase w-full md:w-auto">
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

            {/* Daily Missions */}
            <div className="mt-8 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-black uppercase tracking-widest text-blue-100">Missões Diárias Oficiais</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {missionsLoading ? (
                  [1, 2, 3].map(i => <Skeleton key={i} className="h-28 w-full bg-white/10 rounded-xl" />)
                ) : missions && missions.length > 0 ? (
                  missions.map(mission => (
                    <div key={mission.id} className={`bg-slate-900/60 border rounded-xl p-4 backdrop-blur-sm relative overflow-hidden ${mission.completed ? 'border-yellow-500/50' : 'border-white/10 border-l-4 border-l-blue-500'}`}>
                      {mission.completed && (
                        <div className="absolute -top-3 -right-3 bg-yellow-500 text-yellow-950 font-black text-[10px] uppercase tracking-widest py-4 px-6 rotate-45 transform origin-bottom-left shadow-lg">
                          Concluída
                        </div>
                      )}
                      <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1 pr-6">{mission.title}</h4>
                      <p className="text-[10px] text-blue-200/60 font-bold uppercase mb-3">
                        {mission.type === 'total_questions' ? `Responder ${mission.targetValue} questões` :
                         mission.type === 'subject_streak' ? `Acertar ${mission.targetValue} questões` :
                         mission.type === 'flashcard_review' ? `Revisar ${mission.targetValue} cartões` :
                         mission.type === 'review_wrong' ? `Refazer ${mission.targetValue} erros` :
                         `Progredir ${mission.targetValue} vezes`}
                      </p>
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-black text-yellow-400">+{mission.xpReward} XP</span>
                        <span className="text-[10px] font-bold text-slate-400">{Math.min(mission.currentValue, mission.targetValue)} / {mission.targetValue}</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${mission.completed ? 'bg-yellow-400' : 'bg-blue-500'}`}
                          style={{ width: `${Math.min(100, (mission.currentValue / mission.targetValue) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-6 border border-dashed border-white/20 rounded-xl bg-white/5">
                    <p className="text-xs text-blue-200/60 font-bold uppercase tracking-widest">Aguardando Novas Missões</p>
                  </div>
                )}
              </div>
            </div>

            {/* Streaks & Heatmap Container */}
            <div className="mt-6 flex flex-col xl:flex-row gap-6">
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-sm xl:w-64 flex-shrink-0 flex flex-col justify-center border-b-2 border-b-orange-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-orange-400">Ofensiva</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Missões Diárias</p>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    {progressLoading ? <Skeleton className="h-10 w-16 bg-white/10" /> : (
                      <span className="text-4xl font-black text-white">{progress?.currentStreak ?? 0}</span>
                    )}
                    <span className="text-xs text-orange-200/60 ml-1 font-bold uppercase">Dias</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] uppercase font-black text-muted-foreground tracking-wider mb-0.5">Recorde</span>
                    {progressLoading ? <Skeleton className="h-4 w-8 bg-white/10" /> : (
                      <span className="text-sm font-black text-white">{progress?.longestStreak ?? 0}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-sm flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Radar de Hábitos</h3>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Últimos 364 dias</span>
                </div>
                {activityLoading ? (
                  <Skeleton className="w-full h-32 bg-white/10" />
                ) : (
                  <ContributionGraph logs={activityLogs} onDayClick={setSelectedDate} />
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

          <div className="lg:col-span-2 space-y-6 flex flex-col">
            {/* Subject Progress Chart */}
            <Card className="border-border shadow-xl bg-card flex-1">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base font-black tracking-widest">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    ANÁLISE POR DISCIPLINA
                  </CardTitle>
                  <CardDescription className="text-[10px] mt-1 uppercase tracking-widest font-bold">
                    Percentual de acertos por matéria
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {subjectLoading ? (
                  <Skeleton className="h-[200px] w-full" />
                ) : subjectChartData.length > 0 ? (
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tickFormatter={(val) => `${val}%`} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Tooltip
                          cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                          formatter={(value: any) => [`${value}% de acerto`, 'Eficiência']}
                          labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                        />
                        <Bar dataKey="acertos" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[200px] flex flex-col items-center justify-center text-center px-4">
                    <BarChart3 className="w-10 h-10 text-muted-foreground/30 mb-3" />
                    <p className="text-xs font-semibold text-muted-foreground">Sem dados suficientes por disciplina.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* History */}
            <Card className="border-border shadow-xl bg-card">
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
                <Link href="/history">
                  <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest">
                    Ver Todos
                  </Button>
                </Link>
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
      </div>

      <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="font-black tracking-widest uppercase text-blue-400">
              Relatório Diário — {selectedDate && format(parseISO(selectedDate), "dd 'de' MMMM, yyyy", { locale: ptBR })}
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              Desempenho e Módulos Estudados
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            {dailyHistoryLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full bg-slate-800" />
                <Skeleton className="h-16 w-full bg-slate-800" />
              </div>
            ) : dailyHistory && dailyHistory.length > 0 ? (
              <div className="space-y-4">
                {dailyHistory.map((session, i) => (
                  <div key={session.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-md">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-black text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Sessão {dailyHistory.length - i} — {session.mode === 'mock_exam' ? 'Simulado' : 'Treinamento'}
                      </div>
                      <div className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded-md">
                        {session.score} / {session.totalQuestions} Acertos
                      </div>
                    </div>
                    {session.details && (session.details as any).subjects && Object.keys((session.details as any).subjects).length > 0 ? (
                      <div className="space-y-2 mt-4">
                        <div className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Disciplinas Abordadas</div>
                        {Object.entries((session.details as any).subjects).map(([subject, stats]: [string, any]) => (
                          <div key={subject} className="flex justify-between items-center bg-slate-800/50 p-2.5 rounded-lg text-xs">
                            <span className="font-semibold text-slate-300">{subject}</span>
                            <div className="flex gap-3">
                              <span className="text-green-400 font-bold flex items-center gap-1">
                                {stats.correct} <span className="text-[10px]">✓</span>
                              </span>
                              <span className="text-red-400 font-bold flex items-center gap-1">
                                {stats.wrong} <span className="text-[10px]">✗</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic mt-3">Detalhes por disciplina não registrados (Sessão Antiga).</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 font-bold uppercase tracking-widest text-xs">
                Nenhum módulo concluído nesta data.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
