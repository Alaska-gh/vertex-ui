import type { VariantProps } from "class-variance-authority";
import type { TextareaHTMLAttributes } from "react";
import type { textareaVariants } from "./textarea.variants";
import type { BaseFormFieldProps } from "../form-field/form";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVariants>, BaseFormFieldProps {
  error?: boolean
  autoResize?: boolean
  showCount?: boolean
  minRows?: number
  maxRows?: number
  maxLength?: number
}