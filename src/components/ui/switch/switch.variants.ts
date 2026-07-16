import { cva } from "class-variance-authority";

export const switchVariants = cva(
  [
    "peer",
    "inline-flex shrink-0 items-center",
    "border",
    "transition-colors",
    "outline-none",

    "focus-visible:ring-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",

    "data-[state=checked]:bg-primary",
    "data-[state=checked]:border-primary",

    "data-[state=unchecked]:bg-gray-300",
    "data-[state=unchecked]:border-border",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
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
        true: "border-danger focus-visible:ring-danger",
        false: "focus-visible:ring-primary",
      },
    },

    defaultVariants: {
      size: "md",
      radius: "full",
      error: false,
    },
  },
);

export const switchThumbVariants = cva(
  [
    "pointer-events-none",
    "block",
    "rounded-full",
    "bg-background",
    "shadow-sm",
    "transition-transform",
  ],
  {
    variants: {
      size: {
        sm: [
          "h-4 w-4",
          "data-[state=checked]:translate-x-4",
          "data-[state=unchecked]:translate-x-0",
        ],

        md: [
          "h-5 w-5",
          "data-[state=checked]:translate-x-5",
          "data-[state=unchecked]:translate-x-0",
        ],

        lg: [
          "h-6 w-6",
          "data-[state=checked]:translate-x-7",
          "data-[state=unchecked]:translate-x-0",
        ],
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);