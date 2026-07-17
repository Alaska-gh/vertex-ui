import { cva } from "class-variance-authority";


export const alertVariants = cva(
  [
    "relative",
    "w-full",
    "rounded-lg",
    "border",
    "p-4",
    "text-sm",
  ],
  {
    variants: {
      variant: {
        default:
          "border-secondary bg-secondary text-foreground",

        success:
          "border-success bg-success text-success-foreground",

        warning:
          "border-warning bg-warning text-warning-foreground",

        danger:
          "border-danger bg-danger text-danger-foreground",

        info:
          "border-info bg-info text-info-foreground",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);