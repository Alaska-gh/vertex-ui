import { cn } from "@/lib/utils";

import { TABLE_DEFAULTS } from "./table.constants";

import { tableCellVariants, tableVariants } from "./table.variants";

import type { TableAlign, TableProps } from "./table.types";

const ALIGN_CLASSES: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function VTable<T extends object>({
  columns,
  data,
  caption,
  emptyMessage = TABLE_DEFAULTS.emptyMessage,
  getRowKey,
  onRowClick,
  variant = TABLE_DEFAULTS.variant,
  size = TABLE_DEFAULTS.size,
  className,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn(tableVariants({ variant }), className)}>
        {caption && (
          <caption className="text-muted-foreground mt-4 text-sm">
            {caption}
          </caption>
        )}

        <thead>
          <tr className="border-border border-b">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                className={cn(
                  tableCellVariants({ size }),
                  "text-muted-foreground font-medium",
                  ALIGN_CLASSES[column.align ?? "left"],
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(
                  tableCellVariants({ size }),
                  "text-muted-foreground text-center",
                )}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={getRowKey ? getRowKey(row, index) : index}
                onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                className={cn(
                  "border-border border-b last:border-0",
                  onRowClick && "hover:bg-muted/50 cursor-pointer",
                )}
              >
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
                          (row as Record<string, unknown>)[column.key] ?? "",
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
