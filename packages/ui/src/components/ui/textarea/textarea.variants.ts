import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "flex",
    "border",
    "bg-background",
    "text-foreground",
    "transition-colors",
    "placeholder:text-gray-400",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    
  ].join(" "),
  {
    variants: {
      variant: {
        outline:
          "border-gray-200 focus-visible:ring-primary",

        filled:
          "border-transparent bg-muted focus-visible:ring-primary",

        ghost:
          "border-transparent bg-transparent focus-visible:ring-primary",
      },

      size: {
        sm: "min-h-20 px-3 py-2 text-sm",
        md: "min-h-24 px-4 py-3 text-sm",
        lg: "min-h-32 px-5 py-4 text-base",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },

      error: {
        true: "border-danger focus-visible:ring-danger",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "outline",
      size: "md",
      radius: "md",
      resize: "vertical",
    },
  }
);