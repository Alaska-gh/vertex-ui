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

  it("renders custom column content using render function", () => {
  render(
    <VDataGrid
      columns={[
        {
          key: "name",
          header: "Name",
          render: (row) => (
            <strong data-testid="custom-cell">
              {row.name}
            </strong>
          ),
        },
      ]}
      data={[
        {
          id: 1,
          name: "Yussif",
        },
      ]}
    />,
  );

  expect(
    screen.getByTestId("custom-cell"),
  ).toHaveTextContent("Yussif");
});

it("uses sortAccessor when provided", () => {
  render(
    <VDataGrid
      columns={[
        {
          key:"name",
          header:"Name",
          sortable:true,
          sortAccessor:(row)=>row.name.length,
        },
      ]}
      data={[
        {id:1,name:"John"},
        {id:2,name:"Alexandra"},
      ]}
    />
  );

  expect(screen.getByText("Alexandra")).toBeInTheDocument();
});

it("uses custom getRowKey resolver", () => {
  render(
    <VDataGrid
      columns={columns}
      data={data}
      getRowKey={(row) => row.id}
      selectable
    />,
  );

  expect(
    screen.getByLabelText("Select row 1"),
  ).toBeInTheDocument();
});

it("sorts numeric columns correctly", async () => {
  const user = userEvent.setup();

  render(
    <VDataGrid
      columns={[
        {
          key: "age",
          header: "Age",
          sortable: true,
        },
      ]}
      data={[
        { id: 1, age: 30 },
        { id: 2, age: 20 },
      ]}
    />,
  );

  await user.click(
    screen.getByRole("button", {
      name: "Age",
    }),
  );

  const cells = screen.getAllByRole("cell");

  expect(cells[0]).toHaveTextContent("20");
});

it("does not sort non sortable columns", async () => {
  render(
    <VDataGrid
      columns={[
        {
          key: "name",
          header: "Name",
          sortable: false,
        },
      ]}
      data={data}
    />,
  );

  expect(screen.getByText("Charlie")).toBeInTheDocument();
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bravo")).toBeInTheDocument();
});

it("deselects a selected row", async () => {
  const user = userEvent.setup();

  render(
    <VDataGrid
      columns={columns}
      data={data}
      selectable
    />,
  );

  const checkbox =
    screen.getByLabelText("Select row 1");

  await user.click(checkbox);

  expect(checkbox).toBeChecked();

  await user.click(checkbox);

  expect(checkbox).not.toBeChecked();
});

it("clears all selected rows when select all is checked", async () => {
  const user = userEvent.setup();

  const onSelectionChange = vi.fn();

  render(
    <VDataGrid
      columns={columns}
      data={data}
      selectable
      onSelectionChange={onSelectionChange}
    />,
  );

  const selectAll =
    screen.getByLabelText(
      "Select all rows on this page",
    );

  await user.click(selectAll);

  expect(
    onSelectionChange,
  ).toHaveBeenCalledWith([0,1,2]);

  await user.click(selectAll);

  expect(
    onSelectionChange,
  ).toHaveBeenLastCalledWith([]);
});

it("clears all selected rows when select all is checked", async () => {
  const user = userEvent.setup();

  const onSelectionChange = vi.fn();


  render(
    <VDataGrid
      columns={columns}
      data={data}
      selectable
      defaultSelectedRowKeys={[
        0,
        1,
        2,
      ]}
      onSelectionChange={onSelectionChange}
    />,
  );


  const checkbox =
    screen.getByLabelText(
      "Select all rows on this page",
    );


  await user.click(checkbox);


  expect(onSelectionChange)
    .toHaveBeenCalledWith([]);
});

it("uses index as fallback row key", () => {
  render(
    <VDataGrid
      columns={columns}
      data={data}
    />
  );

  expect(screen.getByText("Charlie"))
    .toBeInTheDocument();
});

