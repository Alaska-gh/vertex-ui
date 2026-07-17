import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  [
    "relative",
    "inline-flex",
    "shrink-0",
    "overflow-hidden",
    "border",
    "border-border",
    "bg-muted",
  ],
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },

    defaultVariants: {
      size: "md",
      radius: "full",
    },
  },
);

export const avatarImageVariants = cva([
  "h-full",
  "w-full",
  "object-cover",
]);

export const avatarFallbackVariants = cva(
  [
    "flex",
    "h-full",
    "w-full",
    "items-center",
    "justify-center",
    "bg-muted",
    "text-muted-foreground",
    "font-medium",
    "select-none",
  ],
  {
    variants: {
      size: {
        xs: "text-[10px]",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);