import type { Meta, StoryObj } from "@storybook/react-vite";

import { VBadge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: VBadge,
  tags: ["autodocs"],

  args: {
    children: "Badge",
    variant: "default",
    size: "md",
    radius: "full",
  },

  argTypes: {
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof VBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <VBadge>Default</VBadge>
      <VBadge variant="secondary">Secondary</VBadge>
      <VBadge variant="outline">Outline</VBadge>
      <VBadge variant="success">Success</VBadge>
      <VBadge variant="warning">Warning</VBadge>
      <VBadge variant="danger">Danger</VBadge>
      <VBadge variant="info">Info</VBadge>
    </div>
  ),
};
export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <VBadge radius="none">Default</VBadge>
      <VBadge radius="sm">Default</VBadge>
      <VBadge radius="md">Default</VBadge>
      <VBadge radius="lg">Default</VBadge>
      <VBadge radius="full">Default</VBadge>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const Rounded: Story = {
  args: {
    radius: "lg",
    children: "Rounded",
  },
};

export const Playground: Story = {};
