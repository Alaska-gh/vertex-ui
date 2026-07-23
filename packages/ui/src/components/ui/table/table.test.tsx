import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VTable } from "./table";

import type { TableColumn } from "./table.types";

interface Row {
  id: number;
  name: string;
  role: string;
}

const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];

const data: Row[] = [
  { id: 1, name: "Ama", role: "Admin" },
  { id: 2, name: "Kojo", role: "Editor" },
];

describe("VTable", () => {
  it("renders column headers", () => {
    render(<VTable<Row> columns={columns} data={data} />);

    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Role" }),
    ).toBeInTheDocument();
  });

  it("renders a row for each data item", () => {
    render(<VTable<Row> columns={columns} data={data} />);

    expect(screen.getByText("Ama")).toBeInTheDocument();
    expect(screen.getByText("Kojo")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("shows the empty message when data is empty", () => {
    render(
      <VTable<Row> columns={columns} data={[]} emptyMessage="Nothing here" />,
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("spans the empty message across all columns", () => {
    render(<VTable<Row> columns={columns} data={[]} />);

    expect(screen.getByRole("cell")).toHaveAttribute("colspan", "2");
  });

  it("uses a custom render function when provided", () => {
    const customColumns: TableColumn<Row>[] = [
      ...columns,
      {
        key: "custom",
        header: "Custom",
        render: (row) => (
          <span data-testid={`badge-${row.id}`}>{row.role.toUpperCase()}</span>
        ),
      },
    ];

    render(<VTable<Row> columns={customColumns} data={data} />);

    expect(screen.getByTestId("badge-1")).toHaveTextContent("ADMIN");
  });

  it("renders a caption when provided", () => {
    render(
      <VTable<Row> columns={columns} data={data} caption="Team members" />,
    );

    expect(screen.getByText("Team members")).toBeInTheDocument();
  });

  it("calls onRowClick with the row data", async () => {
    const onRowClick = vi.fn();
    const user = userEvent.setup();

    render(
      <VTable<Row> columns={columns} data={data} onRowClick={onRowClick} />,
    );

    await user.click(screen.getByText("Ama"));

    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  it("uses getRowKey when provided", () => {
    const getRowKey = vi.fn((row: Row) => row.id);

    render(<VTable<Row> columns={columns} data={data} getRowKey={getRowKey} />);

    expect(getRowKey).toHaveBeenCalled();
  });

  it("applies the bordered variant", () => {
    const { container } = render(
      <VTable<Row> columns={columns} data={data} variant="bordered" />,
    );

    expect(container.querySelector("table")).toHaveClass("border");
  });

  it("applies the requested size", () => {
    const { container } = render(
      <VTable<Row> columns={columns} data={data} size="sm" />,
    );

    expect(container.querySelector("td")).toHaveClass("px-3");
  });

  it("applies a custom column width", () => {
  const columnsWithWidth: TableColumn<Row>[] = [
    {
      key: "name",
      header: "Name",
      width: "200px",
    },
    {
      key: "role",
      header: "Role",
    },
  ];

  render(<VTable columns={columnsWithWidth} data={data} />);

  expect(
    screen.getByRole("columnheader", { name: "Name" }),
  ).toHaveStyle({
    width: "200px",
  });
});

it("applies custom text alignment to header and cells", () => {
  const alignedColumns: TableColumn<Row>[] = [
    {
      key: "name",
      header: "Name",
      align: "center",
    },
    {
      key: "role",
      header: "Role",
      align: "right",
    },
  ];

  render(<VTable columns={alignedColumns} data={data} />);

  expect(
    screen.getByRole("columnheader", { name: "Name" }),
  ).toHaveClass("text-center");

  expect(
    screen.getByRole("columnheader", { name: "Role" }),
  ).toHaveClass("text-right");

  expect(screen.getByText("Ama")).toHaveClass("text-center");
  expect(screen.getByText("Admin")).toHaveClass("text-right");
});

it("renders an empty string when a column key does not exist on the row", () => {
  const columnsWithMissingKey: TableColumn<Row>[] = [
    {
      key: "missing",
      header: "Missing",
    } as TableColumn<Row>,
  ];

  render(
    <VTable
      columns={columnsWithMissingKey}
      data={data}
    />,
  );

  const cell = screen.getAllByRole("cell")[0];

  expect(cell).toHaveTextContent("");
  expect(cell.textContent).toBe("");
});
});
