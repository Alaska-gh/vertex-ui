import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { badgeVariants } from "./badge.variants";
import { BADGE_DEFAULTS } from "./badge.constants";

import type { BadgeProps } from "./badge.types";

export const VBadge = forwardRef<
  HTMLSpanElement,
  BadgeProps
>(
  (
    {
      className,

      variant = BADGE_DEFAULTS.variant,
      size = BADGE_DEFAULTS.size,
      radius = BADGE_DEFAULTS.radius,

      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size,
            radius,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

VBadge.displayName = "VBadge";