import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";

import type { dividerVariants } from "./divider.variants";

export interface DividerProps
  extends VariantProps<typeof dividerVariants> {
  /** Content shown in the middle of a horizontal divider, e.g. "OR". */
  label?: ReactNode;

  /**
   * Marks the divider as purely visual, hiding it from the accessibility
   * tree. Set to false when it separates meaningful sections of content.
   */
  decorative?: boolean;

  className?: string;
}