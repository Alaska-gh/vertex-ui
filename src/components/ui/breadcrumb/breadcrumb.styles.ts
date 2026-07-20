import { cva } from "class-variance-authority";

export const breadcrumbListVariants = cva(
  [
    "flex",
    "flex-wrap",
    "items-center",
    "gap-1.5",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);


export const breadcrumbItemVariants = cva(
  [
    "flex",
    "items-center",
    "gap-1.5",
    "rounded-sm",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
  ],
  {
    variants: {
      type: {
        link: [
          "text-muted-foreground",
          "hover:text-foreground",
          "cursor-pointer",
        ],

        action: [
          "text-muted-foreground",
          "hover:text-foreground",
          "cursor-pointer",
        ],

        current: [
          "font-medium",
          "text-foreground",
          "cursor-default",
        ],
      },

      disabled: {
        true: [
          "pointer-events-none",
          "opacity-50",
        ],

        false: "",
      },
    },

    defaultVariants: {
      type: "link",
      disabled: false,
    },
  },
);