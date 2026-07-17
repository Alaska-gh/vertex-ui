import type { ReactNode } from "react";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface VDrawerProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  children: ReactNode;

  title?: string;

  description?: string;

  footer?: ReactNode;

  side?: DrawerSide;

  size?: DrawerSize;

  closeOnOverlayClick?: boolean;

  showCloseButton?: boolean;

  className?: string;
}
