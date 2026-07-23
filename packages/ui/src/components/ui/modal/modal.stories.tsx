import { useState, type ComponentProps } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VButton } from "../button";
import { VInput } from "../input";
import { VModal } from "./modal";

const meta = {
  title: "Components/Modal",
  component: VModal,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof VModal>;

export default meta;

type ModalStoryProps = Omit<
  ComponentProps<typeof VModal>,
  "open" | "onOpenChange"
>;

type Story = StoryObj<ModalStoryProps>;

function ModalDemo(props: ModalStoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <VButton onClick={() => setOpen(true)}>
        Open Modal
      </VButton>

      <VModal
        {...props}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

ModalDemo.displayName = "ModalDemo";


export const Playground: Story = {
  args: {
    title: "Playground Modal",
    description:
      "Experiment with the available modal properties.",
    size: "md",
    showCloseButton: true,
    closeOnOverlayClick: true,
    disableEscapeKey: false,
    disableAutoFocus: false,
  },

  render: (args) => (
    <ModalDemo {...args}>
      <p className="text-muted-foreground text-sm">
        Use the controls panel to test different configurations.
      </p>
    </ModalDemo>
  ),
};


export const Default: Story = {
  render: () => (
    <ModalDemo
      title="Update Available"
      description="A new version of Vertex UI is ready."
    >
      <p className="text-muted-foreground text-sm">
        Version 2.0 introduces performance improvements,
        accessibility enhancements and new components.
      </p>
    </ModalDemo>
  ),
};


export const TitleOnly: Story = {
  render: () => (
    <ModalDemo title="Welcome to Vertex UI">
      <p className="text-muted-foreground text-sm">
        A modal containing only a title.
      </p>
    </ModalDemo>
  ),
};


export const DescriptionOnly: Story = {
  render: () => (
    <ModalDemo description="This modal has no title.">
      <p className="text-muted-foreground text-sm">
        Useful for simple notifications.
      </p>
    </ModalDemo>
  ),
};


export const DeleteConfirmation: Story = {
  render: () => (
    <ModalDemo
      size="sm"
      title="Delete project?"
      description="This action cannot be undone."
      footer={
        <>
          <VButton variant="outline">
            Cancel
          </VButton>

          <VButton variant="destructive">
            Delete
          </VButton>
        </>
      }
    >
      <p className="text-muted-foreground text-sm">
        All project files and collaborators will be permanently removed.
      </p>
    </ModalDemo>
  ),
};


export const EditProfile: Story = {
  render: () => (
    <ModalDemo
      size="lg"
      title="Edit Profile"
      description="Update your personal information."
      footer={
        <>
          <VButton variant="outline">
            Cancel
          </VButton>

          <VButton>
            Save Changes
          </VButton>
        </>
      }
    >
      <div className="space-y-4">
        <VInput placeholder="Full name" />

        <VInput
          type="email"
          placeholder="Email address"
        />
      </div>
    </ModalDemo>
  ),
};


export const SettingsForm: Story = {
  render: () => (
    <ModalDemo
      size="lg"
      title="Account Settings"
      description="Manage your account preferences."
      footer={
        <>
          <VButton variant="outline">
            Cancel
          </VButton>

          <VButton>
            Save
          </VButton>
        </>
      }
    >
      <div className="space-y-4">
        <VInput placeholder="Username" />

        <VInput placeholder="Website" />

        <VInput placeholder="Location" />
      </div>
    </ModalDemo>
  ),
};


export const TransactionDetails: Story = {
  render: () => (
    <ModalDemo
      title="Transaction Details"
      size="2xl"
    >
      <div className="space-y-3 text-sm">
        <p>
          <strong>Transaction ID:</strong> VX-2026-001
        </p>

        <p>
          <strong>Customer:</strong> John Doe
        </p>

        <p>
          <strong>Status:</strong> Completed
        </p>

        <p>
          <strong>Amount:</strong> $1,250
        </p>
      </div>
    </ModalDemo>
  ),
};


export const Fullscreen: Story = {
  render: () => (
    <ModalDemo
      size="full"
      title="Fullscreen Modal"
    >
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Suitable for editors, dashboards and complex workflows.
        </p>

        <div className="h-96 rounded-lg border border-border bg-muted" />
      </div>
    </ModalDemo>
  ),
};


export const LoadingState: Story = {
  render: () => (
    <ModalDemo
      title="Saving Changes"
      footer={
        <VButton disabled>
          Saving...
        </VButton>
      }
    >
      <p className="text-muted-foreground text-sm">
        Please wait while your changes are being saved.
      </p>
    </ModalDemo>
  ),
};


export const WithoutCloseButton: Story = {
  render: () => (
    <ModalDemo
      title="No Close Button"
      showCloseButton={false}
    >
      <p className="text-sm">
        The close button is hidden.
      </p>
    </ModalDemo>
  ),
};


export const PreventOverlayClose: Story = {
  render: () => (
    <ModalDemo
      title="Persistent Modal"
      closeOnOverlayClick={false}
    >
      <p className="text-sm">
        Clicking outside will not dismiss this modal.
      </p>
    </ModalDemo>
  ),
};


export const DisableEscapeKey: Story = {
  render: () => (
    <ModalDemo
      title="Escape Disabled"
      disableEscapeKey
    >
      <p className="text-sm">
        Pressing Escape will not close this modal.
      </p>
    </ModalDemo>
  ),
};


export const DisableAutoFocus: Story = {
  render: () => (
    <ModalDemo
      title="Auto Focus Disabled"
      disableAutoFocus
    >
      <p className="text-sm">
        Focus behavior is controlled externally.
      </p>
    </ModalDemo>
  ),
};


export const UnsavedChanges: Story = {
  render: () => (
    <ModalDemo
      title="Unsaved Changes"
      description="You have changes that haven't been saved."
      closeOnOverlayClick={false}
      footer={
        <>
          <VButton variant="outline">
            Stay
          </VButton>

          <VButton variant="destructive">
            Leave
          </VButton>
        </>
      }
    >
      <p className="text-muted-foreground text-sm">
        Leaving now will discard all unsaved changes.
      </p>
    </ModalDemo>
  ),
};