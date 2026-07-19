import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  [
    "inline-block",
    "bg-muted",
    "bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent)]",
    "bg-[length:200%_100%]",
    "animate-shimmer",
    "motion-reduce:animate-none",
  ],
  {
    variants: {
      variant: {
        rectangular: "rounded-md",
        circular: "rounded-full",
        text: "rounded",
      },
    },

    defaultVariants: {
      variant: "rectangular",
    },
  },
);