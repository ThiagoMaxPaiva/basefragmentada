import { BookOpen, Crosshair, History, Home, LogOut, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";
import { useLogout, useUser } from "@/hooks/use-auth";

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { mutate: logout } = useLogout();
  const { data: user } = useUser();

  const mainNav = [
    { title: "Centro de Comando", url: "/dashboard", icon: Home },
    { title: "Iniciar Treinamento", url: "/setup", icon: Crosshair },
  ];

  const subNav = [
    { title: "Registro de Serviço", url: "/history", icon: History },
    { title: "Manuais", url: "#", icon: BookOpen },
  ];

  const patentLabel =
    user?.patent === "Civilian" ? "Civil" :
    user?.patent === "Recruit" ? "Recruta" :
    user?.patent === "Student" ? "Aluno" :
    user?.patent === "Third Sergeant" ? "Terceiro-Sargento" :
    user?.patent ?? "";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="py-5 px-3">
        <div className="flex items-center gap-3 w-full">
          <div className="bg-blue-600 text-white p-2 rounded-lg shadow-lg border border-blue-500/30 flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col flex-1 truncate">
            <span className="font-black text-base italic leading-tight tracking-tight truncate uppercase">
              EAGS <span className="text-blue-400">SIN</span>
            </span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Base Fragmentada</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] font-black tracking-widest uppercase text-muted-foreground/60">Operações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    onClick={() => setLocation(item.url)}
                    className="cursor-pointer font-bold tracking-wide"
                  >
                    <span>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] font-black tracking-widest uppercase text-muted-foreground/60">Arquivos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    onClick={() => item.url !== "#" && setLocation(item.url)}
                    className="cursor-pointer font-bold tracking-wide"
                  >
                    <span>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {user && (
          <div className="flex flex-col gap-1 mb-3 px-1">
            <div className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">Identificado Como</div>
            <div className="flex flex-col bg-muted/30 px-3 py-2 rounded-lg border border-border">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wide">{patentLabel}</span>
              <span className="text-sm font-semibold truncate text-foreground">{user.name}</span>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors font-black uppercase tracking-widest text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>DESCONECTAR</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
