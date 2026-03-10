import { useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import { useSubjects, useTopics } from "@/hooks/use-questions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Crosshair, BookOpen } from "lucide-react";
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
      <div className="max-w-3xl mx-auto pt-4 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display font-bold tracking-tight mb-3 flex items-center justify-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              PARÂMETROS DA MISSÃO
            </h1>
            <p className="text-muted-foreground font-medium text-lg">Configure as definições do seu módulo de treinamento antes da implantação.</p>
          </div>

          <Card className="border-border/60 shadow-xl overflow-hidden backdrop-blur-sm bg-card/95">
            <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary"></div>
            <CardHeader className="bg-muted/20 border-b border-border/50 pb-8">
              <CardTitle className="text-xl">Protocolo de Configuração</CardTitle>
              <CardDescription className="text-sm font-medium">Selecione a especialização, área de foco e regras de engajamento.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Subject & Topic */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Especialização Principal
                    </Label>
                    <Select value={subject} onValueChange={(v) => { setSubject(v); setTopic(""); }}>
                      <SelectTrigger className="h-12 border-border/80 focus:ring-primary/20 transition-all shadow-sm">
                        <SelectValue placeholder={loadingSubjects ? "Carregando..." : "Selecionar Disciplina"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mixed" className="font-medium font-bold text-primary">✦ Simulado Completo (Ambas)</SelectItem>
                        {subjects?.map(s => (
                          <SelectItem key={s} value={s} className="font-medium">{s === "Portuguese" ? "Português" : s === "Specialized IT Knowledge" ? "Conhecimentos Especializados de TI" : s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={`space-y-3 transition-opacity duration-300 ${!subject || subject === "mixed" ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                      <Crosshair className="w-4 h-4" /> Área de Foco Secundária (Opcional)
                    </Label>
                    <Select value={topic} onValueChange={setTopic} disabled={!subject || subject === "mixed"}>
                      <SelectTrigger className="h-12 border-border/80 focus:ring-primary/20 transition-all shadow-sm">
                        <SelectValue placeholder={loadingTopics ? "Carregando..." : "Todos os Tópicos"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Tópicos</SelectItem>
                        {topics?.map(t => (
                          <SelectItem key={t} value={t} className="font-medium">{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Mode & Limit */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Modo de Engajamento</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${mode === 'training' ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-border bg-card hover:bg-muted/50'}`}
                        onClick={() => setMode('training')}
                      >
                        <div className="font-bold mb-1">Treinamento</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">Feedback imediato, assistência de IA disponível.</div>
                      </div>
                      <div 
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${mode === 'mock_exam' ? 'border-secondary bg-secondary/5 shadow-md shadow-secondary/10' : 'border-border bg-card hover:bg-muted/50'}`}
                        onClick={() => setMode('mock_exam')}
                      >
                        <div className="font-bold mb-1">Simulado</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">Cenário cronometrado, resultados calculados ao final.</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Duração da Missão (Questões)</Label>
                    <Select value={limit} onValueChange={setLimit}>
                      <SelectTrigger className="h-12 border-border/80 focus:ring-primary/20 shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Questões (Briefing)</SelectItem>
                        <SelectItem value="10">10 Questões (Padrão)</SelectItem>
                        <SelectItem value="20">20 Questões (Estendido)</SelectItem>
                        <SelectItem value="50">50 Questões (Avaliação Completa)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t border-border/50 p-6 flex justify-end">
              <Button 
                size="lg" 
                className="w-full sm:w-auto font-bold tracking-widest px-10 h-14" 
                disabled={!subject}
                onClick={handleStart}
              >
                IMPLANTAR MÓDULO
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}
