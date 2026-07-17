import type { DrawerSide, DrawerSize } from "./drawer.types";

export const DRAWER_DEFAULTS = {
  side: "right" as DrawerSide,

  size: "md" as DrawerSize,

  closeOnOverlayClick: true,

  showCloseButton: true,
} as const;

export const DRAWER_SIZE_CLASSES = {
  sm: {
    left: "w-64",
    right: "w-64",
    top: "h-64",
    bottom: "h-64",
  },

  md: {
    left: "w-80",
    right: "w-80",
    top: "h-96",
    bottom: "h-96",
  },

  lg: {
    left: "w-[480px]",
    right: "w-[480px]",
    top: "h-[480px]",
    bottom: "h-[480px]",
  },

  full: {
    left: "w-full",
    right: "w-full",
    top: "h-full",
    bottom: "h-full",
  },
} as const;
