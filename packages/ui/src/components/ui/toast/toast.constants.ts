import type { ToastVariant } from "./toast.types";

export const TOAST_DEFAULTS = {
  duration: 5000,
  dismissible: true,
  variant: "default" as ToastVariant,
  maxVisible: 5,
  position: "top-right"
} as const;


export const TOAST_POSITION_CLASSES = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",

  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
} as const;