import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";
import type { tabsListVariants } from "./tabs.variants";


export interface TabItem {
  value: string;

  label: ReactNode;

  content: ReactNode;

  disabled?: boolean;

  icon?: ReactNode;
}

export interface TabProps extends VariantProps<typeof tabsListVariants> {
  items: TabItem[];

  /** Controlled active tabs value. Omit for uncontrolled usage. */
  value?: string;

  /** Initial active tabs for uncontrolled usage. Defaults to the first item. */
  defaultValue?: string;

  onValueChange?: (value: string) => void;

  className?: string;
}