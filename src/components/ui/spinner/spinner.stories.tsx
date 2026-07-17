import type { Meta, StoryObj } from "@storybook/react-vite";

import { VSpinner } from "./spinner";


const meta = {
  title: "Components/Spinner",
  component: VSpinner,
  parameters: {
    layout: "centered",
  },
  tags: [
    "autodocs",
  ],
} satisfies Meta<typeof VSpinner>;


export default meta;


type Story = StoryObj<typeof meta>;


export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <VSpinner />

      <span>
        Loading...
      </span>
    </div>
  ),
};


export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <VSpinner size="sm" />

      <VSpinner size="md" />

      <VSpinner size="lg" />
    </div>
  ),
};


export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <VSpinner
        color="warning"
      />

      <VSpinner
        color="muted"
      />

      <VSpinner
        color="success"
      />

      <VSpinner
        color="black"
        className="bg-secondary p-2 rounded-full"
      />
    </div>
  ),
};


export const CustomLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <VSpinner
        label="Saving data"
      />

      <span>
        Saving data...
      </span>
    </div>
  ),
};


export const WithCustomClass: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <VSpinner
        className="h-10 w-10"
      />

      <span>
        Large custom spinner
      </span>
    </div>
  ),
};