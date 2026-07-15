import type { InputHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { inputVariants } from "./input.variants";
import type { BaseFormFieldProps } from "../form-field/form";


export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
  VariantProps<typeof inputVariants>, BaseFormFieldProps {
  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  fullWidth?: boolean;

  
}