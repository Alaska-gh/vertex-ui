import { cva } from "class-variance-authority";

export const tabsListVariants = cva(["inline-flex", "items-center"], {
  variants: {
    variant: {
      underline: "gap-6 border-b border-border",
      pills: "gap-1 rounded-lg bg-muted p-1",
    },

    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-stretch",
    },
  },

  defaultVariants: {
    variant: "underline",
    orientation: "horizontal",
  },
});

export const tabsTriggerVariants = cva(
  [
    "inline-flex",
    "items-center",
    "gap-2",
    "whitespace-nowrap",
    "text-sm",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        underline:
          "border-b-2 border-transparent px-1 py-2 text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",

        pills:
          "rounded-md px-3 py-1.5 text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      },
    },

    defaultVariants: {
      variant: "underline",
    },
  },
);