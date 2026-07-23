import type { VariantProps } from "class-variance-authority";

import type { spinnerVariants } from "./spinner.variants";


export interface SpinnerProps
  extends VariantProps<
    typeof spinnerVariants
  > {
  /**
   * Accessible label
   */
  label?: string;

  /**
   * Additional classes
   */
  className?: string;
}