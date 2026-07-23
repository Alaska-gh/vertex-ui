import * as tabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { TABS_DEFAULTS } from "./tabs.constants";
import type { TabProps } from "./tabs.types";
import { tabsListVariants, tabsTriggerVariants } from "./tabs.variants";

export const VTabs = forwardRef<HTMLDivElement, TabProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      variant = TABS_DEFAULTS.variant,
      orientation = TABS_DEFAULTS.orientation,
      className,
    },
    ref,
  ) => {
    const initialValue = defaultValue ?? (items.length > 0 ? items[0].value : undefined);
    return (
      <tabsPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={initialValue}
        onValueChange={onValueChange}
        orientation={orientation ?? undefined}
        className={cn(
          orientation === "vertical" ? "flex gap-6" : "flex flex-col gap-4",
          className,
        )}
      >
        <tabsPrimitive.List
          className={cn(
            tabsListVariants({
              variant,
              orientation,
            }),
          )}
        >
          {items.map((item) => (
            <tabsPrimitive.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={cn(tabsTriggerVariants({ variant }))}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}

              {item.label}
            </tabsPrimitive.Trigger>
          ))}
        </tabsPrimitive.List>

        {items.map((item) => (
          <tabsPrimitive.Content
            key={item.value}
            value={item.value}
            className="flex-1 focus-visible:outline-none"
          >
            {item.content}
          </tabsPrimitive.Content>
        ))}
      </tabsPrimitive.Root>
    );
  },
);

VTabs.displayName = "VTabs";
