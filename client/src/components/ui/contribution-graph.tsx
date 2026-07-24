import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format, startOfYear, endOfYear, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ActivityLog } from "@shared/schema";

export function ContributionGraph({ logs, onDayClick }: { logs?: ActivityLog[], onDayClick?: (dateStr: string) => void }) {
  // Generate days for the entire year, padded to complete weeks
  const days = useMemo(() => {
    const today = new Date();
    const start = startOfWeek(startOfYear(today));
    const end = endOfWeek(endOfYear(today));
    return eachDayOfInterval({ start, end });
  }, []);

  const numWeeks = days.length / 7;

  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    if (!logs) return map;
    
    logs.forEach(log => {
      // date is stored as YYYY-MM-DD
      map.set(log.date, log.count);
    });
    return map;
  }, [logs]);

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-slate-800/50 border border-slate-700/30"; // Empty
    if (count <= 2) return "bg-primary/40 border border-primary/30"; // Low
    if (count <= 5) return "bg-primary/70 border border-primary/50"; // Medium
    if (count <= 10) return "bg-primary border border-primary/80"; // High
    return "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary-foreground/30"; // Ultra (glow)
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full overflow-x-auto pb-4 pt-2 px-1 scroll-smooth">
        <div className="inline-flex gap-1.5 min-w-max">
          {/* Render columns of 7 days */}
          {Array.from({ length: numWeeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = days[weekIndex * 7 + dayIndex];
                const dateStr = format(day, "yyyy-MM-dd");
                const count = activityMap.get(dateStr) || 0;
                const dateLabel = format(day, "dd 'de' MMMM", { locale: ptBR });

                return (
                  <Tooltip key={dateStr}>
                    <TooltipTrigger asChild>
                      <div 
                        onClick={() => onDayClick?.(dateStr)}
                        className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-all duration-300 hover:scale-125 hover:z-10 cursor-crosshair ${getColorClass(count)}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-popover text-popover-foreground border-border font-black text-xs uppercase tracking-widest z-[100]">
                      <p>{count === 0 ? "Sem Missões" : `${count} Missões`} em {dateLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-2 flex justify-between items-center w-full">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Freq. Anual ({days[0].getFullYear()})
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <span className="mr-1">Menos</span>
          <div className="w-3 h-3 rounded-[2px] bg-slate-800/50 border border-slate-700/30" />
          <div className="w-3 h-3 rounded-[2px] bg-primary/40 border border-primary/30" />
          <div className="w-3 h-3 rounded-[2px] bg-primary/70 border border-primary/50" />
          <div className="w-3 h-3 rounded-[2px] bg-primary border border-primary/80" />
          <div className="w-3 h-3 rounded-[2px] bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary-foreground/30" />
          <span className="ml-1">Mais</span>
        </div>
      </div>
    </div>
  );
}
