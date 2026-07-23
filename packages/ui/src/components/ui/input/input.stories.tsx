import type { Meta, StoryObj } from "@storybook/react-vite";

import { VInput } from "./input";

const meta: Meta<typeof VInput> = {
  title: "Components/Input",
  component: VInput,

  tags: ["autodocs"],

  parameters: { layout: "centered" },

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

    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof VInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    placeholder: "example@email.com",
    helperText: "We will never share your email.",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "example@email.com",
    error: true,
    errorMessage: "Please enter a valid email.",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VInput size="sm" placeholder="Small" />

      <VInput size="md" placeholder="Medium" />

      <VInput size="lg" placeholder="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VInput variant="outline" placeholder="Outline" />

      <VInput variant="filled" placeholder="Filled" />

      <VInput variant="ghost" placeholder="Ghost" />
    </div>
  ),
};


export const Radius = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <VInput radius="none" placeholder="No border radius"/>
      <VInput radius="sm" placeholder="With small border radius"/>
      <VInput radius="md" placeholder="With medium border radius"/>
      <VInput radius="lg" placeholder="With large border radius"/>
      <VInput radius="xl" placeholder="With extra large border radius"/>
      <VInput radius="full" placeholder="With full border radius"/>
      <VInput className="rounded-full" placeholder="test"/>
    </div>
  ),
};
