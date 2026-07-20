import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import type { TableAlign } from "../table/table.types";
import { tableCellVariants, tableVariants } from "../table/table.variants";

import { DATA_GRID_DEFAULTS } from "./data-grid.constants";

import type {
  DataGridColumn,
  DataGridProps,
  SortDirection,
} from "./data-grid.types";

const ALIGN_CLASSES: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function getSortValue<T extends object>(
  row: T,
  column: DataGridColumn<T>,
): string | number {
  if (column.sortAccessor) {
    return column.sortAccessor(row);
  }

  const value = (row as Record<string, unknown>)[column.key];

  return typeof value === "number" ? value : String(value ?? "");
}

export function VDataGrid<T extends object>({
  columns,
  data,
  caption,
  emptyMessage = DATA_GRID_DEFAULTS.emptyMessage,
  getRowKey,
  onRowClick,

  selectable = false,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  onSelectionChange,

  pageSize,
  page,
  defaultPage = DATA_GRID_DEFAULTS.defaultPage,
  onPageChange,

  sortKey,
  defaultSortKey,
  sortDirection,
  defaultSortDirection = DATA_GRID_DEFAULTS.defaultSortDirection,
  onSortChange,

  variant = DATA_GRID_DEFAULTS.variant,
  size = DATA_GRID_DEFAULTS.size,
  className,
}: DataGridProps<T>) {
  const [internalSelected, setInternalSelected] =
    useState<Array<string | number>>(defaultSelectedRowKeys);
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalSortKey, setInternalSortKey] = useState<string | undefined>(
    defaultSortKey,
  );
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(defaultSortDirection);

  const selected = selectedRowKeys ?? internalSelected;
  const currentPage = page ?? internalPage;
  const activeSortKey = sortKey ?? internalSortKey;
  const activeSortDirection = sortDirection ?? internalSortDirection;

  const resolveRowKey = (row: T, index: number): string | number =>
    getRowKey ? getRowKey(row, index) : index;

  const sortedData = useMemo(() => {
    if (!activeSortKey) {
      return data;
    }

    const column = columns.find((candidate) => candidate.key === activeSortKey);

    if (!column) {
      return data;
    }

    const ascending = [...data].sort((a, b) => {
      const valueA = getSortValue(a, column);
      const valueB = getSortValue(b, column);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      }

      return String(valueA).localeCompare(String(valueB));
    });

    return activeSortDirection === "desc" ? ascending.reverse() : ascending;
  }, [data, columns, activeSortKey, activeSortDirection]);

  const pageCount = pageSize
    ? Math.max(1, Math.ceil(sortedData.length / pageSize))
    : 1;
  const safePage = Math.min(currentPage, pageCount);

  const pagedData = useMemo(() => {
    if (!pageSize) {
      return sortedData;
    }

    const start = (safePage - 1) * pageSize;

    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pageSize, safePage]);

  const handleSort = (column: DataGridColumn<T>) => {
    if (!column.sortable) {
      return;
    }

    const nextDirection: SortDirection =
      activeSortKey === column.key && activeSortDirection === "asc"
        ? "desc"
        : "asc";

    setInternalSortKey(column.key);
    setInternalSortDirection(nextDirection);
    onSortChange?.(column.key, nextDirection);
  };

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), pageCount);

    setInternalPage(clamped);
    onPageChange?.(clamped);
  };

  const toggleRow = (key: string | number) => {
    const next = selected.includes(key)
      ? selected.filter((candidate) => candidate !== key)
      : [...selected, key];

    setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const pageRowKeys = pagedData.map((row, index) => resolveRowKey(row, index));
  const allOnPageSelected =
    pageRowKeys.length > 0 &&
    pageRowKeys.every((key) => selected.includes(key));
  const someOnPageSelected = pageRowKeys.some((key) => selected.includes(key));

  const toggleSelectAllOnPage = () => {
    const next = allOnPageSelected
      ? selected.filter((key) => !pageRowKeys.includes(key))
      : [...new Set([...selected, ...pageRowKeys])];

    setInternalSelected(next);
    onSelectionChange?.(next);
  };

  return (
    <div className="w-full space-y-3">
      <div className="w-full overflow-x-auto">
        <table className={cn(tableVariants({ variant }), className)}>
          {caption && (
            <caption className="mt-4 text-sm text-muted-foreground">
              {caption}
            </caption>
          )}

          <thead>
            <tr className="border-b border-border">
              {selectable && (
                <th
                  scope="col"
                  className={cn(tableCellVariants({ size }), "w-10")}
                >
                  <input
                    type="checkbox"
                    aria-label="Select all rows on this page"
                    checked={allOnPageSelected}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = !allOnPageSelected && someOnPageSelected;
                      }
                    }}
                    onChange={toggleSelectAllOnPage}
                  />
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  aria-sort={
                    column.sortable && activeSortKey === column.key
                      ? activeSortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={cn(
                    tableCellVariants({ size }),
                    "font-medium text-muted-foreground",
                    ALIGN_CLASSES[column.align ?? "left"],
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column)}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      {column.header}

                      {activeSortKey === column.key ? (
                        activeSortDirection === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={cn(
                    tableCellVariants({ size }),
                    "text-center text-muted-foreground",
                  )}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pagedData.map((row, index) => {
                const rowKey = resolveRowKey(row, index);
                const isSelected = selected.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={
                      onRowClick ? () => onRowClick(row, index) : undefined
                    }
                    className={cn(
                      "border-b border-border last:border-0",
                      onRowClick && "cursor-pointer hover:bg-muted/50",
                      isSelected && "bg-muted/40",
                    )}
                  >
                    {selectable && (
                      <td
                        className={cn(tableCellVariants({ size }))}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          aria-label={`Select row ${index + 1}`}
                          checked={isSelected}
                          onChange={() => toggleRow(rowKey)}
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          tableCellVariants({ size }),
                          ALIGN_CLASSES[column.align ?? "left"],
                        )}
                      >
                        {column.render
                          ? column.render(row, index)
                          : String(
                              (row as Record<string, unknown>)[column.key] ??
                                "",
                            )}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pageSize && sortedData.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {safePage} of {pageCount}
          </span>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => handlePageChange(safePage - 1)}
              className="rounded-md border border-border px-2 py-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={safePage >= pageCount}
              onClick={() => handlePageChange(safePage + 1)}
              className="rounded-md border border-border px-2 py-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}