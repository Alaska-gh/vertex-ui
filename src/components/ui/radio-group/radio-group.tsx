import { forwardRef, useId } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

import { FormField } from "../form-field";

import { radioGroupVariants, radioItemVariants } from "./radio-group.variants";
import { RADIO_GROUP_DEFAULTS } from "./radio-group.constants";

import type { RadioGroupProps } from "./radio-group.types";

export const VRadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,

      value,
      defaultValue,

      onValueChange,

      orientation = RADIO_GROUP_DEFAULTS.orientation,
      size = RADIO_GROUP_DEFAULTS.size,
      radius = RADIO_GROUP_DEFAULTS.radius,

      className,

      label,
      helperText,
      error,
      errorMessage,
      required,
      disabled,

      ...props
    },
    ref,
  ) => {
    const generatedId = useId();

    const indicatorSize = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
    };

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={!!error}
        errorMessage={errorMessage}
        disabled={disabled}
        required={required}
      >
        <RadioGroup.Root
          ref={ref}

          value={value}

          defaultValue={defaultValue}

          onValueChange={onValueChange}

          disabled={disabled}

          className={cn(
            radioGroupVariants({
              orientation,
            }),
            className,
          )}

          {...props}
        >
          {options.map((option) => {
            const optionId = `${generatedId}-${option.value}`;

            return (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroup.Item
                  value={option.value}
                  id={optionId}
                  disabled={option.disabled}
                  aria-labelledby={`${optionId}-label`}
                  className={cn(
                    radioItemVariants({
                      size,
                      radius,
                      sateColor: error ? "error" : "default",
                    }),
                  )}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center">
                    <div className={cn(
                        "rounded-full bg-primary",
                        indicatorSize[size],
                        error? "bg-danger" : "bg-primary"
                    )} />
                  </RadioGroup.Indicator>
                </RadioGroup.Item>

                <label
                  id={`${optionId}-label`}
                  htmlFor={optionId}
                  className={cn(
                    "text-sm",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </RadioGroup.Root>
      </FormField>
    );
  },
);

VRadioGroup.displayName = "VRadioGroup";
