import type { InputHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

import { inputVariants } from "./input.variants";


export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
  VariantProps<typeof inputVariants> {

  label?: string;

  helperText?: string;

  errorMessage?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  fullWidth?: boolean;
}