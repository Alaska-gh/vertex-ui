import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  [
    "peer shrink-0",
    "inline-flex items-center justify-center",
    "border",
    "transition-colors",
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",

    // Checked state
    "data-[state=checked]:bg-primary",
    "data-[state=checked]:border-primary",
    "data-[state=checked]:text-primary-foreground",

    // Unchecked state
    "data-[state=unchecked]:bg-background",
    "data-[state=unchecked]:border-border",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      stateColor: {
        default:
          "data-[state=checked]:border-primary data-[state=unchecked]:border-border",

        error:
          "data-[state=checked]:border-danger data-[state=unchecked]:border-danger",
      },
    },

    defaultVariants: {
      size: "md",
      radius: "md",
      stateColor: "default",
    },
  },
);
