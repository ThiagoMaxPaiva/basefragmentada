import { useState, useEffect, useCallback } from "react";
import {
  type ThemeId,
  type Theme,
  THEMES,
  applyTheme,
  getStoredTheme,
  storeTheme,
} from "@/lib/theme";

export function useTheme() {
  const [themeId, setThemeId] = useState<ThemeId>(getStoredTheme);

  const currentTheme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = useCallback((id: ThemeId) => {
    storeTheme(id);
    setThemeId(id);
  }, []);

  return { themeId, currentTheme, themes: THEMES, setTheme };
}