it("returns original data when sort column does not exist", () => {
  render(
    <VDataGrid
      columns={columns}
      data={data}
      sortKey="missing"
    />
  );

  expect(
    screen.getByText("Charlie")
  ).toBeInTheDocument();
});

it("renders all rows without pagination", () => {
  render(
    <VDataGrid
      columns={columns}
      data={data}
    />
  );

  expect(
    screen.getByText("Charlie")
  ).toBeInTheDocument();

  expect(
    screen.queryByText(/Page/)
  ).not.toBeInTheDocument();
});

it("does not render pagination when data is empty", () => {
  render(
    <VDataGrid
      columns={columns}
      data={[]}
      pageSize={10}
    />
  );


  expect(
    screen.queryByText(/Page/)
  ).not.toBeInTheDocument();
});

it("uses sortAccessor when provided", async () => {
  const user = userEvent.setup();

  render(
    <VDataGrid
      columns={[
        {
          key: "name",
          header: "Name",
          sortable: true,
          sortAccessor: (row) => row.name.length,
        },
      ]}
      data={[
        { id: 1, name: "Alexandra" },
        { id: 2, name: "John" },
      ]}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Name" }));

  const cells = screen.getAllByRole("cell");

  // Sorted ascending by name length: "John" (4) before "Alexandra" (9)
  expect(cells[0]).toHaveTextContent("John");
});

it("navigates back to the previous page", async () => {
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
  expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /previous/i }));

  expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  expect(screen.getByText("Charlie")).toBeInTheDocument();
});
it("renders a caption when provided", () => {
  render(
    <VDataGrid<Row>
      columns={columns}
      data={data}
      caption="A summary of results"
      getRowKey={getRowKey}
    />,
  );

  expect(screen.getByText("A summary of results")).toBeInTheDocument();
});

it("applies an explicit column width", () => {
  render(
    <VDataGrid<Row>
      columns={[
        { key: "name", header: "Name", width: "200px" },
        { key: "score", header: "Score" },
      ]}
      data={data}
      getRowKey={getRowKey}
    />,
  );

  expect(
    screen.getByRole("columnheader", { name: "Name" }),
  ).toHaveStyle({ width: "200px" });
});

it("spans across the selection column when empty and selectable", () => {
  render(
    <VDataGrid<Row>
      columns={columns}
      data={[]}
      selectable
      getRowKey={getRowKey}
    />,
  );

  expect(screen.getByRole("cell")).toHaveAttribute(
    "colspan",
    String(columns.length + 1),
  );
});

it("falls back to an empty string for a column with no value and no render function", () => {
  interface PartialRow {
    id: number;
    nickname?: string;
  }

  render(
    <VDataGrid<PartialRow>
      columns={[{ key: "nickname", header: "Nickname" }]}
      data={[{ id: 1 }]}
    />,
  );

  expect(screen.getByRole("cell")).toHaveTextContent("");
});

it("uses the fallback (non-render) cell path when the value is a string", () => {
  render(
    <VDataGrid<Row>
      columns={[{ key: "name", header: "Name" }]}
      data={data}
      getRowKey={getRowKey}
    />,
  );

  expect(screen.getAllByRole("cell")[0]).toHaveTextContent("Charlie");
});

it("sorts a column with a missing value using the empty-string fallback", async () => {
  const user = userEvent.setup();

  interface PartialRow {
    id: number;
    nickname?: string;
  }

  render(
    <VDataGrid<PartialRow>
      columns={[{ key: "nickname", header: "Nickname", sortable: true }]}
      data={[
        { id: 1, nickname: "Bee" },
        { id: 2 }, // no nickname — getSortValue must fall back to ""
      ]}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Nickname" }));

  const cells = screen.getAllByRole("cell");

  // "" sorts before "Bee" alphabetically
  expect(cells[0]).toHaveTextContent("");
  expect(cells[1]).toHaveTextContent("Bee");
});
});