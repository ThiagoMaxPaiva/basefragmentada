import { useState, useEffect } from "react";
import { Play, Pause, Square, Coffee, Timer, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Mode = "idle" | "focus" | "break";

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export function PomodoroWidget() {
  const [mode, setMode] = useState<Mode>("idle");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  const handleComplete = async () => {
    setIsActive(false);
    
    if (mode === "focus") {
      // Play a sound if you want, or just notify
      toast({
        title: "Alerta Máximo Concluído! 🎯",
        description: "Excelente trabalho! Registrando seu tempo no Radar de Hábitos...",
      });

      try {
        await fetch("/api/activity/pomodoro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        // Invalidate queries to refresh the radar and XP
        queryClient.invalidateQueries({ queryKey: ["/api/activity"] });
        queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
        queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      } catch (err) {
        console.error("Falha ao registrar pomodoro", err);
      }

      setMode("break");
      setTimeLeft(BREAK_TIME);
    } else if (mode === "break") {
      toast({
        title: "Descanso Concluído! 🪖",
        description: "Hora de voltar para a trincheira. Inicie um novo ciclo quando estiver pronto.",
      });
      setMode("idle");
      setTimeLeft(FOCUS_TIME);
    }
  };

  const toggleTimer = () => {
    if (mode === "idle") {
      setMode("focus");
      setTimeLeft(FOCUS_TIME);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode("idle");
    setTimeLeft(FOCUS_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = mode === "focus" 
    ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100 
    : mode === "break"
      ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100
      : 0;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-3 relative overflow-hidden group mb-4 shadow-lg mx-3">
      {/* Background Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-1000 ${mode === "focus" ? "bg-red-500" : mode === "break" ? "bg-green-500" : "bg-transparent"}`}
        style={{ width: `${progress}%` }}
      />
      
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-1.5">
          {mode === "focus" ? (
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          ) : mode === "break" ? (
            <Coffee className="w-4 h-4 text-green-500" />
          ) : (
            <Timer className="w-4 h-4 text-slate-400" />
          )}
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
            {mode === "focus" ? "Alerta Máximo" : mode === "break" ? "Descanso Tropa" : "Fronteira"}
          </span>
        </div>
        <div className="font-mono text-sm font-bold text-white tracking-wider">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-2 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleTimer}
          className={`flex-1 h-7 text-[10px] uppercase font-black tracking-wider border-slate-700 bg-slate-800/50 hover:bg-slate-700 ${isActive ? "text-yellow-400" : "text-blue-400"}`}
        >
          {isActive ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
          {isActive ? "Pausar" : mode === "idle" ? "Iniciar" : "Retomar"}
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={resetTimer}
          disabled={mode === "idle"}
          className="h-7 w-7 border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-red-400"
        >
          <Square className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
