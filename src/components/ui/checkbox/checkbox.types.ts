
import type { VariantProps } from "class-variance-authority";
import * as Checkbox from "@radix-ui/react-checkbox";
import { checkboxVariants } from "./checkbox.variants";
import type { BaseFormFieldProps } from "../form-field/form/types";

export interface CheckboxProps
  extends Omit<
      Checkbox.CheckboxProps,
      "required" | "disabled"
    >,
    VariantProps<typeof checkboxVariants>,
    BaseFormFieldProps {
  className?: string;
  error?: boolean;
}