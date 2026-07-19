import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VDataGrid } from "./data-grid";

import type { DataGridColumn } from "./data-grid.types";

interface Row {
  id: number;
  name: string;
  score: number;
}

const columns: DataGridColumn<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "score", header: "Score", sortable: true },
];

const data: Row[] = [
  { id: 1, name: "Charlie", score: 30 },
  { id: 2, name: "Alice", score: 10 },
  { id: 3, name: "Bravo", score: 20 },
];

const getRowKey = (row: Row) => row.id;

describe("VDataGrid", () => {
  it("renders column headers and all rows", () => {
    render(
      <VDataGrid<Row>
        columns={columns}
        data={data}
        getRowKey={getRowKey}
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: /name/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bravo")).toBeInTheDocument();
  });

  it("shows the empty message when data is empty", () => {
    render(
      <VDataGrid<Row>
        columns={columns}
        data={[]}
        emptyMessage="Nothing here"
        getRowKey={getRowKey}
      />,
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  describe("sorting", () => {
    it("sorts ascending on first header click", async () => {
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          getRowKey={getRowKey}
        />,
      );

      await user.click(screen.getByRole("button", { name: /name/i }));

      const rows = screen.getAllByRole("row").slice(1);

      expect(within(rows[0]).getByText("Alice")).toBeInTheDocument();
      expect(within(rows[1]).getByText("Bravo")).toBeInTheDocument();
      expect(within(rows[2]).getByText("Charlie")).toBeInTheDocument();
    });

    it("reverses to descending on second click of the same column", async () => {
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          getRowKey={getRowKey}
        />,
      );

      const nameHeaderButton = screen.getByRole("button", { name: /name/i });

      await user.click(nameHeaderButton);
      await user.click(nameHeaderButton);

      const rows = screen.getAllByRole("row").slice(1);

      expect(within(rows[0]).getByText("Charlie")).toBeInTheDocument();
    });

    it("respects defaultSortKey and defaultSortDirection", () => {
      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          defaultSortKey="score"
          defaultSortDirection="desc"
          getRowKey={getRowKey}
        />,
      );

      const rows = screen.getAllByRole("row").slice(1);

      expect(within(rows[0]).getByText("Charlie")).toBeInTheDocument();
    });

    it("calls onSortChange", async () => {
      const onSortChange = vi.fn();
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          onSortChange={onSortChange}
          getRowKey={getRowKey}
        />,
      );

      await user.click(screen.getByRole("button", { name: /score/i }));

      expect(onSortChange).toHaveBeenCalledWith("score", "asc");
    });
  });

  describe("pagination", () => {
    it("shows only pageSize rows per page", () => {
      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          pageSize={2}
          getRowKey={getRowKey}
        />,
      );

      expect(screen.getAllByRole("row")).toHaveLength(3);
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    it("navigates to the next page", async () => {
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          pageSize={2}
          getRowKey={getRowKey}
        />,
      );

      await user.click(screen.getByRole("button", { name: /next/i }));

      expect(screen.getByText("Bravo")).toBeInTheDocument();
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });

    it("disables Previous on the first page and Next on the last", async () => {
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          pageSize={2}
          getRowKey={getRowKey}
        />,
      );

      expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();

      await user.click(screen.getByRole("button", { name: /next/i }));

      expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    });

    it("calls onPageChange", async () => {
      const onPageChange = vi.fn();
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          pageSize={2}
          onPageChange={onPageChange}
          getRowKey={getRowKey}
        />,
      );

      await user.click(screen.getByRole("button", { name: /next/i }));

      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe("selection", () => {
    it("renders a checkbox per row plus a select-all checkbox", () => {
      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          selectable
          getRowKey={getRowKey}
        />,
      );

      expect(screen.getAllByRole("checkbox")).toHaveLength(4);
    });

    it("toggles an individual row and calls onSelectionChange", async () => {
      const onSelectionChange = vi.fn();
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          selectable
          onSelectionChange={onSelectionChange}
          getRowKey={getRowKey}
        />,
      );

      await user.click(
        screen.getByRole("checkbox", { name: /select row 1/i }),
      );

      expect(onSelectionChange).toHaveBeenCalledWith([1]);
    });

    it("selects all rows via the header checkbox", async () => {
      const onSelectionChange = vi.fn();
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          selectable
          onSelectionChange={onSelectionChange}
          getRowKey={getRowKey}
        />,
      );

      await user.click(
        screen.getByRole("checkbox", { name: /select all/i }),
      );

      expect(onSelectionChange).toHaveBeenCalledWith([1, 2, 3]);
    });

    it("does not trigger onRowClick when the checkbox is clicked", async () => {
      const onRowClick = vi.fn();
      const user = userEvent.setup();

      render(
        <VDataGrid<Row>
          columns={columns}
          data={data}
          selectable
          onRowClick={onRowClick}
          getRowKey={getRowKey}
        />,
      );

      await user.click(
        screen.getByRole("checkbox", { name: /select row 1/i }),
      );

      expect(onRowClick).not.toHaveBeenCalled();
    });
  });

  it("calls onRowClick with the row data", async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();

    render(
      <VDataGrid<Row>
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        getRowKey={getRowKey}
      />,
    );

    await user.click(screen.getByText("Charlie"));

    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it("applies the bordered variant", () => {
    const { container } = render(
      <VDataGrid<Row>
        columns={columns}
        data={data}
        variant="bordered"
        getRowKey={getRowKey}
      />,
    );

    expect(container.querySelector("table")).toHaveClass("border");
  });
});