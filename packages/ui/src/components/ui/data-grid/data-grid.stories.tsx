import type { Meta, StoryObj } from "@storybook/react-vite";

import { VDataGrid } from "./data-grid";

import type { DataGridColumn, DataGridProps } from "./data-grid.types";

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const employees: Employee[] = [
  { id: 1, name: "Ama Owusu", department: "Engineering", salary: 92000 },
  { id: 2, name: "Kojo Mensah", department: "Design", salary: 81000 },
  { id: 3, name: "Efua Boateng", department: "Engineering", salary: 87000 },
  { id: 4, name: "Yaw Darko", department: "Sales", salary: 74000 },
  { id: 5, name: "Adjoa Asante", department: "Marketing", salary: 69000 },
  { id: 6, name: "Kwabena Ofori", department: "Engineering", salary: 98000 },
  { id: 7, name: "Abena Frimpong", department: "Design", salary: 76000 },
  { id: 8, name: "Kwame Nkrumah Jr.", department: "Sales", salary: 71000 },
];

const columns: DataGridColumn<Employee>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "department", header: "Department", sortable: true },
  {
    key: "salary",
    header: "Salary",
    align: "right",
    sortable: true,
    render: (row) => `$${row.salary.toLocaleString()}`,
  },
];

// VDataGrid is generic; cast to its concrete instantiation so Storybook's
// Meta/args typing works against `Employee` instead of collapsing to the
// generic constraint.
const EmployeeGrid = VDataGrid as (
  props: DataGridProps<Employee>,
) => React.ReactElement;

const meta = {
  title: "Components/DataGrid",
  component: EmployeeGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    columns,
    data: employees,
  },
} satisfies Meta<typeof EmployeeGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sortable: Story = {
  args: {
    defaultSortKey: "salary",
    defaultSortDirection: "desc",
  },
};

export const Paginated: Story = {
  args: {
    pageSize: 3,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const SelectableAndPaginated: Story = {
  args: {
    selectable: true,
    pageSize: 3,
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
  },
};

export const Compact: Story = {
  args: {
    size: "sm",
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: "No employees found.",
  },
};