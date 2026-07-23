import type { ReactNode } from "react";

export type ToastVariant = "default" | "success" | "warning" | "danger";

export interface ToastData {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
}

export interface ToastProps extends ToastData {
  onClose?: () => void;
}

export interface ToastContextValue {
  toast: (toast: Omit<ToastData, "id">) => void;

  removeToast: (id: string) => void;

  clearToasts: () => void;
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
