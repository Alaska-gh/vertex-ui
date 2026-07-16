import { cva } from "class-variance-authority";

export const radioItemVariants = cva(
  [
    "peer",
    "shrink-0",
    "inline-flex",
    "items-center",
    "justify-center",

    "border",
    "transition-colors",
    "outline-none",

    "focus-visible:ring-2",
    "focus-visible:ring-primary",

    "disabled:cursor-not-allowed",
    "disabled:opacity-50",

    "data-[state=checked]:border-primary",
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
        full: "rounded-full",
      },

      sateColor:{
        default: "data-[state=checked]:border-primary data-[state=unchecked]:border-border",
        error: "data-[state=checked]:border-primary data-[state=unchecked]:border-border",
      }
      
    },

    defaultVariants: {
      size: "md",
      radius: "full",
      sateColor: "default",
    },
  },
);


export const radioGroupVariants = cva(
  [
    "flex",
    "gap-3",
  ],
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
    },

    defaultVariants: {
      orientation: "vertical",
    },
  },
);