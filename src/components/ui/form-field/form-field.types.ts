import type { ReactNode } from "react";
import type { BaseFormFieldProps } from "./form/types";

export type FormFieldLayout = "vertical" | "horizontal";

export interface FormFieldProps extends BaseFormFieldProps {
  htmlFor?: string;
  children: ReactNode;
  error?: boolean
  layout?: FormFieldLayout
  labelClassName?: string
}
