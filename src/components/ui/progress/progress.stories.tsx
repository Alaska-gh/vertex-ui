import type { Meta, StoryObj } from "@storybook/react-vite";

import { VProgress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: VProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    variant: {
      control: "select",
      options: ["primary", "success", "warning", "danger"],
    },

    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
      },
    },

    striped: {
      control: "boolean",
    },

    animated: {
      control: "boolean",
    },

    showValue: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof VProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    showValue: true
  },
};

export const WithLabel: Story = {
  args: {
    value: 65,
    label: "Uploading files",
    showValue: true,
  },
};

export const Sizes: Story = {
  args: { value: 50 },
  render: () => (
    <div className="w-80 space-y-4">
      <VProgress value={40} size="sm" />

      <VProgress value={60} size="md" />

      <VProgress value={80} size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  args: { value: 50 },

  render: () => (
    <div className="w-80 space-y-4">
      <VProgress value={70} variant="primary" />

      <VProgress value={70} variant="success" />

      <VProgress value={70} variant="warning" />

      <VProgress value={70} variant="danger" />
    </div>
  ),
};

export const Striped: Story = {
  args: {
    value: 60,
    striped: true,
  },
};

export const Animated: Story = {
  args: {
    value: 75,
    striped: true,
    animated: true,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    label: "Completed",
    showValue: true,
    variant: "success",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    label: "Waiting",
    showValue: true,
  },
};
