import { cva } from "class-variance-authority";

export const tableVariants = cva(
  ["w-full", "caption-bottom", "text-sm", "border-collapse"],
  {
    variants: {
      variant: {
        default: "",

        bordered:
          "border border-border [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border",

        striped: "[&_tbody_tr:nth-child(odd)]:bg-muted/50",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

export const tableCellVariants = cva(["align-middle"], {
  variants: {
    size: {
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-6 py-4",
    },
  },

  defaultVariants: {
    size: "md",
  },
});
