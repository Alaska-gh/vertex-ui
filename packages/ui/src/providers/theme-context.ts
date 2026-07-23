import { createContext } from "react";
import type { Theme } from "./theme.types";


export type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};


export const ThemeContext =
  createContext<ThemeContextType | null>(null);