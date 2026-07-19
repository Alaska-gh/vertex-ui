import { cva } from "class-variance-authority";

export const dropdownContentVariants = cva([
  "z-50",
  "min-w-[10rem]",
  "rounded-lg",
  "border",
  "border-border",
  "bg-background",
  "p-1",
  "text-foreground",
  "shadow-lg",
  "outline-none",
  "animate-in",
  "fade-in-0",
  "zoom-in-95",
]);

export const dropdownItemVariants = cva(
  [
    "flex",
    "cursor-pointer",
    "items-center",
    "gap-2",
    "rounded-md",
    "px-2",
    "py-1.5",
    "text-sm",
    "outline-none",
    "transition-colors",
    "data-[highlighted]:bg-muted",
    "data-[disabled]:pointer-events-none",
    "data-[disabled]:opacity-50",
  ],
  {
    variants: {
      destructive: {
        true: "text-danger data-[highlighted]:bg-danger/10",
        false: "text-foreground",
      },
    },

    defaultVariants: {
      destructive: false,
    },
  },
);