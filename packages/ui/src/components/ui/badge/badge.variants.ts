import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "whitespace-nowrap",
    "transition-colors",
    "border",
    "select-none",
    "p-4"
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary",

        secondary:
          "bg-secondary text-secondary-foreground border-secondary",

        outline:
          "bg-background text-foreground border-border",

        success:
          "bg-success text-success-foreground border-success",

        warning:
          "bg-warning text-warning-foreground border-warning",

        danger:
          "bg-danger text-danger-foreground border-danger",

        info:
          "bg-info text-info-foreground border-info",
      },

      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-2.5 text-sm",
        lg: "h-7 px-3 text-sm",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "full",
    },
  },
);