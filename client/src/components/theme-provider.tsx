import { createContext, useContext, useEffect, useState } from "react";
import {
  type ThemeId,
  type Theme,
  THEMES,
  applyTheme,
  getStoredTheme,
  storeTheme,
} from "@/lib/theme";

interface ThemeContextValue {
  themeId: ThemeId;
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(getStoredTheme);
  const currentTheme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  function setTheme(id: ThemeId) {
    storeTheme(id);
    setThemeId(id);
  }

  return (
    <ThemeContext.Provider value={{ themeId, currentTheme, themes: THEMES, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used inside ThemeProvider");
  return ctx;
}
