import { cva } from "class-variance-authority";

export const selectVariants = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "border",
    "bg-background",
    "text-foreground",
    "transition-colors",
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
        sm:
          "h-8 px-3 text-sm",

        md:
          "h-10 px-4 text-sm",

        lg:
          "h-12 px-5 text-base",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      error: {
        true:
          "border-danger focus-visible:ring-danger",
      },

      fullWidth: {
        true:
          "w-full",
      },
    },

    defaultVariants: {
      variant: "outline",
      size: "md",
      radius: "md",
    },
  }
);