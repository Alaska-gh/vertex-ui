import type { ReactNode } from "react";
import type { BaseFormFieldProps } from "./form/types";

export interface FormFieldProps extends BaseFormFieldProps {
  htmlFor?: string;
  children: ReactNode;
  error?: boolean
}
