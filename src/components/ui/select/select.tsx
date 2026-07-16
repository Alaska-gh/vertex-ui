import { forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { FormField } from "../form-field";

import { selectVariants } from "./select.variants";

import type { SelectProps } from "./select.types";

export const VSelect = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      placeholder = "Select option",
      onValueChange,

      className,

      variant,
      size,
      radius,
      error,
      fullWidth,

      label,
      helperText,
      errorMessage,
      required,
      disabled,
    },
    ref,
  ) => {
    return (
      <FormField
        label={label}
        helperText={helperText}
        error={!!error}
        errorMessage={errorMessage}
        required={required}
        disabled={disabled}
      >
        <Select.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <Select.Trigger
            ref={ref}
            className={cn(
              selectVariants({
                variant,
                size,
                radius,
                error,
                fullWidth,
              }),
              "group data-[placeholder]:text-muted-foreground justify-between gap-2",
              className,
            )}
          >
            <Select.Value placeholder={placeholder} />

            <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
              <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-200" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              position="popper"
              sideOffset={4}
              className={cn(
                "bg-background z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border shadow-lg",
                "data-[state=open]:animate-in",
                "data-[state=closed]:animate-out",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=top]:slide-in-from-bottom-2",
                "fade-in-0",
                "fade-out-0",
                "origin-[--radix-select-content-transform-origin]",
              )}
            >
              <Select.ScrollUpButton className="bg-background flex h-6 cursor-default items-center justify-center">
                <ChevronUp className="h-4 w-4 transition-transform duration-200" />
              </Select.ScrollUpButton>

                <Select.Viewport className="p-1">
                    {options.map((option) => (
                    <Select.Item
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className="hover:bg-muted focus:bg-muted relative flex cursor-pointer items-center rounded-sm pl-9 pr-3 py-2 text-sm outline-none select-none disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Select.ItemIndicator className="absolute left-2">
                        <Check className="h-4 w-4" />
                        </Select.ItemIndicator>

                        <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                    ))}
                </Select.Viewport>

              <Select.ScrollDownButton className="bg-background flex h-6 cursor-default items-center justify-center">
                <ChevronDown className="h-4 w-4" />
              </Select.ScrollDownButton>
              
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </FormField>
    );
  },
);

VSelect.displayName = "VSelect";
