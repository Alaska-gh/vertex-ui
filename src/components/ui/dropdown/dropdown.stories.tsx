import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VDropdown } from "./dropdown";

import type { DropdownItem } from "./dropdown.types";
import { VButton } from "../button";

const basicItems: DropdownItem[] = [
  { type: "item", key: "edit", label: "Edit" },
  { type: "item", key: "duplicate", label: "Duplicate" },
  { type: "separator", key: "sep-1" },
  { type: "item", key: "archive", label: "Archive" },
  { type: "separator", key: "sep-2" },
  { type: "item", key: "delete", label: "Delete", destructive: true },
];

const meta = {
  title: "Components/Dropdown",
  component: VDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    trigger: <VButton className="rounded-md border px-3 py-1.5">Open</VButton>,
    items: basicItems,
  },
} satisfies Meta<typeof VDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  render: () => (
    <VDropdown
      trigger={
        <VButton className="rounded-md border px-3 py-1.5">Account</VButton>
      }
      items={[
        {
          type: "item",
          key: "profile",
          label: "Profile",
          icon: <span aria-hidden>👤</span>,
        },
        {
          type: "item",
          key: "settings",
          label: "Settings",
          icon: <span aria-hidden>⚙️</span>,
        },
        { type: "separator", key: "sep" },
        {
          type: "item",
          key: "logout",
          label: "Log out",
          icon: <span aria-hidden>🚪</span>,
          destructive: true,
        },
      ]}
    />
  ),
};

export const WithSections: Story = {
  render: () => (
    <VDropdown
      trigger={
        <VButton className="rounded-md border px-3 py-1.5">View options</VButton>
      }
      items={[
        { type: "label", key: "sort-label", label: "Sort by" },
        { type: "item", key: "name", label: "Name" },
        { type: "item", key: "date", label: "Date" },
        { type: "separator", key: "sep" },
        { type: "label", key: "filter-label", label: "Filter" },
        { type: "item", key: "active", label: "Active only" },
      ]}
    />
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <VDropdown
      trigger={<VButton className="rounded-md border px-3 py-1.5">Open</VButton>}
      items={[
        { type: "item", key: "edit", label: "Edit" },
        { type: "item", key: "share", label: "Share", disabled: true },
        { type: "item", key: "delete", label: "Delete", destructive: true },
      ]}
    />
  ),
};

export const AlignedEnd: Story = {
  render: () => (
    <VDropdown
      align="end"
      trigger={<VButton className="rounded-md border px-3 py-1.5">Open</VButton>}
      items={basicItems}
    />
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <VDropdown
        open={open}
        onOpenChange={setOpen}
        trigger={
          <VButton className="rounded-md border px-3 py-1.5">
            {open ? "Close" : "Open"}
          </VButton>
        }
        items={basicItems}
      />
    );
  },
};