import { forwardRef } from "react";

import { inputVariants } from "./input.variants";
import { useId } from "react";

import type { InputProps } from "./input.types";

import { cn } from "@/lib/utils";
import { VFormField } from "../form-field";

export const VInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      error,
      label,
      helperText,
      errorMessage,
      disabled,
      required,
      leftIcon,
      rightIcon,
      fullWidth,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();

    const inputId = id ?? generatedId;

    return (
      <VFormField
        label={label}
        helperText={helperText}
        error={!!error}
        htmlFor={inputId}
        errorMessage={errorMessage}
        disabled={disabled}
        required={required}
      >
        {leftIcon}
        <input
          ref={ref}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          id={inputId}
          className={cn(
            inputVariants({ variant, size, radius, error, fullWidth }),

            leftIcon && "pl-10",

            rightIcon && "pr-10",

            className,
          )}
          {...props}
        />
        {rightIcon}
      </VFormField>
    );
  },
);

VInput.displayName = "VInput";
