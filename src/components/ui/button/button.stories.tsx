import type { Meta, StoryObj } from "@storybook/react";
import { VButton } from "./button";
import { Plus, Settings, ArrowRight } from "lucide-react";

const meta: Meta<typeof VButton> = {
  title: "UI/Button",
  component: VButton,

  parameters: {
    layout: "centered",

    a11y: {
      test: "todo",
    },
  },

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },

    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },

    loading: {
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

type Story = StoryObj<typeof VButton>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <VButton variant="primary">Primary</VButton>

      <VButton variant="secondary">Secondary</VButton>

      <VButton variant="outline">Outline</VButton>

      <VButton variant="ghost">Ghost</VButton>

      <VButton variant="destructive">Destructive</VButton>

      <VButton variant="link">Link</VButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VButton size="sm">Small</VButton>

      <VButton size="md">Medium</VButton>

      <VButton size="lg">Large</VButton>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <VButton radius="none">None Radius</VButton>
      <VButton radius="sm">Small Radius</VButton>
      <VButton radius="md">Medium Radius</VButton>
      <VButton radius="lg">Large Radius</VButton>
      <VButton radius="xl">XL Radius</VButton>
      <VButton radius="full">Full Radius</VButton>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Saving",
  },
};

export const Icons: Story = {
  render: () => (
    <div className="flex gap-4">
      <VButton leftIcon={<Plus />}>Add</VButton>

      <VButton rightIcon={<ArrowRight />}>Continue</VButton>

      <VButton size="icon" aria-label="Settings">
        <Settings />
      </VButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <VButton fullWidth>Full Width</VButton>
    </div>
  ),
};
