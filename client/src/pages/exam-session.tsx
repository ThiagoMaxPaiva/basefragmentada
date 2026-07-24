import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import { useQuestions } from "@/hooks/use-questions";
import { useSubmitExam } from "@/hooks/use-exams";
import { useAIExplanation } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, CheckCircle2, ChevronRight, AlertCircle, Clock, Check, X, ClipboardList, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

function FormattedQuestionText({ text, className }: { text?: string, className?: string }) {
  if (!text) return null;
  
  let processed = text;
  
  // Add newline before ( )
  processed = processed.replace(/(\(\s*\))/g, '\n$1');
  
  // Add newline before Roman numerals (I-, II-, etc)
  processed = processed.replace(/\b(I{1,3}|IV|V|VI{1,3})\s*[-–]/g, '\n$1 - ');
  
  // Add newline before numbers (1 -, 2 -, etc)
  processed = processed.replace(/\b(\d+)\s*[-–]\s/g, '\n$1 - ');
  
  const paragraphs = processed.split('\n').map(p => p.trim()).filter(Boolean);

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}

export default function ExamSession() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const subject = searchParams.get("subject") || "";
  const topic = searchParams.get("topic") || undefined;
  const mode = (searchParams.get("mode") as "training" | "mock_exam") || "training";
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const { data: questions, isLoading } = useQuestions({ subject, topic: topic === "all" ? undefined : topic, limit });
  const submitExam = useSubmitExam();
  const aiExp = useAIExplanation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(limit * 120); // 2 mins per question
  
  // Training mode specific state
  const [showExplanation, setShowExplanation] = useState(false);
  const [aiText, setAiText] = useState<Record<number, string>>({});
  const [hasStarted, setHasStarted] = useState(mode === "training");

  useEffect(() => {
    if (mode === "mock_exam" && hasStarted && !isFinished && questions && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, isFinished, questions]);

  const currentQuestion = questions?.[currentIndex];
  const reviewQuestion = questions?.[reviewIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (answers[currentIndex] !== undefined && mode === "training") return; // Prevent changing answer in training mode
    
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
    
    if (mode === "training") {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < (questions?.length || 0) - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    }
    if (!questions) return;

    // Build payload matching api schema
    const payloadAnswers = questions.map((q, idx) => ({
      questionId: q.id,
      selectedOption: answers[idx] ?? -1 // -1 for unanswered
    })).filter(a => a.selectedOption !== -1);

    submitExam.mutate({
      mode,
      answers: payloadAnswers
    });
  };

  const requestAI = (qId: number) => {
    aiExp.mutate(qId, {
      onSuccess: (data) => setAiText(prev => ({ ...prev, [qId]: data.explanation }))
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!subject) {
    setLocation("/setup");
    return null;
  }

  if (isLoading) {
    return <AppLayout><div className="h-[60vh] flex items-center justify-center"><Spinner size="xl" /></div></AppLayout>;
  }

  if (!questions || questions.length === 0) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nenhuma Informação Disponível</h2>
          <p className="text-muted-foreground mb-6">Não conseguimos encontrar questões que correspondam aos seus critérios.</p>
          <Button onClick={() => setLocation("/setup")}>Voltar para Configuração</Button>
        </div>
      </AppLayout>
    );
  }

  const startMockExam = () => {
    setHasStarted(true);
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.log("Fullscreen Error:", err));
    }
  };

  if (!hasStarted && questions && questions.length > 0) {
    return (
      <AppLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
          <AlertCircle className="w-24 h-24 text-destructive mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-destructive mb-4 tracking-tighter">Missão Crítica</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md font-medium">
            Você está prestes a iniciar um simulado estrito. O ambiente entrará em tela cheia e você terá um cronômetro regressivo implacável.
          </p>
          <Button size="lg" onClick={startMockExam} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-black tracking-widest px-12 py-8 text-xl shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)]">
            INICIAR SIMULADO AGORA
          </Button>
        </div>
      </AppLayout>
    );
  }

  // REVIEW MODE SCREEN
  if (isReviewing && reviewQuestion) {
    const isAnswered = answers[reviewIndex] !== undefined;
    const isCorrect = answers[reviewIndex] === reviewQuestion.correctOption;
    
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto flex flex-col h-full pt-4 pb-12">
          {/* Header */}
          <div className="flex items-center justify-between bg-card p-4 rounded-xl border shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className={`text-white px-4 py-2 rounded-lg font-display font-bold text-xl leading-none ${isCorrect ? 'bg-green-600' : 'bg-destructive'}`}>
                Q{reviewIndex + 1} <span className="text-white/50 text-base">/ {questions.length}</span>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Revisão Tática</div>
                <div className="text-sm font-semibold truncate max-w-[200px] flex items-center gap-2">
                  {isCorrect ? (
                    <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Acertou</span>
                  ) : (
                    <span className="text-destructive flex items-center gap-1"><X className="w-4 h-4" /> Errou</span>
                  )}
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={() => setIsReviewing(false)}>
              Voltar ao Relatório
            </Button>
          </div>

          <Card className="border-border shadow-md mb-8">
            <CardContent className="p-6 md:p-8">
              <FormattedQuestionText 
                text={reviewQuestion.questionText} 
                className="text-xl md:text-2xl font-medium mb-8 text-foreground"
              />
              
              <div className="space-y-3">
                {reviewQuestion.options.map((option, idx) => {
                  const isSelected = answers[reviewIndex] === idx;
                  const isActuallyCorrect = idx === reviewQuestion.correctOption;
                  
                  let optionStateClass = "bg-card border-border opacity-50";
                  let Icon = null;

                  if (isActuallyCorrect) {
                    optionStateClass = "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400 font-medium";
                    Icon = Check;
                  } else if (isSelected) {
                    optionStateClass = "bg-destructive/10 border-destructive text-destructive";
                    Icon = X;
                  }

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border-2 flex items-start gap-4 ${optionStateClass}`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-bold
                        ${isActuallyCorrect ? 'border-green-500 bg-green-500 text-white' : ''}
                        ${isSelected && !isActuallyCorrect ? 'border-destructive bg-destructive text-white' : ''}
                        ${!isActuallyCorrect && !isSelected ? 'border-muted-foreground/40' : ''}
                      `}>
                        {Icon ? <Icon className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                      </div>
                      <div className="font-medium text-[15px] leading-relaxed">{option}</div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="bg-muted p-5 rounded-xl border border-border/50">
                  <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2 flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Explicação Oficial
                  </h4>
                  <p className="text-sm font-medium">{reviewQuestion.explanation}</p>
                  
                  <div className="mt-4 pt-4 border-t border-border/50">
                    {aiText[reviewQuestion.id] ? (
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 relative">
                        <BrainCircuit className="w-5 h-5 absolute top-4 right-4 text-primary opacity-20" />
                        <h4 className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                          <BrainCircuit className="w-4 h-4" /> Análise Tática de IA
                        </h4>
                        <p className="text-sm leading-relaxed">{aiText[reviewQuestion.id]}</p>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => requestAI(reviewQuestion.id)} 
                        disabled={aiExp.isPending}
                        className="bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                      >
                        {aiExp.isPending ? <Spinner size="sm" className="mr-2" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
                        Solicitar Análise Profunda de IA
                      </Button>
                    )}
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Review Nav */}
          <div className="flex justify-between items-center pb-8">
            <Button 
              variant="outline"
              onClick={() => setReviewIndex(prev => prev - 1)} 
              disabled={reviewIndex === 0}
              className="font-bold uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Navegação
            </span>
            <Button 
              variant="outline"
              onClick={() => setReviewIndex(prev => prev + 1)} 
              disabled={reviewIndex === questions.length - 1}
              className="font-bold uppercase tracking-widest"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // RESULT SCREEN
  if (isFinished) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto mt-8 animate-in fade-in zoom-in duration-500">
          <Card className="border-border shadow-2xl">
            <CardContent className="p-12 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-2">Operação Concluída</h2>
              <p className="text-lg text-muted-foreground font-medium mb-8">
                Seus dados de desempenho foram transmitidos ao comando.
              </p>
              
              {submitExam.isPending ? (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Spinner size="lg" />
                  <span className="font-bold tracking-widest text-sm uppercase">Processando Análises...</span>
                </div>
              ) : submitExam.data ? (
                <>
                  <div className="w-full bg-card border border-border/50 rounded-2xl p-8 mb-8 shadow-inner">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Pontos</span>
                        <span className="text-4xl font-display font-bold text-foreground">{submitExam.data.score}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Total</span>
                        <span className="text-4xl font-display font-bold text-foreground">{submitExam.data.totalQuestions}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Precisão</span>
                        <span className="text-4xl font-display font-bold text-primary">
                          {Math.round((submitExam.data.score / submitExam.data.totalQuestions) * 100)}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Modo</span>
                        <span className="text-xl font-display font-bold text-secondary uppercase mt-2">{mode === 'mock_exam' ? 'Simulado' : 'Treinamento'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => {
                        setReviewIndex(0);
                        setIsReviewing(true);
                      }} 
                      className="font-bold tracking-widest flex-1"
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      REVISAR QUESTÕES
                    </Button>
                    <Button size="lg" onClick={() => setLocation("/dashboard")} className="font-bold tracking-widest flex-1">
                      VOLTAR AO COMANDO
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-destructive font-bold mb-8">Falha ao sincronizar resultados. Cópia local retida.</p>
                  <Button size="lg" onClick={() => setLocation("/dashboard")} className="font-bold tracking-widest px-8">
                    VOLTAR AO COMANDO
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // EXAM SCREEN
  const progressVal = ((currentIndex) / questions.length) * 100;
  const isAnswered = answers[currentIndex] !== undefined;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto flex flex-col h-full pt-4">
        
        {/* Exam Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-card p-4 rounded-xl border shadow-sm mb-6 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-display font-bold text-xl leading-none">
              Q{currentIndex + 1} <span className="text-primary-foreground/50 text-base">/ {questions.length}</span>
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-muted-foreground tracking-widest">{subject === "Portuguese" ? "Português" : subject === "Specialized IT Knowledge" ? "Conhecimentos Especializados de TI" : subject}</div>
              <div className="text-sm font-semibold truncate max-w-[200px]">{currentQuestion?.topic}</div>
            </div>
          </div>
          
          {mode === "mock_exam" && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border w-full md:w-auto justify-center transition-colors ${timeLeft < 60 ? 'bg-destructive/20 text-destructive border-destructive/50 animate-pulse' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
              <Clock className="w-5 h-5" />
              <span className="font-display font-bold text-xl tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        <Progress value={progressVal} className="h-2 mb-8 bg-muted" />

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Card className="border-border shadow-md mb-8">
              <CardContent className="p-6 md:p-8">
                <FormattedQuestionText 
                  text={currentQuestion?.questionText} 
                  className="text-xl md:text-2xl font-medium mb-8 text-foreground" 
                />
                
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, idx) => {
                    const isSelected = answers[currentIndex] === idx;
                    let optionStateClass = "bg-card border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer";
                    let Icon = null;

                    if (mode === "training" && isAnswered) {
                      if (idx === currentQuestion.correctOption) {
                        optionStateClass = "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400";
                        Icon = Check;
                      } else if (isSelected) {
                        optionStateClass = "bg-destructive/10 border-destructive text-destructive";
                        Icon = X;
                      } else {
                        optionStateClass = "opacity-50 pointer-events-none border-border bg-card";
                      }
                    } else if (isSelected) {
                      optionStateClass = "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20";
                    }

                    return (
                      <div 
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${optionStateClass} ${mode === "training" && isAnswered && !isSelected && idx !== currentQuestion.correctOption ? 'cursor-default' : ''}`}
                      >
                        <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-bold
                          ${isSelected && mode !== "training" ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40'}
                          ${mode === "training" && idx === currentQuestion.correctOption && isAnswered ? 'border-green-500 bg-green-500 text-white' : ''}
                          ${mode === "training" && isSelected && idx !== currentQuestion.correctOption ? 'border-destructive bg-destructive text-white' : ''}
                        `}>
                          {Icon ? <Icon className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                        </div>
                        <div className="font-medium text-[15px] leading-relaxed">{option}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Training Mode Feedback */}
                {mode === "training" && showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 pt-6 border-t border-border"
                  >
                    <div className="bg-muted p-5 rounded-xl border border-border/50">
                      <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Explicação Padrão</h4>
                      <p className="text-sm font-medium">{currentQuestion?.explanation}</p>
                      
                      <div className="mt-4 pt-4 border-t border-border/50">
                        {aiText[currentQuestion!.id] ? (
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 relative">
                            <BrainCircuit className="w-5 h-5 absolute top-4 right-4 text-primary opacity-20" />
                            <h4 className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                              <BrainCircuit className="w-4 h-4" /> Análise Tática de IA
                            </h4>
                            <p className="text-sm leading-relaxed">{aiText[currentQuestion!.id]}</p>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => requestAI(currentQuestion!.id)} 
                            disabled={aiExp.isPending}
                            className="bg-card hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                          >
                            {aiExp.isPending ? <Spinner size="sm" className="mr-2" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
                            Solicitar Análise Profunda de IA
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Action Bar */}
        <div className="flex justify-end pb-8">
          <Button 
            size="lg" 
            onClick={handleNext} 
            disabled={!isAnswered && mode === "training"} // Must answer in training to move on
            className="font-bold tracking-widest pl-8 pr-6 group h-14"
          >
            {currentIndex === questions.length - 1 ? "CONCLUIR MÓDULO" : "PRÓXIMO ALVO"}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </AppLayout>
  );
}
