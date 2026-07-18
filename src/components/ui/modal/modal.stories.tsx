import type { ComponentProps } from "react";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

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
      <button
        className="bg-primary text-primary-foreground rounded-md px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      <VModal {...props} open={open} onOpenChange={setOpen} />
    </>
  );
}

export const Default: Story = {
  render: () => (
    <ModalDemo
      title="Update Available"
      description="A new version of Vertex UI is ready."
    >
      <p className="text-sm text-muted-foreground">
        Version 2.0 includes improved performance,
        accessibility updates, and new components.
      </p>
    </ModalDemo>
  ),
};

export const DeleteConfirmation: Story = {
  render: () => (
    <ModalDemo
      title="Delete project?"
      description="This action cannot be undone."
      size="sm"
      footer={
        <>
          <button className="rounded-md border px-4 py-2">
            Cancel
          </button>

          <button className="rounded-md bg-danger px-4 py-2 text-white">
            Delete
          </button>
        </>
      }
    >
      <p className="text-sm">
        All project files and members will be permanently removed.
      </p>
    </ModalDemo>
  ),
};

export const EditProfile: Story = {
  render: () => (
    <ModalDemo
      title="Edit Profile"
      description="Update your personal information."
      size="lg"
      footer={
        <>
          <button className="rounded-md border px-4 py-2">
            Cancel
          </button>

          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Save Changes
          </button>
        </>
      }
    >
      <div className="space-y-4">

        <input
          className="w-full rounded-md border p-2"
          placeholder="Full name"
        />

        <input
          className="w-full rounded-md border p-2"
          placeholder="Email address"
        />

      </div>
    </ModalDemo>
  ),
};
export const LargeContent: Story = {
  render: () => (
    <ModalDemo
      title="Transaction Details"
      size="2xl"
    >
      <div className="space-y-3">

        <p>
          Transaction ID: #VX-2026-001
        </p>

        <p>
          Customer: John Doe
        </p>

        <p>
          Status: Completed
        </p>

        <p>
          Amount: $1,250
        </p>

      </div>
    </ModalDemo>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ModalDemo title="No Close Button" showCloseButton={false}>
      <p>Close this modal using the overlay.</p>
    </ModalDemo>
  ),
};

export const PreventOverlayClose: Story = {
  render: () => (
    <ModalDemo title="Persistent Modal" closeOnOverlayClick={false}>
      <p>Clicking outside will not close this modal.</p>
    </ModalDemo>
  ),
};

export const UnsavedChanges: Story = {
  render: () => (
    <ModalDemo
      title="Unsaved Changes"
      description="You have changes that haven't been saved."
      closeOnOverlayClick={false}
    >
      <p>
        Are you sure you want to leave this page?
      </p>
    </ModalDemo>
  ),
};