import type { BreadcrumbProps } from "./breadcrumb.types";

export const BREADCRUMB_DEFAULTS = {
  ariaLabel: "Breadcrumb navigation",

  size: "md" satisfies BreadcrumbProps["size"],

  collapsedLabel: "More pages",
} as const;