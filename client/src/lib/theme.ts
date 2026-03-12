export type ThemeId = "navy" | "jungle" | "desert" | "phantom" | "arctic";

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  preview: string; // CSS gradient for preview swatch
  vars: Record<string, string>;
  cardGradient: string;
}

export const THEMES: Theme[] = [
  {
    id: "navy",
    name: "Marinha FAB",
    description: "Azul naval — tema padrão da Força Aérea",
    preview: "linear-gradient(135deg, #020d1a 0%, #0f2c6e 60%, #1a4db5 100%)",
    cardGradient: "linear-gradient(135deg, #020d1a 0%, #0f2c6e 60%, #1a4db5 100%)",
    vars: {
      "--background": "222 47% 6%",
      "--foreground": "210 40% 96%",
      "--card": "222 47% 9%",
      "--card-foreground": "210 40% 96%",
      "--card-border": "217 35% 15%",
      "--popover": "222 47% 9%",
      "--popover-foreground": "210 40% 96%",
      "--popover-border": "217 35% 15%",
      "--primary": "217 91% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "217 61% 27%",
      "--secondary-foreground": "210 40% 98%",
      "--muted": "217 35% 15%",
      "--muted-foreground": "215 20% 60%",
      "--accent": "211 100% 60%",
      "--accent-foreground": "222 47% 6%",
      "--destructive": "0 62% 55%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "217 35% 15%",
      "--input": "217 35% 15%",
      "--ring": "217 91% 60%",
      "--sidebar-background": "222 47% 5%",
      "--sidebar-foreground": "210 40% 96%",
      "--sidebar-primary": "217 91% 60%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "217 35% 12%",
      "--sidebar-accent-foreground": "210 40% 96%",
      "--sidebar-border": "217 35% 12%",
      "--sidebar-ring": "217 91% 60%",
    },
  },
  {
    id: "jungle",
    name: "Selva Operacional",
    description: "Verde tático — missões em mata fechada",
    preview: "linear-gradient(135deg, #0a1a0a 0%, #1a4d1a 60%, #2d7a2d 100%)",
    cardGradient: "linear-gradient(135deg, #0a1a0a 0%, #1a4d1a 60%, #2d7a2d 100%)",
    vars: {
      "--background": "120 35% 5%",
      "--foreground": "120 20% 95%",
      "--card": "120 30% 8%",
      "--card-foreground": "120 20% 95%",
      "--card-border": "120 25% 14%",
      "--popover": "120 30% 8%",
      "--popover-foreground": "120 20% 95%",
      "--popover-border": "120 25% 14%",
      "--primary": "142 71% 45%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "120 40% 20%",
      "--secondary-foreground": "120 20% 95%",
      "--muted": "120 25% 14%",
      "--muted-foreground": "120 15% 55%",
      "--accent": "90 60% 50%",
      "--accent-foreground": "120 35% 5%",
      "--destructive": "0 62% 55%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "120 25% 14%",
      "--input": "120 25% 14%",
      "--ring": "142 71% 45%",
      "--sidebar-background": "120 35% 4%",
      "--sidebar-foreground": "120 20% 95%",
      "--sidebar-primary": "142 71% 45%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "120 25% 11%",
      "--sidebar-accent-foreground": "120 20% 95%",
      "--sidebar-border": "120 25% 11%",
      "--sidebar-ring": "142 71% 45%",
    },
  },
  {
    id: "desert",
    name: "Deserto Árido",
    description: "Ocre e areia — operações em zona árida",
    preview: "linear-gradient(135deg, #1a1005 0%, #4d3510 60%, #8c6020 100%)",
    cardGradient: "linear-gradient(135deg, #1a1005 0%, #4d3510 60%, #8c6020 100%)",
    vars: {
      "--background": "35 40% 6%",
      "--foreground": "38 30% 92%",
      "--card": "35 35% 9%",
      "--card-foreground": "38 30% 92%",
      "--card-border": "35 30% 15%",
      "--popover": "35 35% 9%",
      "--popover-foreground": "38 30% 92%",
      "--popover-border": "35 30% 15%",
      "--primary": "38 92% 55%",
      "--primary-foreground": "35 40% 6%",
      "--secondary": "35 50% 22%",
      "--secondary-foreground": "38 30% 92%",
      "--muted": "35 30% 14%",
      "--muted-foreground": "35 20% 55%",
      "--accent": "45 100% 55%",
      "--accent-foreground": "35 40% 6%",
      "--destructive": "0 62% 55%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "35 30% 15%",
      "--input": "35 30% 15%",
      "--ring": "38 92% 55%",
      "--sidebar-background": "35 40% 5%",
      "--sidebar-foreground": "38 30% 92%",
      "--sidebar-primary": "38 92% 55%",
      "--sidebar-primary-foreground": "35 40% 6%",
      "--sidebar-accent": "35 30% 11%",
      "--sidebar-accent-foreground": "38 30% 92%",
      "--sidebar-border": "35 30% 11%",
      "--sidebar-ring": "38 92% 55%",
    },
  },
  {
    id: "phantom",
    name: "Operação Fantasma",
    description: "Cinza espectral — missões furtivas noturnas",
    preview: "linear-gradient(135deg, #080808 0%, #1a1a2e 50%, #16213e 100%)",
    cardGradient: "linear-gradient(135deg, #080808 0%, #1a1a2e 50%, #6c1fff 100%)",
    vars: {
      "--background": "270 20% 4%",
      "--foreground": "270 10% 94%",
      "--card": "270 15% 7%",
      "--card-foreground": "270 10% 94%",
      "--card-border": "270 15% 13%",
      "--popover": "270 15% 7%",
      "--popover-foreground": "270 10% 94%",
      "--popover-border": "270 15% 13%",
      "--primary": "270 80% 65%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "270 40% 22%",
      "--secondary-foreground": "270 10% 94%",
      "--muted": "270 15% 12%",
      "--muted-foreground": "270 10% 55%",
      "--accent": "290 90% 65%",
      "--accent-foreground": "270 20% 4%",
      "--destructive": "0 62% 55%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "270 15% 13%",
      "--input": "270 15% 13%",
      "--ring": "270 80% 65%",
      "--sidebar-background": "270 20% 3%",
      "--sidebar-foreground": "270 10% 94%",
      "--sidebar-primary": "270 80% 65%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "270 15% 10%",
      "--sidebar-accent-foreground": "270 10% 94%",
      "--sidebar-border": "270 15% 10%",
      "--sidebar-ring": "270 80% 65%",
    },
  },
  {
    id: "arctic",
    name: "Ártico Polar",
    description: "Branco e gelo — alto contraste para clareza máxima",
    preview: "linear-gradient(135deg, #f0f4f8 0%, #cbd5e0 60%, #a0aec0 100%)",
    cardGradient: "linear-gradient(135deg, #1a2340 0%, #2d3a5c 60%, #3d5a9a 100%)",
    vars: {
      "--background": "210 40% 97%",
      "--foreground": "210 60% 8%",
      "--card": "0 0% 100%",
      "--card-foreground": "210 60% 8%",
      "--card-border": "214 32% 88%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "210 60% 8%",
      "--popover-border": "214 32% 88%",
      "--primary": "210 100% 35%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "214 32% 88%",
      "--secondary-foreground": "210 60% 8%",
      "--muted": "214 32% 92%",
      "--muted-foreground": "215 16% 40%",
      "--accent": "211 100% 50%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 55%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "214 32% 88%",
      "--input": "214 32% 88%",
      "--ring": "210 100% 35%",
      "--sidebar-background": "210 100% 14%",
      "--sidebar-foreground": "210 40% 96%",
      "--sidebar-primary": "211 100% 65%",
      "--sidebar-primary-foreground": "0 0% 100%",
      "--sidebar-accent": "217 61% 22%",
      "--sidebar-accent-foreground": "210 40% 96%",
      "--sidebar-border": "217 61% 22%",
      "--sidebar-ring": "211 100% 65%",
    },
  },
];

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // Remove all theme classes
  THEMES.forEach(t => root.classList.remove(`theme-${t.id}`));
  root.classList.add(`theme-${theme.id}`);

  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // card-gradient is handled via a CSS variable
  root.style.setProperty("--card-gradient", theme.cardGradient);
}

export function getStoredTheme(): ThemeId {
  return (localStorage.getItem("eags-theme") as ThemeId) || "navy";
}

export function storeTheme(id: ThemeId) {
  localStorage.setItem("eags-theme", id);
}
