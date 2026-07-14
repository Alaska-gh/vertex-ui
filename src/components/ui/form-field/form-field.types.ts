import type { ReactNode } from "react";

export interface FormFieldProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  children: ReactNode;
}
