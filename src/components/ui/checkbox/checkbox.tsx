import { forwardRef, useId } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { FormField } from "../form-field";

import { checkboxVariants } from "./checkbox.variants";
import { CHECKBOX_DEFAULTS } from "./checkbox.constants";

import type { CheckboxProps } from "./checkbox.types";

export const VCheckbox = forwardRef<
  HTMLButtonElement,
  CheckboxProps
>(
  (
    {
      className,

      size = CHECKBOX_DEFAULTS.size,
      radius = CHECKBOX_DEFAULTS.radius,

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
    const checkboxId = id ?? generatedId;

    return (
      <FormField
        label={label}
        htmlFor={checkboxId}
        helperText={helperText}
        error={!!error}
        errorMessage={errorMessage}
        required={required}
        disabled={disabled}
        layout="horizontal"
      >
        <Checkbox.Root
          ref={ref}
          id={checkboxId}
          disabled={disabled}
          className={cn(
            checkboxVariants({
              size,
              radius,
              stateColor: error ? "error" : "default",
            }),
            className,
          )}
          {...props}
        >
          <Checkbox.Indicator className="flex items-center justify-center">
            <Check className="h-3.5 w-3.5" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </FormField>
    );
  },
);

VCheckbox.displayName = "VCheckbox";