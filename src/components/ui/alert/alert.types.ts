import type { VariantProps } from "class-variance-authority";

import type { alertVariants } from "./alert.variants";


export interface AlertProps
  extends VariantProps<typeof alertVariants> {
  title?: string;

  children?: React.ReactNode;

  icon?: React.ReactNode;

  dismissible?: boolean;

  onDismiss?: () => void;

  className?: string;
}