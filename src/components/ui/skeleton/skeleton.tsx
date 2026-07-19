import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import {
  SKELETON_DEFAULT_DIMENSIONS,
  SKELETON_DEFAULTS,
} from "./skeleton.constants";

import { skeletonVariants } from "./skeleton.variants";

import type { SkeletonProps } from "./skeleton.types";

export const VSkeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    {
      variant = SKELETON_DEFAULTS.variant,
      width,
      height,
      label = SKELETON_DEFAULTS.label,
      className,
    },
    ref,
  ) => {
    const dimensions =
      SKELETON_DEFAULT_DIMENSIONS[variant ?? SKELETON_DEFAULTS.variant];

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(
          skeletonVariants({
            variant,
          }),
          className,
        )}
        style={{
          width: width ?? dimensions.width,
          height: height ?? dimensions.height,
        }}
      />
    );
  },
);

VSkeleton.displayName = "VSkeleton";