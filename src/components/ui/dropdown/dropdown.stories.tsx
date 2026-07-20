import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VButton } from "../button";

import { VDropdown } from "./dropdown";

import type { DropdownItem } from "./dropdown.types";

const basicItems: DropdownItem[] = [
  {
    type: "item",
    key: "edit",
    label: "Edit",
  },
  {
    type: "item",
    key: "duplicate",
    label: "Duplicate",
  },
  {
    type: "separator",
    key: "separator-1",
  },
  {
    type: "item",
    key: "archive",
    label: "Archive",
  },
  {
    type: "separator",
    key: "separator-2",
  },
  {
    type: "item",
    key: "delete",
    label: "Delete",
    variant: "destructive",
  },
];

const meta = {
  title: "Components/Dropdown",
  component: VDropdown,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  args: {
    trigger: <VButton>Open</VButton>,

    items: basicItems,
  },
} satisfies Meta<typeof VDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Playground: Story = {
  args: {
    side: "bottom",
    align: "start",
    sideOffset: 8,
  },

  render: (args) => (
    <VDropdown
      {...args}

      trigger={<VButton>Open Menu</VButton>}

      items={basicItems}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <VDropdown
      trigger={<VButton>Account</VButton>}

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

        {
          type: "separator",
          key: "separator",
        },

        {
          type: "item",
          key: "logout",
          label: "Logout",
          variant: "destructive",
          icon: <span aria-hidden>🚪</span>,
        },
      ]}
    />
  ),
};

export const WithSections: Story = {
  render: () => (
    <VDropdown
      trigger={<VButton>View Options</VButton>}

      items={[
        {
          type: "label",
          key: "sort",
          label: "Sort By",
        },

        {
          type: "item",
          key: "name",
          label: "Name",
        },

        {
          type: "item",
          key: "date",
          label: "Date",
        },

        {
          type: "separator",
          key: "separator",
        },

        {
          type: "label",
          key: "filter",
          label: "Filter",
        },

        {
          type: "item",
          key: "active",
          label: "Active Only",
        },
      ]}
    />
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <VDropdown
      trigger={<VButton>Actions</VButton>}

      items={[
        {
          type: "item",
          key: "edit",
          label: "Edit",
        },

        {
          type: "item",
          key: "share",
          label: "Share",
          disabled: true,
        },

        {
          type: "item",
          key: "delete",
          label: "Delete",
          variant: "destructive",
        },
      ]}
    />
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <VDropdown
      align="end"

      trigger={<VButton>Open</VButton>}

      items={basicItems}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <VDropdown
        open={open}

        onOpenChange={setOpen}

        trigger={<VButton>{open ? "Close" : "Open"}</VButton>}

        items={basicItems}
      />
    );
  },
};
