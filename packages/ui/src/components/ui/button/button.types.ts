import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button.variants";

export interface ButtonOwnProps
  extends VariantProps<typeof buttonVariants> {
  /**
   * Render using Radix Slot.
   */
  asChild?: boolean;

  /**
   * Shows a loading spinner.
   */
  loading?: boolean;

  /**
   * Text shown while loading.
   */
  loadingText?: string;

  /**
   * Expands to full width.
   */
  fullWidth?: boolean;

  /**
   * Icon before text.
   */
  leftIcon?: ReactNode;

  /**
   * Icon after text.
   */
  rightIcon?: ReactNode;
}

export type ButtonProps =
  ButtonOwnProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonOwnProps
  >;