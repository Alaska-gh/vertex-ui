import type { Meta, StoryObj } from "@storybook/react-vite";

import { VTable } from "./table";

import type { TableColumn, TableProps } from "./table.types";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "disabled";
}

const users: User[] = [
  {
    id: 1,
    name: "Ama Owusu",
    email: "ama@vertex.dev",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Kojo Mensah",
    email: "kojo@vertex.dev",
    role: "Editor",
    status: "invited",
  },
  {
    id: 3,
    name: "Efua Boateng",
    email: "efua@vertex.dev",
    role: "Viewer",
    status: "disabled",
  },
];

const statusClasses: Record<User["status"], string> = {
  active: "text-success",
  invited: "text-warning",
  disabled: "text-muted-foreground",
};

const columns: TableColumn<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => (
      <span className={statusClasses[row.status]}>{row.status}</span>
    ),
  },
];

// VTable is generic; cast to its concrete instantiation so Storybook's
// Meta/args typing works against `User` instead of collapsing to the
// generic constraint.
const UserTable = VTable as (props: TableProps<User>) => React.ReactElement;

const meta = {
  title: "Components/Table",
  component: UserTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    columns,
    data: users,
  },
} satisfies Meta<typeof UserTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Striped: Story = {
  args: {
    variant: "striped",
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

export const WithCaption: Story = {
  args: {
    caption: "A list of workspace members.",
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: "No members yet.",
  },
};

export const RowClickable: Story = {
  args: {
    onRowClick: (row) => alert(`Clicked ${row.name}`),
  },
};
