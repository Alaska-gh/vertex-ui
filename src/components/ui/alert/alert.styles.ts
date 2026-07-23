import { cva } from "class-variance-authority";

export const alertDismissVariants = cva(
  [
    "rounded-sm",
    "opacity-70",
    "transition-opacity",
    "hover:opacity-100",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
  ],
);