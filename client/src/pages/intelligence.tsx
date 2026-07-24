import { useQuery } from "@tanstack/react-query";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { BrainCircuit, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import type { TopicProgress } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useUser } from "@/hooks/use-auth";
import { AppLayout } from "@/components/layout/app-layout";

export default function Intelligence() {
  const { data: user } = useUser();

  const { data: topicProgress, isLoading } = useQuery<TopicProgress[]>({
    queryKey: ["/api/progress/topics"],
    queryFn: async () => {
      const res = await fetch("/api/progress/topics", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load topic progress");
      return res.json();
    },
  });

  // Calculate stats for the Radar Chart
  let chartData = (topicProgress || []).map((t) => {
    const rate = t.totalQuestions > 0 ? (t.correctAnswers / t.totalQuestions) * 100 : 0;
    return {
      subject: t.topic.length > 15 ? t.topic.substring(0, 15) + "..." : t.topic,
      fullTopic: t.topic,
      score: Math.round(rate),
      total: t.totalQuestions,
      fullMark: 100,
    };
  });

  // Recharts RadarChart needs at least 3 points to form a polygon.
  // Pad with dummy data if less than 3 topics are mapped.
  if (chartData.length > 0 && chartData.length < 3) {
    const dummiesNeeded = 3 - chartData.length;
    for (let i = 0; i < dummiesNeeded; i++) {
      chartData.push({
        subject: `(Dados Pendentes ${i + 1})`,
        fullTopic: "Aguardando mais resoluções...",
        score: 0,
        total: 0,
        fullMark: 100,
      });
    }
  }

  // Alerts logic: Less than 60% with at least 5 questions
  const alerts = chartData.filter(d => d.score < 60 && d.total >= 5);
  const goodStanding = chartData.filter(d => d.score >= 80 && d.total >= 5);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">
              <BrainCircuit className="w-8 h-8 text-primary" />
              Relatório de Inteligência
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mt-1">
              Conselho de Guerra • Análise Preditiva de Desempenho
            </p>
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] md:col-span-2 rounded-2xl" />
            <Skeleton className="h-[400px] rounded-2xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Radar Chart Section */}
            <Card className="md:col-span-2 border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BrainCircuit className="w-48 h-48" />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="uppercase tracking-widest text-sm text-primary flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Mapeamento Tático por Tópico
                </CardTitle>
                <CardDescription>
                  Seu nível de domínio nos tópicos cobrados no edital EAGS SIN.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                {chartData.length > 0 ? (
                  <div className="h-[350px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: "bold" }} 
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                        <Radar
                          name="Domínio (%)"
                          dataKey="score"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px" }}
                          itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                          labelStyle={{ color: "#f8fafc", fontWeight: "black" }}
                          formatter={(value: number) => [`${value}%`, 'Eficiência']}
                          labelFormatter={(label, payload) => {
                            if (payload && payload.length > 0) {
                              return payload[0].payload.fullTopic;
                            }
                            return label;
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[350px] flex flex-col items-center justify-center text-center p-6 text-muted-foreground border-2 border-dashed border-slate-800 rounded-xl">
                    <BrainCircuit className="w-12 h-12 opacity-20 mb-3" />
                    <p className="font-bold uppercase tracking-widest text-sm">Dados Insuficientes</p>
                    <p className="text-xs">Inicie um treinamento tático para gerar mapeamento.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Alerts Section */}
            <div className="space-y-6">
              <Card className="border-red-900/50 bg-red-950/20 shadow-xl overflow-hidden">
                <div className="h-1 w-full bg-red-600 animate-pulse" />
                <CardHeader>
                  <CardTitle className="uppercase tracking-widest text-xs text-red-500 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Alertas Críticos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.length > 0 ? (
                    alerts.map((a, i) => (
                      <div key={i} className="bg-red-900/40 border border-red-800/50 p-3 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-red-200">
                            Rendimento Crítico: <span className="font-black text-red-400">{a.score}%</span>
                          </p>
                          <p className="text-xs text-red-300/80 mt-1">
                            Seu domínio em <span className="font-bold">"{a.fullTopic}"</span> pode comprometer a aprovação. Sugerimos foco intensivo.
                          </p>
                        </div>
                      </div>
                    ))
                  ) : chartData.length > 0 ? (
                    <div className="text-center p-4">
                      <p className="text-sm text-emerald-400 font-bold">Nenhum alerta crítico!</p>
                      <p className="text-xs text-muted-foreground mt-1">Continue mantendo o padrão.</p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">Aguardando dados...</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-emerald-900/50 bg-emerald-950/20 shadow-xl overflow-hidden">
                <div className="h-1 w-full bg-emerald-500" />
                <CardHeader>
                  <CardTitle className="uppercase tracking-widest text-xs text-emerald-500 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Destaques Táticos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goodStanding.length > 0 ? (
                    goodStanding.map((a, i) => (
                      <div key={i} className="bg-emerald-900/40 border border-emerald-800/50 p-3 rounded-lg flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-emerald-200">
                            Excelente Domínio: <span className="font-black text-emerald-400">{a.score}%</span>
                          </p>
                          <p className="text-xs text-emerald-300/80 mt-1">
                            Você está dominando <span className="font-bold">"{a.fullTopic}"</span>.
                          </p>
                        </div>
                      </div>
                    ))
                  ) : chartData.length > 0 ? (
                    <div className="text-center p-4">
                      <p className="text-xs text-muted-foreground">Continue treinando para dominar matérias com mais de 80% de acerto.</p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">Aguardando dados...</p>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        )}
      </div>
    </AppLayout>
  );
}
