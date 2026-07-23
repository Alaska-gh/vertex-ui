import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "relative",
    "flex",
    "w-full",
    "items-start",
    "gap-3",
    "rounded-lg",
    "border",
    "p-4",
    "shadow-lg",
     "transition-all",
    "duration-300"
  ],
  {
    variants: {
      variant: {
        default: ["bg-background", "border-border", "text-foreground"],

        success: ["border-success", "bg-success", "text-success-foreground"],

        warning: ["border-warning", "bg-warning", "text-warning-foreground"],

        danger: ["border-danger", "bg-danger", "text-danger-foreground"],
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);
