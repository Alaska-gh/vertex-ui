import type { Meta, StoryObj } from "@storybook/react-vite";

import { VRadioGroup } from "./radio-group";

const meta = {
  title: "UI/RadioGroup",
  component: VRadioGroup,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
    },

    disabled: {
      control: "boolean",
    },

    error: {
      control: "boolean",
    },

    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof VRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;


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

    helperText: "Select your gender",

    orientation: "vertical",
  },
};


export const Horizontal: Story = {
  args: {
    options,

    label: "Gender",

    orientation: "horizontal",
  },
};


export const Disabled: Story = {
  args: {
    options,

    label: "Gender",

    disabled: true,
  },
};


export const DisabledOption: Story = {
  args: {
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
    ],

    label: "Role",
  },
};


export const Error: Story = {
  args: {
    options,

    label: "Gender",

    error: true,

    errorMessage: "Please select a gender",

    required: true,
  },
};


export const Controlled: Story = {
  args: {
    options,

    label: "Gender",

    value: "female",
  },
};