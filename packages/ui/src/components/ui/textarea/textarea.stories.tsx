import type { Meta, StoryObj } from "@storybook/react-vite";
import { VTextarea } from "./textarea";

const meta: Meta<typeof VTextarea> = {
  title: "Components/Textarea",
  component: VTextarea,
  tags: ["autodocs"],

  parameters: { layout: "centered" },

  args: {
    placeholder: "Enter text...",
    variant: "outline",
    size: "md",
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

    autoResize: {
      control: "boolean",
    },
    showCount: {
      control: "boolean",
    },

    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof VTextarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const CharacterCounter: Story = {
  args: {
    placeholder: "Type something",
    showCount: true,
    maxLength: 200,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Tell us about yourself...",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Description",
    helperText: "Maximum 200 characters",
    placeholder: "Write here...",
  },
};



export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};

export const AutoResize: Story = {
  args: {
    placeholder: "Start typing...",
    autoResize: true,
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
      <VTextarea size="sm" placeholder="Small" />

      <VTextarea size="md" placeholder="Medium" />

      <VTextarea size="lg" placeholder="Large" />
    </div>
  ),
};
export const Resizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VTextarea resize="none" placeholder="Resize: none" />
      <VTextarea resize="vertical" placeholder="Resize: vertical" />
      <VTextarea resize="horizontal" placeholder="Resize: horizontal" />
      <VTextarea resize="both" placeholder="Resize: both" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <VTextarea variant="outline" placeholder="Outline" />

      <VTextarea variant="filled" placeholder="Filled" />

      <VTextarea variant="ghost" placeholder="Ghost" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex w-[700px] flex-col gap-4">
      <VTextarea radius="none" placeholder="No border radius" />
      <VTextarea radius="sm" placeholder="With small border radius" />
      <VTextarea radius="md" placeholder="With medium border radius" />
      <VTextarea radius="lg" placeholder="With large border radius" />
      <VTextarea radius="xl" placeholder="With extra large border radius" />
      <VTextarea radius="full" placeholder="With full border radius" />
    </div>
  ),
};
export const FullWidth: Story = {
  render:() => ( 
    <div className="w-96">
        <VTextarea fullWidth placeholder="full width"/>
    </div>
)
  
};