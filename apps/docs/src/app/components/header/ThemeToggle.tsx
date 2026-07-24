"use client";

import { Moon } from "lucide-react";
import { Button } from "@vertex-ui/react";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
    >
      <Moon size={18} />
    </Button>
  );
}