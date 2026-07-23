import type { ModalSize } from "./modal.types";

export const MODAL_DEFAULTS = {
  size: "md" as ModalSize,

  closeOnOverlayClick: true,

  showCloseButton: true,

  disableEscapeKey: false,

  disableAutoFocus: false,
} as const;

export const MODAL_SIZE_CLASSES = {
  sm: "max-w-sm",

  md: "max-w-md",

  lg: "max-w-lg",

  xl: "max-w-xl",

  "2xl": "max-w-2xl",

  full: "max-w-full mx-4",
} as const;