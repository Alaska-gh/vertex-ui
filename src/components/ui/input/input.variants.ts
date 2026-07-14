import { cva } from "class-variance-authority";


export const inputVariants = cva(
  [
    "flex",
    "w-full",
    "rounded-md",
    "border",
    "bg-background",
    "text-foreground",
    "transition-colors",
    "placeholder:text-gray-400",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],

  {
    variants: {

      variant: {

        outline:
          "border-gray-200 focus-visible:ring-primary",

        filled:
          "border-transparent bg-gray-100 focus-visible:ring-primary",

        ghost:
          "border-transparent bg-transparent focus-visible:ring-primary",

      },


      size: {

        sm:
          "h-8 px-3 text-sm",

        md:
          "h-10 px-4 text-sm",

        lg:
          "h-12 px-5 text-base",

      },


      error: {

        true:
          "border-danger focus-visible:ring-danger",

      },


      fullWidth: {

        true:
          "w-full",

      },

    },


    defaultVariants: {

      variant: "outline",

      size: "md",

    },

  }
);