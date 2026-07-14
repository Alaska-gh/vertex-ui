import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "rounded-md",
    "font-medium",
    "transition-all",
    "duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary",
    "focus-visible:ring-offset-2",
    "ring-offset-background",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "ease-out",
    "select-none",
    "cursor-pointer",
    "active:scale-[0.98]",
    "active:shadow-inner",
  ].join(" "),

  {
    variants: {
      variant: {
        primary: `bg-button-primary text-white hover:bg-button-primary-hover 
         hover:shadow-sm`,

        secondary: `bg-button-secondary text-foreground hover:bg-button-secondary-hover 
         hover:shadow-sm`,

        outline: `border border:button-outline-border bg-transparent text-foreground
        hover:border-button-primary hover:bg-button-primary hover:text-white hover:shadow-sm`,

        ghost: ` bg-transparent text-foreground hover:bg-button-ghost-hover`,

        destructive: ` bg-button-danger text-white hover:bg-button-danger-hover
           hover:shadow-sm`,

        link: ` text-button-link underline-offset-4 hover:underline active:opacity-80`,
      },

      size: {
        sm: "h-8 px-3 text-sm",

        md: "h-10 px-4 text-sm",

        lg: "h-12 px-6 text-base",

        icon: "h-10 w-10",
      },
    },

    compoundVariants: [
      {
        variant: "link",
        className: [
          "h-auto",
          "p-0",
          "rounded-none",
          "shadow-none",
          "hover:no-underline",
        ].join(" "),
      },

      {
        size: "icon",
        className: ["aspect-square", "p-0"].join(" "),
      },

      {
        variant: "ghost",
        size: "icon",
        className: ["rounded-full"].join(" "),
      },

      {
        variant: "outline",
        size: "icon",
        className: ["rounded-full"].join(" "),
      },
    ],

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
