import type { Meta, StoryObj } from "@storybook/react-vite";

import { VToastProvider } from "./toast.provider";
import { useToast } from "./use-toast";
import { VButton } from "../button";

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <VButton
        className="rounded-md border px-4 py-2"
        onClick={() =>
          toast({
            title: "Default",
            description: "This is a default toast.",
          })
        }
      >
        Default
      </VButton>

      <VButton
        className="rounded-md border px-4 py-2"
        onClick={() =>
          toast({
            variant: "success",
            title: "Success",
            description: "Operation completed successfully.",
          })
        }
      >
        Success
      </VButton>

      <VButton
        className="rounded-md border px-4 py-2"
        onClick={() =>
          toast({
            variant: "warning",
            title: "Warning",
            description: "Please review your changes.",
          })
        }
      >
        Warning
      </VButton>

      <VButton
        className="rounded-md border px-4 py-2"
        onClick={() =>
          toast({
            variant: "danger",
            title: "Error",
            description: "Something went wrong.",
          })
        }
      >
        Danger
      </VButton>
    </div>
  );
}

const meta = {
  title: "Components/Toast",
  component: ToastDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <VToastProvider>
        <Story />
      </VToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const AutoDismiss: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <VButton
        className="rounded-md border px-4 py-2"
        onClick={() =>
          toast({
            title: "Auto dismiss",
            description: "This toast disappears after 2 seconds.",
            duration: 2000,
          })
        }
      >
        Show Toast
      </VButton>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <VButton
        className="rounded-md border px-4 py-2"
        onClick={() =>
          toast({
            title: "Persistent",
            description: "This toast stays until dismissed.",
            duration: 0,
          })
        }
      >
        Show Toast
      </VButton>
    );
  },
};

export const BottomRight: Story = {
  render: () => (
    <VToastProvider position="bottom-right">
      <ToastDemo />
    </VToastProvider>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <VToastProvider position="bottom-center">
      <ToastDemo />
    </VToastProvider>
  ),
};

export const TopLeft: Story = {
  render: () => (
    <VToastProvider position="top-left">
      <ToastDemo />
    </VToastProvider>
  ),
};

export const MultipleToasts: Story = {
  render: () => <ToastDemo />,
};
