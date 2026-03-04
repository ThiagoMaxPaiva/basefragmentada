import { useUser } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { useExamHistory } from "@/hooks/use-exams";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Target, ShieldCheck, Crosshair, Award, Clock, History } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Link } from "wouter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: user } = useUser();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: history, isLoading: historyLoading } = useExamHistory();

  const chartData = progress && progress.totalQuestions > 0 ? [
    { name: 'Correct', value: progress.correctAnswers, color: 'hsl(var(--primary))' },
    { name: 'Incorrect', value: progress.wrongAnswers, color: 'hsl(var(--destructive))' }
  ] : [];

  const accuracy = progress && progress.totalQuestions > 0 
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100) 
    : 0;

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-display font-bold text-foreground">COMMAND CENTER</h1>
            </div>
            <p className="text-muted-foreground font-medium max-w-xl">
              Welcome to your tactical overview, <span className="text-foreground font-bold">{user?.patent} {user?.name}</span>. Monitor your readiness and engage in specialized knowledge training.
            </p>
          </div>
          <Link href="/setup">
            <Button size="lg" className="font-bold tracking-wider shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
              <Crosshair className="w-5 h-5 mr-2" />
              INITIATE TRAINING
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Stats / Chart */}
          <Card className="lg:col-span-1 border-border shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-accent" />
                OPERATIONAL READINESS
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressLoading ? (
                <div className="space-y-4 py-6">
                  <Skeleton className="h-48 w-full rounded-full" />
                  <div className="flex justify-between"><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" /></div>
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
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                          itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                      <span className="text-3xl font-display font-bold">{accuracy}%</span>
                      <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Accuracy</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mt-4">
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 flex flex-col items-center">
                      <span className="text-2xl font-bold text-primary">{progress?.correctAnswers}</span>
                      <span className="text-xs uppercase text-muted-foreground font-semibold">Hits</span>
                    </div>
                    <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/10 flex flex-col items-center">
                      <span className="text-2xl font-bold text-destructive">{progress?.wrongAnswers}</span>
                      <span className="text-xs uppercase text-muted-foreground font-semibold">Misses</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center px-4">
                  <Target className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">Insufficient data. Complete training modules to generate tactical analytics.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* History List */}
          <Card className="lg:col-span-2 border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="w-5 h-5 text-muted-foreground" />
                  RECENT DEPLOYMENTS
                </CardTitle>
                <CardDescription className="text-xs mt-1 uppercase tracking-wider font-semibold">Your latest exam results</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {historyLoading ? (
                <div className="p-6 space-y-4">
                  {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : history && history.length > 0 ? (
                <div className="divide-y divide-border/50 max-h-[350px] overflow-y-auto">
                  {history.slice(0, 5).map((exam) => (
                    <div key={exam.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl border ${exam.mode === 'mock_exam' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-secondary/10 border-secondary/20 text-secondary'}`}>
                          {exam.mode === 'mock_exam' ? <Award className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground capitalize tracking-wide">
                            {exam.mode.replace('_', ' ')}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {exam.completedAt ? format(new Date(exam.completedAt), "MMM dd, yyyy - HH:mm") : 'Unknown'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-display font-bold">
                          {exam.score} <span className="text-sm text-muted-foreground">/ {exam.totalQuestions}</span>
                        </div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="bg-muted p-4 rounded-full mb-4">
                    <History className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-lg">No Service Record Found</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">You haven't completed any training modules yet. Deploy now to start building your record.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
