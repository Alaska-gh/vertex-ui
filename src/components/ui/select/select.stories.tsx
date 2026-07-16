import type { Meta, StoryObj } from "@storybook/react";

import { VSelect } from "./select";

const options = [
  { label: "Ghana", value: "gh" },
  { label: "Nigeria", value: "ng" },
  { label: "Kenya", value: "ke" },
  { label: "South Africa", value: "za" },
];

const meta: Meta<typeof VSelect> = {
  title: "UI/Select",
  component: VSelect,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },

    error: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof VSelect>;

export const Default: Story = {
  args: {
    placeholder: "Select a country",
    options,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Country",
    placeholder: "Select country",
    options,
  },
};

export const Disabled: Story = {
  args: {
    label: "Country",
    disabled: true,
    options,
  },
};


export const Error: Story = {
  args: {
    label: "Country",
    error: true,
    errorMessage: "Please select a country.",
    options,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VSelect size="sm" options={options} placeholder="Small" />

      <VSelect size="md" options={options} placeholder="Medium" />

      <VSelect size="lg" options={options} placeholder="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VSelect variant="outline" options={options} placeholder="Outline" />

      <VSelect variant="filled" options={options} placeholder="Filled" />

      <VSelect variant="ghost" options={options} placeholder="Ghost" />
    </div>
  ),
};


export const Radius: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VSelect radius="none" options={options} placeholder="None" />

      <VSelect radius="sm" options={options} placeholder="Small" />

      <VSelect radius="md" options={options} placeholder="Medium" />

      <VSelect radius="lg" options={options} placeholder="Large" />

      <VSelect radius="xl" options={options} placeholder="Extra Large" />

      <VSelect radius="full" options={options} placeholder="Full" />
    </div>
  ),
};

const mixedOptions = [
  { label: "Administrator", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer", disabled: true },
  { label: "Guest", value: "guest" },
];

export const DisabledOptions: Story = {
  args: {
    label: "Role",
    options: mixedOptions,
  },
};


const longOptions = Array.from({ length: 30 }, (_, index) => ({
  label: `Option ${index + 1}`,
  value: `${index + 1}`,
}));

export const LongList: Story = {
  args: {
    label: "Many Options",
    options: longOptions,
  },
};