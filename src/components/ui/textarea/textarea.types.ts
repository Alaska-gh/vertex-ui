import type { VariantProps } from "class-variance-authority";
import type { TextareaHTMLAttributes } from "react";
import type { textareaVariants } from "./textarea.variants";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof textareaVariants> {

  label?: string;
  helperText?: string;
  required?: boolean;
  error?: boolean
  errorMessage?: string;
  autoResize?: boolean
  showCount?: boolean
  minRows?: number
  maxRows?: number
  maxLength?: number
}