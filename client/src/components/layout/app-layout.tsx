import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useUser } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Spinner } from "@/components/ui/spinner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const style = {
    "--sidebar-width": "17rem",
    "--sidebar-width-icon": "4.5rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="h-14 flex items-center justify-between px-5 border-b border-border bg-card/80 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
              <div className="h-4 w-[1px] bg-border hidden sm:block" />
              <span className="text-[11px] font-black tracking-widest uppercase text-muted-foreground hidden sm:block italic">
                PROTOCOLO DE PRONTIDÃO MILITAR
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-green-500 uppercase">SISTEMA ONLINE</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
