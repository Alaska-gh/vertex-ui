import type { VariantProps } from "class-variance-authority";

import type { paginationButtonVariants } from "./pagination.variants";

export interface PaginationProps
  extends VariantProps<typeof paginationButtonVariants> {
  /** Total number of pages. */
  pageCount: number;

  /** Controlled current page (1-indexed). Omit for uncontrolled usage. */
  page?: number;

  defaultPage?: number;

  onPageChange?: (page: number) => void;

  /** Number of page buttons shown on each side of the current page. */
  siblingCount?: number;

  /** Show buttons to jump directly to the first/last page. */
  showFirstLast?: boolean;

  className?: string;
}