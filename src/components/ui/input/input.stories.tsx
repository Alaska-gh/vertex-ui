import type { Meta, StoryObj } from "@storybook/react";

import { VInput } from "./input";


const meta: Meta<typeof VInput> = {
  title: "UI/Input",
  component: VInput,

  tags: ["autodocs"],

  parameters: { layout: "centered" },

  argTypes: {
    variant: {
      control: "select",
      options: [
        "outline",
        "filled",
        "ghost",
      ],
    },

    size: {
      control: "select",
      options: [
        "sm",
        "md",
        "lg",
      ],
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
    helperText:
      "We will never share your email.",
  },
};



export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "example@email.com",
    error: true,
    errorMessage:"Please enter a valid email.",
  },
};



export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">

      <VInput
        size="sm"
        placeholder="Small"
      />

      <VInput
        size="md"
        placeholder="Medium"
      />

      <VInput
        size="lg"
        placeholder="Large"
      />

    </div>
  ),
};



export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">

      <VInput
        variant="outline"
        placeholder="Outline"
      />

      <VInput
        variant="filled"
        placeholder="Filled"
      />

      <VInput
        variant="ghost"
        placeholder="Ghost"
      />

    </div>
  ),
};