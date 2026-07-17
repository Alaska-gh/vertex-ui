import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import type { TooltipProps } from "./tooltip.types";

export const VTooltip = forwardRef<
  HTMLDivElement,
  TooltipProps
>(
  (
    {
      children,
      content,
      side = "top",
    },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Root
        delayDuration={300}
      >
        <TooltipPrimitive.Trigger
          asChild
        >
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            side={side}
            sideOffset={6}
            className={cn(
              "z-50",
              "rounded-md",
              "bg-foreground",
              "text-background",
              "px-3",
              "py-1.5",
              "text-sm",
              "shadow-lg",
              "animate-in",
              "fade-in-0",
              "zoom-in-95",
            )}
          >
            {content}

            <TooltipPrimitive.Arrow
              className="fill-foreground"
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    );
  },
);

VTooltip.displayName = "VTooltip";