import type { Meta, StoryObj } from "@storybook/react-vite";

import { VDivider } from "./divider";

const meta = {
  title: "Components/Divider",
  component: VDivider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <VDivider />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-64">
      <VDivider label="OR" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4">
      <span className="text-sm">Item one</span>

      <VDivider orientation="vertical" />

      <span className="text-sm">Item two</span>
    </div>
  ),
};

export const InAForm: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <button className="rounded-md border px-4 py-2 text-sm">
        Continue with email
      </button>

      <VDivider label="OR" />

      <button className="rounded-md border px-4 py-2 text-sm">
        Continue with Google
      </button>
    </div>
  ),
};

export const Meaningful: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Section one content.</p>

      <VDivider decorative={false} className="my-4" />

      <p className="text-sm">Section two content.</p>
    </div>
  ),
};