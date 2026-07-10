import { cva } from "class-variance-authority";


export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-md",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary-500",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ],

  {
    variants: {

      variant: {

        primary:
         "bg-button-primary text-white hover:bg-primary-hover",

        secondary:
           `bg-button-secondary text-foreground hover:bg-button-secondary-hover`,

        outline:
            ` border border-button-outline-border bg-transparent 
            text-foreground hover:bg-button-outline-hover `,

        ghost:
           ` bg-transparent text-foreground hover:bg-button-ghost-hover`,

        destructive:
            ` bg-button-danger text-white hover:bg-button-danger-hover `,

        link:
            ` text-button-link underline-offset-4 hover:underline `,

      },


      size: {

        sm:
          "h-8 px-3 text-sm",

        md:
          "h-10 px-4 text-sm",

        lg:
          "h-12 px-6 text-base",

        icon:
          "h-10 w-10",

      },

    },


    defaultVariants: {

      variant: "primary",

      size: "md",

    },

  }
);