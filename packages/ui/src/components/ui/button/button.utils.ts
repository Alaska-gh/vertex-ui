import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button.variants";
import { BUTTON_WARNINGS } from "./button.constants";

type AccessibilityProps = { "aria-label"?: string; "aria-labelledby"?: string};

export function validateIconButton(
  size: VariantProps<typeof buttonVariants>["size"],
  accessibility: AccessibilityProps,
) {
  if (!import.meta.env.DEV ||size !== "icon") {
    return;
  }

   if (accessibility["aria-label"] || accessibility["aria-labelledby"]) {
    return;
  }

  console.warn(BUTTON_WARNINGS.iconOnly);
}

export function validateAsChildProps(
  asChild: boolean,
  loading: boolean,
  leftIcon: React.ReactNode,
  rightIcon: React.ReactNode,
) {

  if (!import.meta.env.DEV || !asChild) return;

   
  if (loading) {
    console.warn(
      "Vertex UI: 'loading' has no effect when using 'asChild'."
    );
  }

  if (leftIcon || rightIcon) {
    console.warn(
      "Vertex UI: Icons should be rendered inside the child element when using 'asChild'."
    );
  }
}