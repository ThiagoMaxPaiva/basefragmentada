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
    { title: "Command Center", url: "/dashboard", icon: Home },
    { title: "Start Training", url: "/setup", icon: Crosshair },
  ];

  const subNav = [
    { title: "Service Record", url: "/history", icon: History },
    { title: "Manuals", url: "#", icon: BookOpen },
  ];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center gap-3 w-full px-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg shadow-md border border-primary/20">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex flex-col flex-1 truncate data-[state=collapsed]:hidden">
            <span className="font-display font-bold text-lg leading-tight truncate">AERO TACTICS</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Training System</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarSeparator />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display tracking-widest text-xs">Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    onClick={() => setLocation(item.url)}
                    className="cursor-pointer"
                  >
                    <span>
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-display tracking-widest text-xs">Archives</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    onClick={() => item.url !== "#" && setLocation(item.url)}
                    className="cursor-pointer"
                  >
                    <span>
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user && (
          <div className="flex flex-col gap-2 mb-4 px-2 data-[state=collapsed]:hidden">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Identified As</div>
            <div className="flex flex-col bg-card/50 p-3 rounded-md border border-border">
              <span className="font-display text-sm text-primary font-bold">{user.patent}</span>
              <span className="text-sm font-medium truncate">{user.name}</span>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => logout()} className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="font-bold">DISCONNECT</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
