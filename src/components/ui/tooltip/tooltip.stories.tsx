import type { Meta, StoryObj } from "@storybook/react-vite";

import { VTooltip } from "./tooltip";
import { VTooltipProvider } from "./tooltip-provider";

const meta = {
  title: "Components/Tooltip",
  component: VTooltip,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <VTooltipProvider>
        <Story />
      </VTooltipProvider>
    ),
  ],
  tags: ["autodocs"],
  args: {
    content: "Tooltip",
    children: <button>Trigger</button>,
  },
} satisfies Meta<typeof VTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <VTooltip content="Save changes">
      <button
        className="
          rounded-md
          bg-primary
          px-4
          py-2
          text-primary-foreground
        "
      >
        Hover me
      </button>
    </VTooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      {(
        [
          "top",
          "right",
          "bottom",
          "left",
        ] as const
      ).map((side) => (
        <VTooltip
          key={side}
          content={`${side} tooltip`}
          side={side}
        >
          <button className="rounded border px-3 py-1">
            {side}
          </button>
        </VTooltip>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <VTooltip
      content="This tooltip contains a longer description to demonstrate wrapping and spacing."
    >
      <button className="rounded border px-3 py-1">
        Hover me
      </button>
    </VTooltip>
  ),
};

export const RichContent: Story = {
  render: () => (
    <VTooltip
      content={
        <div className="space-y-1">
          <p className="font-medium">
            Save Changes
          </p>
          <p className="text-xs opacity-80">
            Your changes will be applied immediately.
          </p>
        </div>
      }
    >
      <button className="rounded border px-3 py-1">
        Hover me
      </button>
    </VTooltip>
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <VTooltip content="You don't have permission to perform this action.">
      <span>
        <button
          disabled
          className="
            cursor-not-allowed
            rounded-md
            bg-muted
            px-4
            py-2
            text-muted-foreground
          "
        >
          Disabled
        </button>
      </span>
    </VTooltip>
  ),
};