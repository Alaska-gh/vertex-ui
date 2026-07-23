import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.types";
import { BUTTON_DEFAULTS } from "./button.constants";
import { validateAsChildProps, validateIconButton } from "./button.utils";
import { ButtonSpinner } from "./button.spinner";

export const VButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = BUTTON_DEFAULTS.variant,
      type = BUTTON_DEFAULTS.type,
      size = BUTTON_DEFAULTS.size,
      radius,
      asChild = false,
      loading = false,
      loadingText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      buttonVariants({ variant, size, radius }),
      fullWidth && "w-full",
      className,
    );

    const nativeButtonProps = asChild
      ? undefined
      : { type, disabled: isDisabled };

    const content = loading ? (loadingText ?? children) : children;

    const showLeftIcon = !loading && leftIcon;

    const showRightIcon = !loading && rightIcon;

    validateIconButton(size, {
      "aria-label": props["aria-label"],
      "aria-labelledby": props["aria-labelledby"],
    });

    validateAsChildProps(asChild, loading, leftIcon, rightIcon);

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classes}
          {...(loading && { "aria-busy": true })}
          {...(isDisabled && { "aria-disabled": true })}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...nativeButtonProps}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {showLeftIcon && (
          <span className="flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {loading && <ButtonSpinner />}

        <span>{content}</span>

        {showRightIcon && (
          <span className="flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

VButton.displayName = "VButton";
