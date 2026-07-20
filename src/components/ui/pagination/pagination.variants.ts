import { cva } from "class-variance-authority";

export const paginationButtonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-md",
    "border",
    "border-border",
    "font-medium",
    "transition-colors",
    "hover:bg-muted",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "data-[active=true]:border-primary",
    "data-[active=true]:bg-primary",
    "data-[active=true]:text-primary-foreground",
    "data-[active=true]:hover:bg-primary",
  ],
  {
    variants: {
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);