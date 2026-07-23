import type * as ProgressPrimitive from "@radix-ui/react-progress";
import type { VariantProps } from "class-variance-authority";

import type {
  progressIndicatorVariants,
  progressVariants,
} from "./progress.variants";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<
      typeof ProgressPrimitive.Root
    >,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value: number;

  max?: number;

  label?: string;

  showValue?: boolean;

  striped?: boolean;

  animated?: boolean;
}