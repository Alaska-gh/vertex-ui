import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { POPOVER_DEFAULTS } from "./popover.constants";

import type { PopoverProps } from "./popover.types";

export const VPopover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      open,
      onOpenChange,
      defaultOpen,
      side = POPOVER_DEFAULTS.side,
      align = POPOVER_DEFAULTS.align,
      sideOffset = POPOVER_DEFAULTS.sideOffset,
      showArrow = POPOVER_DEFAULTS.showArrow,
      className,
    },
    ref,
  ) => {
    return (
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "z-50",
              "w-72",
              "rounded-lg",
              "border",
              "border-border",
              "bg-background",
              "p-4",
              "text-foreground",
              "shadow-lg",
              "outline-none",
              "animate-in",
              "fade-in-0",
              "zoom-in-95",
              className,
            )}
          >
            {children}

            {showArrow && (
              <PopoverPrimitive.Arrow className="fill-background" />
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

VPopover.displayName = "VPopover";
