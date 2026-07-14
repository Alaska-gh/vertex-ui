import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { THEME_STORAGE_KEY } from "@/constants/theme";
import { getStorageItem, setStorageItem } from "@/lib/utils";
import type { Theme } from "@/types/theme";

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = { children: ReactNode };

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = getStorageItem(THEME_STORAGE_KEY) as Theme | null;

    if (storedTheme) {setTheme(storedTheme)}

  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (currentTheme: Theme) => {
      const actualTheme = currentTheme === "system" ? mediaQuery.matches ? "dark" : "light" : currentTheme;

      document.documentElement.setAttribute( "data-theme", actualTheme );

      setResolvedTheme(actualTheme);
    };

    applyTheme(theme);

    const listener = () => applyTheme(theme);

    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    setStorageItem(THEME_STORAGE_KEY, newTheme);
  };

  const value = useMemo(() => ({
      theme,
      resolvedTheme,
      setTheme: handleSetTheme,
    }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}