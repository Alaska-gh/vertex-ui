import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import type { selectVariants } from "./select.variants";
import type { BaseFormFieldProps } from "../form-field/form";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends BaseFormFieldProps, VariantProps<typeof selectVariants> {
  options: SelectOption[];

  value?: string;

  defaultValue?: string;

  placeholder?: string;

  onValueChange?: (value: string) => void;
  
  className?: string;

  children?: ReactNode;
}
