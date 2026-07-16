import { forwardRef, useId } from "react";
import * as Switch from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

import { FormField } from "../form-field";

import { switchThumbVariants, switchVariants } from "./switch.variants";
import { SWITCH_DEFAULTS } from "./switch.constants";

import type { SwitchProps } from "./switch.types";

export const VSwitch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,

      size = SWITCH_DEFAULTS.size,
      radius = SWITCH_DEFAULTS.radius,

      error,

      label,
      helperText,
      errorMessage,
      required,
      disabled,

      id,

      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    return (
      <FormField
        label={label}
        htmlFor={switchId}
        helperText={helperText}
        error={!!error}
        errorMessage={errorMessage}
        required={required}
        disabled={disabled}
        layout="horizontal"
      >
        <Switch.Root
          ref={ref}
          id={switchId}
          disabled={disabled}
          className={cn(
            switchVariants({
              size,
              radius,
              error,
            }),
            className,
          )}
          {...props}
        >
          <Switch.Thumb
            className={switchThumbVariants({
              size,
            })}
          />
        </Switch.Root>
      </FormField>
    );
  },
);

VSwitch.displayName = "VSwitch";
