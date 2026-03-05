import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useUser } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Spinner } from "@/components/ui/spinner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-background"><Spinner size="xl" /></div>;
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4.5rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full bg-grid-pattern bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden backdrop-blur-[2px]">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
              <div className="h-4 w-[1px] bg-border hidden sm:block"></div>
              <h2 className="text-lg font-display font-semibold hidden sm:block text-muted-foreground">PROTOCOLO DE PRONTIDÃO MILITAR</h2>
            </div>
            <div className="flex items-center gap-4">
              {/* Optional: Add theme toggle or notification icon here */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-green-600 dark:text-green-400">SISTEMA ONLINE</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
