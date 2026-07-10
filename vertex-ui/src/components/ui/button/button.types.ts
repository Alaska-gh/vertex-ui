import type { ButtonHTMLAttributes } from "react";

import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "./button.variants";


export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {

  /**
   * Render button styles on another element
   */
  asChild?: boolean;

  /**
   * Show loading state
   */
  loading?: boolean;

}