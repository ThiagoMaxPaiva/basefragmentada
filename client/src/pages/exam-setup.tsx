import { useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import { useSubjects, useTopics } from "@/hooks/use-questions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Crosshair, BookOpen, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function ExamSetup() {
  const [, setLocation] = useLocation();
  const { data: subjects, isLoading: loadingSubjects } = useSubjects();

  const [subject, setSubject] = useState<string>("");
  const { data: topics, isLoading: loadingTopics } = useTopics(subject === "mixed" ? undefined : subject);

  const [topic, setTopic] = useState<string>("");
  const [mode, setMode] = useState<"training" | "mock_exam">("training");
  const [limit, setLimit] = useState<string>("10");

  const handleStart = () => {
    if (!subject) return;
    const params = new URLSearchParams({ subject, mode, limit });
    if (topic && subject !== "mixed") params.append("topic", topic);
    setLocation(`/exam?${params.toString()}`);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pt-2 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Page Header */}
          <div className="card-gradient p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-blue-900/40">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-blue-400 text-[10px] uppercase tracking-widest font-black mb-2 border-l-4 border-blue-500 pl-3 italic">
                Centro de Treinamento — EAGS SIN
              </p>
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-7 h-7 text-blue-400" />
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tight">PARÂMETROS DA MISSÃO</h1>
              </div>
              <p className="text-blue-200/70 font-semibold text-sm">Configure a especialização, o modo e a duração antes da implantação.</p>
            </div>
          </div>

          {/* Config Card */}
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Subject & Topic */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" /> Especialização Principal
                    </Label>
                    <Select value={subject} onValueChange={(v) => { setSubject(v); setTopic(""); }}>
                      <SelectTrigger className="h-12 border-border bg-background font-semibold">
                        <SelectValue placeholder={loadingSubjects ? "Carregando..." : "Selecionar Disciplina"} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="mixed" className="font-black text-blue-400">✦ Simulado Completo (Ambas)</SelectItem>
                        {subjects?.map(s => (
                          <SelectItem key={s} value={s} className="font-semibold">
                            {s === "Portuguese" ? "Português" : s === "Specialized IT Knowledge" ? "Conhecimentos Especializados de TI" : s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={`space-y-2 transition-opacity duration-300 ${!subject || subject === "mixed" ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                    <Label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                      <Crosshair className="w-3.5 h-3.5" /> Área de Foco (Opcional)
                    </Label>
                    <Select value={topic} onValueChange={setTopic} disabled={!subject || subject === "mixed"}>
                      <SelectTrigger className="h-12 border-border bg-background font-semibold">
                        <SelectValue placeholder={loadingTopics ? "Carregando..." : "Todos os Tópicos"} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="all">Todos os Tópicos</SelectItem>
                        {topics?.map(t => (
                          <SelectItem key={t} value={t} className="font-semibold">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Mode & Limit */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Modo de Engajamento</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${mode === 'training' ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-900/30' : 'border-border bg-card hover:bg-muted/20'}`}
                        onClick={() => setMode('training')}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className={`w-3.5 h-3.5 ${mode === 'training' ? 'text-blue-400' : 'text-muted-foreground'}`} />
                          <div className={`font-black text-sm uppercase tracking-wide ${mode === 'training' ? 'text-blue-300' : 'text-foreground'}`}>Treino</div>
                        </div>
                        <div className="text-[10px] text-muted-foreground leading-relaxed font-semibold">Feedback imediato + IA disponível.</div>
                      </div>
                      <div
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${mode === 'mock_exam' ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-900/30' : 'border-border bg-card hover:bg-muted/20'}`}
                        onClick={() => setMode('mock_exam')}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Target className={`w-3.5 h-3.5 ${mode === 'mock_exam' ? 'text-yellow-400' : 'text-muted-foreground'}`} />
                          <div className={`font-black text-sm uppercase tracking-wide ${mode === 'mock_exam' ? 'text-yellow-300' : 'text-foreground'}`}>Simulado</div>
                        </div>
                        <div className="text-[10px] text-muted-foreground leading-relaxed font-semibold">Cronometrado, resultado no final.</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Duração da Missão</Label>
                    <Select value={limit} onValueChange={setLimit}>
                      <SelectTrigger className="h-12 border-border bg-background font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="5" className="font-semibold">5 Questões — Briefing</SelectItem>
                        <SelectItem value="10" className="font-semibold">10 Questões — Padrão</SelectItem>
                        <SelectItem value="20" className="font-semibold">20 Questões — Estendido</SelectItem>
                        <SelectItem value="50" className="font-semibold">50 Questões — Avaliação Completa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-muted/10 px-8 py-5 flex justify-end">
              <Button
                size="lg"
                className="font-black tracking-widest uppercase px-10 h-12 bg-blue-600 hover:bg-blue-500 text-white border-0 text-xs shadow-xl shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!subject}
                onClick={handleStart}
                data-testid="button-start-exam"
              >
                <Crosshair className="w-4 h-4 mr-2" />
                IMPLANTAR MÓDULO
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
