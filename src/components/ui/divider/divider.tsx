import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { DIVIDER_DEFAULTS } from "./divider.constants";

import { dividerVariants } from "./divider.variants";

import type { DividerProps } from "./divider.types";

export const VDivider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = DIVIDER_DEFAULTS.orientation,
      label,
      decorative = DIVIDER_DEFAULTS.decorative,
      className,
    },
    ref,
  ) => {
    if (label && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          role={decorative ? undefined : "separator"}
          aria-orientation={decorative ? undefined : "horizontal"}
          className={cn("flex items-center gap-3", className)}
        >
          <SeparatorPrimitive.Root
            orientation="horizontal"
            decorative
            className={cn(
              dividerVariants({ orientation: "horizontal" }),
              "flex-1",
            )}
          />

          <span className="text-muted-foreground text-xs">{label}</span>

          <SeparatorPrimitive.Root
            orientation="horizontal"
            decorative
            className={cn(
              dividerVariants({ orientation: "horizontal" }),
              "flex-1",
            )}
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        orientation={orientation ?? DIVIDER_DEFAULTS.orientation}
        decorative={decorative}
        aria-orientation="horizontal"
        className={cn(
          dividerVariants({
            orientation,
          }),
          className,
        )}
      />
    );
  },
);

VDivider.displayName = "VDivider";
