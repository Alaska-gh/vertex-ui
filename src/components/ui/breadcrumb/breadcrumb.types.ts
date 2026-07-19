import type { ReactNode } from "react";

export interface BreadcrumbItem {
  key: string;

  label: ReactNode;

  /** Renders the item as a link. Omit for the current page (last item). */
  href?: string;

  icon?: ReactNode;

  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** The last item is always treated as the current page. */
  items: BreadcrumbItem[];

  /** Rendered between each item. Defaults to a chevron icon. */
  separator?: ReactNode;

  className?: string;
}