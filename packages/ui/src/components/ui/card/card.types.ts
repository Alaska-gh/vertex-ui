import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";

import type { cardVariants } from "./card.variants";

export interface CardProps extends VariantProps<typeof cardVariants> {
  title?: string;

  description?: string;

  icon?: ReactNode;

  /** Rendered on the right side of the header, e.g. a menu button. */
  actions?: ReactNode;

  footer?: ReactNode;

  children?: ReactNode;

  className?: string;
}
