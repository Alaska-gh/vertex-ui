import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { CARD_DEFAULTS } from "./card.constants";

import { cardVariants } from "./card.variants";

import type { CardProps } from "./card.types";

export const VCard = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      icon,
      actions,
      footer,
      children,
      variant = CARD_DEFAULTS.variant,
      padding = CARD_DEFAULTS.padding,
      className,
    },
    ref,
  ) => {
    const hasHeader = Boolean(title || description || icon || actions);

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            padding,
          }),
          className,
        )}
      >
        {hasHeader && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex gap-3">
              {icon && <div className="shrink-0">{icon}</div>}

              <div>
                {title && (
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                )}

                {description && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        )}

        {children && <div>{children}</div>}

        {footer && (
          <div className="border-border mt-4 flex items-center gap-3 border-t pt-4">
            {footer}
          </div>
        )}
      </div>
    );
  },
);

VCard.displayName = "VCard";
