import type { BaseFormFieldProps } from "../form-field/form/types";

export type RadioSize = "sm" | "md" | "lg";

export type RadioRadius = "none" | "sm" | "md" | "lg" | "full";
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends BaseFormFieldProps {
  options: RadioOption[];

  value?: string;

  defaultValue?: string;

  onValueChange?: (value: string) => void;

  orientation?: "vertical" | "horizontal";

  disabled?: boolean;

  error?: boolean;

  className?: string;

  size?: RadioSize
  radius?: RadioRadius
}
