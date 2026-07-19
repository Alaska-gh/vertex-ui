import { cva } from "class-variance-authority";

export const cardVariants = cva(["rounded-xl", "text-foreground"], {
  variants: {
    variant: {
      default: "border border-border bg-background",

      outlined: "border-2 border-border bg-transparent",

      elevated: "border border-border bg-background shadow-lg",

      filled: "border border-transparent bg-muted",
    },

    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },

  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});
