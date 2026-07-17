import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { ALERT_DEFAULTS } from "./alert.constants";

import {
  alertVariants,
} from "./alert.variants";

import type {
  AlertProps,
} from "./alert.types";


export const VAlert =
  forwardRef<HTMLDivElement, AlertProps>(
    (
      {
        title,
        children,
        icon,
        dismissible,
        onDismiss,
        variant = ALERT_DEFAULTS.variant,
        className,
      },
      ref,
    ) => {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(
            alertVariants({
              variant,
            }),
            className,
          )}
        >
          <div className="flex gap-3">

            {icon && (
              <div>
                {icon}
              </div>
            )}

            <div className="flex-1">

              {title && (
                <h5 className="font-medium">
                  {title}
                </h5>
              )}

              {children && (
                <div>
                  {children}
                </div>
              )}

            </div>


            {dismissible && (
              <button
                type="button"
                aria-label="Dismiss alert"
                onClick={onDismiss}
                className="
                  opacity-70
                  hover:opacity-100
                "
              >
                ×
              </button>
            )}

          </div>
        </div>
      );
    },
  );


VAlert.displayName = "VAlert";