import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { DROPDOWN_DEFAULTS } from "./dropdown.constants";

import {
  dropdownContentVariants,
  dropdownItemVariants,
} from "./dropdown.variants";

import type { DropdownProps } from "./dropdown.types";

export const VDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items,
      open,
      defaultOpen,
      onOpenChange,
      side = DROPDOWN_DEFAULTS.side,
      align = DROPDOWN_DEFAULTS.align,
      sideOffset = DROPDOWN_DEFAULTS.sideOffset,
      className,
    },
    ref,
  ) => {
    return (
      <DropdownMenuPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <DropdownMenuPrimitive.Trigger asChild>
          {trigger}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(dropdownContentVariants(), className)}
          >
            {items.map((item) => {
              if (item.type === "separator") {
                return (
                  <DropdownMenuPrimitive.Separator
                    key={item.key}
                    className="my-1 h-px bg-border"
                  />
                );
              }

              if (item.type === "label") {
                return (
                  <DropdownMenuPrimitive.Label
                    key={item.key}
                    className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {item.label}
                  </DropdownMenuPrimitive.Label>
                );
              }

              return (
                <DropdownMenuPrimitive.Item
                  key={item.key}
                  disabled={item.disabled}
                  onSelect={item.onSelect}
                  className={cn(
                    dropdownItemVariants({
                      destructive: item.destructive,
                    }),
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}

                  {item.label}
                </DropdownMenuPrimitive.Item>
              );
            })}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    );
  },
);

VDropdown.displayName = "VDropdown";