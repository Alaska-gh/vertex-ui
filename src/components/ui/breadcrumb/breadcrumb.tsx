import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { BREADCRUMB_DEFAULTS } from "./breadcrumb.constants";

import type { BreadcrumbProps } from "./breadcrumb.types";

export const VBreadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className }, ref) => {
    const defaultSeparator = (
      <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
    );

    return (
      <nav
        ref={ref}
        aria-label={BREADCRUMB_DEFAULTS.ariaLabel}
        className={cn("flex", className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.key} className="flex items-center gap-1.5">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="flex items-center gap-1.5 font-medium text-foreground"
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}

                    {item.label}
                  </span>
                ) : item.href ? (
                 <a
                    href={item.href}
                    onClick={item.onClick}
                    className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}

                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}

                    {item.label}
                  </button>
                )}

                {!isLast && (
                  <span className="flex items-center" aria-hidden>
                    {separator ?? defaultSeparator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

VBreadcrumb.displayName = "VBreadcrumb";