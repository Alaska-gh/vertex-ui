import type { Meta, StoryObj } from "@storybook/react-vite";

import { VSwitch } from "./switch";

const meta = {
  title: "Components/Switch",
  component: VSwitch,
  tags: ["autodocs"],

  args: {
    label: "Enable notifications",
    helperText: "Receive email updates",
  },

  argTypes: {
    onCheckedChange: { action: "checked changed" },
  },
} satisfies Meta<typeof VSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: "This field is required.",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Playground: Story = {};