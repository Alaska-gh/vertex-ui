import type { Meta, StoryObj } from "@storybook/react-vite";

import { VBreadcrumb } from "./breadcrumb";

import type { BreadcrumbItem } from "./breadcrumb.types";

const basicItems: BreadcrumbItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "settings", label: "Settings", href: "/settings" },
  { key: "profile", label: "Profile" },
];

const meta = {
  title: "Components/Breadcrumb",
  component: VBreadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: basicItems,
  },
} satisfies Meta<typeof VBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    items: [
      { key: "home", label: "Home", href: "/", icon: <span aria-hidden>🏠</span> },
      {
        key: "projects",
        label: "Projects",
        href: "/projects",
        icon: <span aria-hidden>📁</span>,
      },
      { key: "vertex-ui", label: "vertex-ui", icon: <span aria-hidden>📦</span> },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: "/",
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { key: "home", label: "Home", onClick: () => alert("Navigate home") },
      {
        key: "settings",
        label: "Settings",
        onClick: () => alert("Navigate to settings"),
      },
      { key: "profile", label: "Profile" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ key: "home", label: "Home" }],
  },
};

export const LongTrail: Story = {
  args: {
    items: [
      { key: "home", label: "Home", href: "/" },
      { key: "products", label: "Products", href: "/products" },
      { key: "category", label: "Furniture", href: "/products/furniture" },
      { key: "subcategory", label: "Chairs", href: "/products/furniture/chairs" },
      { key: "item", label: "Ergonomic Office Chair" },
    ],
  },
};