import type { VariantProps } from "class-variance-authority";

import type { skeletonVariants } from "./skeleton.variants";

export interface SkeletonProps
  extends VariantProps<typeof skeletonVariants> {
  /** CSS width, e.g. 200 or "100%". Falls back to a per-variant default. */
  width?: number | string;

  /** CSS height, e.g. 20 or "1rem". Falls back to a per-variant default. */
  height?: number | string;

  /**
   * Accessible label
   */
  label?: string;

  /**
   * Additional classes
   */
  className?: string;
}