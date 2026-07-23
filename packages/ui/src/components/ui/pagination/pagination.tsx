import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

import { PAGINATION_DEFAULTS } from "./pagination.constants";

import { paginationButtonVariants } from "./pagination.variants";

import type { PaginationProps } from "./pagination.types";

const ELLIPSIS = "ellipsis" as const;

function getPageItems(
  current: number,
  pageCount: number,
  siblingCount: number,
): Array<number | typeof ELLIPSIS> {
  const totalNumbers = siblingCount * 2 + 5;

  if (pageCount <= totalNumbers) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, pageCount);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = Array.from(
      { length: leftItemCount },
      (_, index) => index + 1,
    );

    return [...leftRange, ELLIPSIS, pageCount];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, index) => pageCount - rightItemCount + 1 + index,
    );

    return [1, ELLIPSIS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index,
  );

  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, pageCount];
}

export const VPagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      pageCount,
      page,
      defaultPage = PAGINATION_DEFAULTS.defaultPage,
      onPageChange,
      siblingCount = PAGINATION_DEFAULTS.siblingCount,
      showFirstLast = PAGINATION_DEFAULTS.showFirstLast,
      size = PAGINATION_DEFAULTS.size,
      className,
    },
    ref,
  ) => {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const currentPage = Math.min(
      Math.max(page ?? internalPage, 1),
      Math.max(pageCount, 1),
    );

    if (pageCount <= 1) {
      return null;
    }

    const goToPage = (next: number) => {
      const clamped = Math.min(Math.max(next, 1), pageCount);

      setInternalPage(clamped);
      onPageChange?.(clamped);
    };

    const items = getPageItems(currentPage, pageCount, siblingCount);

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex items-center gap-1", className)}
      >
        {showFirstLast && (
          <button
            type="button"
            aria-label="First page"
            disabled={currentPage <= 1}
            onClick={() => goToPage(1)}
            className={cn(paginationButtonVariants({ size }))}
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className={cn(paginationButtonVariants({ size }))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {items.map((item, index) =>
          item === ELLIPSIS ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              data-active={item === currentPage}
              onClick={() => goToPage(item)}
              className={cn(paginationButtonVariants({ size }))}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage >= pageCount}
          onClick={() => goToPage(currentPage + 1)}
          className={cn(paginationButtonVariants({ size }))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {showFirstLast && (
          <button
            type="button"
            aria-label="Last page"
            disabled={currentPage >= pageCount}
            onClick={() => goToPage(pageCount)}
            className={cn(paginationButtonVariants({ size }))}
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        )}
      </nav>
    );
  },
);

VPagination.displayName = "VPagination";