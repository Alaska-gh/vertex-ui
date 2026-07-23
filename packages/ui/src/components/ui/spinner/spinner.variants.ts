import { cva } from "class-variance-authority";


export const spinnerVariants = cva(
  [
    "animate-spin",
    "rounded-full",
    "border-2",
    "border-current",
    "border-t-transparent",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
      },

      color: {
        primary:
          "text-primary",

        muted:
          "text-muted-foreground",

        white:
          "text-white",
        warning:
          "text-warning",
        success:
          "text-success",
        black:
          "text-black",
      },
    },

    defaultVariants: {
      size: "md",
      color: "primary",
    },
  },
);