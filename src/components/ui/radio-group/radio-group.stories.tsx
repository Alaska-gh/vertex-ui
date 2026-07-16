import type { Meta, StoryObj } from "@storybook/react-vite";

import { VRadioGroup } from "./radio-group";

const meta: Meta<typeof VRadioGroup> = {
  title: "UI/RadioGroup",
  component: VRadioGroup,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    radius: {
      control: "select",
      options: [
        "none",
        "sm",
        "md",
        "lg",
        "xl",
        "full",
      ],
    },

    error: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof VRadioGroup>;

const options = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const Default: Story = {
  args: {
    options,
    label: "Gender",
  },
};


export const Horizontal: Story = {
  args: {
    options,
    label: "Gender",
    orientation: "horizontal",
  },
};


export const WithHelperText: Story = {
  args: {
    options,
    label: "Gender",
    helperText: "Select your preferred option",
  },
};


export const Error: Story = {
  args: {
    options,
    label: "Gender",
    error: true,
    errorMessage: "Please select a gender",
  },
};


export const Disabled: Story = {
  args: {
    options,
    label: "Gender",
    disabled: true,
  },
};


export const WithDisabledOption: Story = {
  args: {
    label: "Role",

    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "Guest",
        value: "guest",
        disabled: true,
      },
      {
        label: "Editor",
        value: "editor",
      },
    ],
  },
};


export const Sizes: Story = {
  args: {
    options,
    label: "Size demo",
  },

  render: () => (
    <div className="space-y-6">
      <VRadioGroup
        options={options}
        label="Small"
        size="sm"
      />

      <VRadioGroup
        options={options}
        label="Medium"
        size="md"
      />

      <VRadioGroup
        options={options}
        label="Large"
        size="lg"
      />
    </div>
  ),
};