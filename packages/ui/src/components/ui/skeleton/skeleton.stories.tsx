import type { Meta, StoryObj } from "@storybook/react-vite";

import { VSkeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: VSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <VSkeleton/>,
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <VSkeleton variant="rectangular" width={120} height={80} />

      <VSkeleton variant="circular" />

      <VSkeleton variant="text" width={160} />
    </div>
  ),
};

export const CustomDimensions: Story = {
  render: () => <VSkeleton width={240} height={16} />,
};

export const TextLines: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <VSkeleton variant="text" width="100%" />

      <VSkeleton variant="text" width="100%" />

      <VSkeleton variant="text" width="60%" />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex w-72 items-center gap-4">
      <VSkeleton variant="circular" width={48} height={48} />

      <div className="flex flex-1 flex-col gap-2">
        <VSkeleton variant="text" width="80%" />

        <VSkeleton variant="text" width="50%" />
      </div>
    </div>
  ),
};

export const CustomLabel: Story = {
  render: () => <VSkeleton label="Fetching profile"/>,
};