import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { SPINNER_DEFAULTS } from "./spinner.constants";
import { spinnerVariants } from "./spinner.variants";

import type { SpinnerProps } from "./spinner.types";


export const VSpinner = forwardRef<
  HTMLSpanElement,
  SpinnerProps
>(
  (
    {
      size = SPINNER_DEFAULTS.size,
      color = SPINNER_DEFAULTS.color,
      label = SPINNER_DEFAULTS.label,
      className,
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(
          spinnerVariants({
            size,
            color,
          }),
          className,
        )}
      />
    );
  },
);


VSpinner.displayName =
  "VSpinner";