import type { Meta, StoryObj } from "@storybook/react-vite";

import { VAvatar } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: VAvatar,
  tags: ["autodocs"],

  args: {
    fallback: "JD",
    size: "md",
    radius: "full",
  },

  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
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

    src: {
      control: "text",
    },

    fallback: {
      control: "text",
    },
  },
} satisfies Meta<typeof VAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {};


export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "User avatar",
    fallback: "JD",
  },
};


export const Fallback: Story = {
  args: {
    fallback: "JD",
  },
};


export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VAvatar size="xs" fallback="XS" />
      <VAvatar size="sm" fallback="SM" />
      <VAvatar size="md" fallback="MD" />
      <VAvatar size="lg" fallback="LG" />
      <VAvatar size="xl" fallback="XL" />
    </div>
  ),
};
export const SizesWithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VAvatar size="xs" fallback="XS" src="https://i.pravatar.cc/150?img=12" />
      <VAvatar size="sm" fallback="SM" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar size="md" fallback="MD" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar size="lg" fallback="LG" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar size="xl" fallback="XL" src="https://i.pravatar.cc/150?img=12"/>
    </div>
  ),
};


export const Radius: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VAvatar radius="none" fallback="N" />
      <VAvatar radius="sm" fallback="S" />
      <VAvatar radius="md" fallback="M" />
      <VAvatar radius="lg" fallback="L" />
      <VAvatar radius="xl" fallback="XL" />
      <VAvatar radius="full" fallback="F" />
    </div>
  ),
};
export const RadiusWithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VAvatar radius="none" fallback="N" src="https://i.pravatar.cc/150?img=12" />
      <VAvatar radius="sm" fallback="S" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar radius="md" fallback="M" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar radius="lg" fallback="L" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar radius="xl" fallback="XL" src="https://i.pravatar.cc/150?img=12"/>
      <VAvatar radius="full" fallback="F" src="https://i.pravatar.cc/150?img=12"/>
    </div>
  ),
};


export const BrokenImageFallback: Story = {
  args: {
    src: "/invalid-image.png",
    fallback: "JD",
  },
};


export const Playground: Story = {};