import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";

import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import ExamSetup from "@/pages/exam-setup";
import ExamSession from "@/pages/exam-session";
import Settings from "@/pages/settings";
import Flashcards from "@/pages/flashcards";
import Arsenal from "@/pages/arsenal";
import WrongAnswers from "@/pages/wrong-answers";
import History from "@/pages/history";
import Intelligence from "@/pages/intelligence";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/setup" component={ExamSetup} />
      <Route path="/exam" component={ExamSession} />
      <Route path="/arsenal" component={Arsenal} />
      <Route path="/settings" component={Settings} />
      <Route path="/wrong-answers" component={WrongAnswers} />
      <Route path="/flashcards" component={Flashcards} />
      <Route path="/history" component={History} />
      <Route path="/intelligence" component={Intelligence} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
