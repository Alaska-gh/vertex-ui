import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { PROGRESS_DEFAULTS } from "./progress.constants";
import {
  progressVariants,
  progressIndicatorVariants,
} from "./progress.variants";

import type { ProgressProps } from "./progress.types";

export const VProgress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,

      max = PROGRESS_DEFAULTS.max,

      size = PROGRESS_DEFAULTS.size,

      variant = PROGRESS_DEFAULTS.variant,

      striped = PROGRESS_DEFAULTS.striped,

      animated = PROGRESS_DEFAULTS.animated,

      label,

      showValue = PROGRESS_DEFAULTS.showValue,

      className,

      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full space-y-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm">
            {label && <span className="text-foreground">{label}</span>}

            {showValue && (
              <span className="text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        <ProgressPrimitive.Root
          ref={ref}
          value={value}
          max={max}
          className={cn(
            progressVariants({
              size,
            }),
            className,
          )}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-testid="progress-indicator"
            className={cn(
              progressIndicatorVariants({
                variant,
                striped,
                animated,
              }),
            )}
            style={{
              width: `${percentage}%`,
            }}
          />
        </ProgressPrimitive.Root>
      </div>
    );
  },
);

VProgress.displayName = "VProgress";
