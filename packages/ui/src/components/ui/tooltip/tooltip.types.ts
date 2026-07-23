import type { ReactElement, ReactNode } from "react";

export type TooltipSide = "left" | "right" | "top" | "bottom"

export interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
  side?: TooltipSide;
}