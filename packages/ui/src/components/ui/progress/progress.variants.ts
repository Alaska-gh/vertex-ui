import { cva } from "class-variance-authority";

export const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const progressIndicatorVariants = cva(
  "h-full transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
      },

      striped: {
        true:
          "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]",
        false: "",
      },

      animated: {
        true: "animate-pulse",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      striped: false,
      animated: false,
    },
  },
);