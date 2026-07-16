import type { Meta, StoryObj } from "@storybook/react-vite";
import { VCheckbox } from "./checkbox";

const meta: Meta<typeof VCheckbox> = {
  title: "Components/Checkbox",
  component: VCheckbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },

    error: { control: "boolean" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof VCheckbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Accept terms and conditions",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked",
    disabled: true,
    checked: true,
  },
};

export const HelperText: Story = {
  args: {
    label: "Subscribe to updates",
    helperText: "We'll send product updates and announcements.",
  },
};

export const Error: Story = {
  args: {
    label: "Accept terms and conditions",
    error: true,
    errorMessage: "You must accept the terms before continuing.",
  },
};

export const Required: Story = {
  args: {
    label: "I agree to the privacy policy",
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <VCheckbox size="sm" label="Small checkbox" />
      <VCheckbox size="md" label="Medium checkbox" />
      <VCheckbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <VCheckbox radius="none" label="No radius" />
      <VCheckbox radius="sm" label="Small radius" />
      <VCheckbox radius="md" label="Medium radius" />
      <VCheckbox radius="lg" label="Large radius" />
      <VCheckbox radius="xl" label="Extra large radius" />
      <VCheckbox radius="full" label="Full radius" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: "Interactive checkbox",
    helperText: "Use the controls panel to change props.",
    size: "md",
    radius: "md",
  },
};