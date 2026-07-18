import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface VModalProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  title?: string;

  description?: string;

  children: ReactNode;

  footer?: ReactNode;

  size?: ModalSize;

  closeOnOverlayClick?: boolean;

  showCloseButton?: boolean;

  className?: string;
}
