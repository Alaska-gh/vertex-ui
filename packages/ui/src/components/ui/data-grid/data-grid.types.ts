import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";

import type { TableAlign } from "../table/table.types";
import type { tableCellVariants, tableVariants } from "../table/table.variants";

export type SortDirection = "asc" | "desc";

export interface DataGridColumn<T> {
  key: string;

  header: ReactNode;

  align?: TableAlign;

  /** CSS width, e.g. "120px" or "20%". */
  width?: string;

  sortable?: boolean;

  /**
   * Value used for sorting when the default `row[key]` lookup isn't
   * directly comparable (e.g. the column uses a custom `render`).
   */
  sortAccessor?: (row: T) => string | number;

  /** Custom cell renderer. Falls back to `row[key]` when omitted. */
  render?: (row: T, index: number) => ReactNode;
}

export interface DataGridProps<T extends object>
  extends VariantProps<typeof tableVariants>,
    Pick<VariantProps<typeof tableCellVariants>, "size"> {
  columns: DataGridColumn<T>[];

  data: T[];

  caption?: ReactNode;

  /** Shown in place of rows when there is no data for the current page. */
  emptyMessage?: ReactNode;

  getRowKey?: (row: T, index: number) => string | number;

  onRowClick?: (row: T, index: number) => void;

  /** Enables a leading checkbox column for row selection. */
  selectable?: boolean;

  /** Controlled selection. Omit for uncontrolled usage. */
  selectedRowKeys?: Array<string | number>;

  defaultSelectedRowKeys?: Array<string | number>;

  onSelectionChange?: (keys: Array<string | number>) => void;

  /** Enables pagination when set; all rows render on one page otherwise. */
  pageSize?: number;

  /** Controlled current page (1-indexed). Omit for uncontrolled usage. */
  page?: number;

  defaultPage?: number;

  onPageChange?: (page: number) => void;

  /** Controlled sort column. Omit for uncontrolled usage. */
  sortKey?: string;

  defaultSortKey?: string;

  /** Controlled sort direction. Omit for uncontrolled usage. */
  sortDirection?: SortDirection;

  defaultSortDirection?: SortDirection;

  onSortChange?: (key: string, direction: SortDirection) => void;

  className?: string;
}