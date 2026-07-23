import type { MouseEventHandler, ReactNode } from "react";

export interface BreadcrumbBaseItem {
  key: string;

  label: ReactNode;

  icon?: ReactNode;

  disabled?: boolean;
}

export interface BreadcrumbLinkItem extends BreadcrumbBaseItem {
  type: "link";

  href: string;
}

export interface BreadcrumbActionItem extends BreadcrumbBaseItem {
  type: "action";

  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface BreadcrumbCurrentItem extends BreadcrumbBaseItem {
  type: "current";
}

export type BreadcrumbItem =
  BreadcrumbLinkItem | BreadcrumbActionItem | BreadcrumbCurrentItem;

export interface BreadcrumbProps {
  items: BreadcrumbItem[];

  separator?: ReactNode;

  maxItems?: number;

  ariaLabel?: string;

  collapsedLabel?: ReactNode;

  size?: "sm" | "md" | "lg";

  className?: string;
}
