import type * as SwitchPrimitive from "@radix-ui/react-switch";

import type { BaseFormFieldProps } from "../form-field/form/types";
import type { Size } from "@/types/components";
import type { Radius } from "@/types/variants";

export interface SwitchProps
  extends Omit<SwitchPrimitive.SwitchProps, "children">,
    BaseFormFieldProps {
  size?: Size;
  radius?: Radius;
  error?: boolean;
}