import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";

import type { tableCellVariants, tableVariants } from "./table.variants";

export type TableAlign = "left" | "center" | "right";

export interface TableColumn<T> {
  key: string;

  header: ReactNode;

  align?: TableAlign;

  /** CSS width, e.g. "120px" or "20%". */
  width?: string;

  /** Custom cell renderer. Falls back to `row[key]` when omitted. */
  render?: (row: T, index: number) => ReactNode;
}

export interface TableProps<T extends object>
  extends
    VariantProps<typeof tableVariants>,
    Pick<VariantProps<typeof tableCellVariants>, "size"> {
  columns: TableColumn<T>[];

  data: T[];

  caption?: ReactNode;

  /** Shown in place of rows when `data` is empty. */
  emptyMessage?: ReactNode;

  getRowKey?: (row: T, index: number) => string | number;

  onRowClick?: (row: T, index: number) => void;

  className?: string;
}
