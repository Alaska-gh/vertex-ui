import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VPopover } from "./popover";
import { VButton } from "../button";
import { Bell, MoreHorizontal, User } from "lucide-react";

const meta = {
  title: "Components/Popover",
  component: VPopover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    trigger: <VButton className="rounded-md border px-3 py-1.5">Open</VButton>,
    children: "Popover content",
  },
} satisfies Meta<typeof VPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <VPopover trigger={<VButton>Open popover</VButton>}>
      <p className="text-sm">This is the popover content.</p>
    </VPopover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <VPopover
          key={side}
          side={side}
          trigger={<VButton>{side}</VButton>}
        >
          <p className="text-sm">{`${side} popover`}</p>
        </VPopover>
      ))}
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <VPopover
      trigger={<VButton>Account</VButton>}
    >
      <div className="space-y-2">
        <p className="font-medium">Signed in as Yussif</p>
        <p className="text-muted-foreground text-xs">
          Manage your account settings and preferences.
        </p>
      </div>
    </VPopover>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <VPopover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <VButton>
            {open ? "Close" : "Open"}
          </VButton>
        }
      >
        <p className="text-sm">Controlled from parent state.</p>
      </VPopover>
    );
  },
};

export const WithoutArrow: Story = {
  render: () => (
    <VPopover
      showArrow={false}
      trigger={<VButton className="rounded border px-3 py-1">No arrow</VButton>}
    >
      <p className="text-sm">No pointing arrow here.</p>
    </VPopover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <VPopover
      trigger={
        <VButton variant="outline">
          <User className="mr-2 h-4 w-4" />
          Account
        </VButton>
      }
    >
      <div className="w-72 space-y-3 p-2">
        <div>
          <h3 className="font-semibold">
            Yussif Bashiru
          </h3>

          <p className="text-muted-foreground text-sm">
            Frontend Engineer
          </p>
        </div>

        <div className="border-t pt-3">
          <button className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm">
            Profile
          </button>

          <button className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm">
            Settings
          </button>

          <button className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm text-destructive">
            Sign Out
          </button>
        </div>
      </div>
    </VPopover>
  ),
};

export const Notifications: Story = {
  render: () => (
    <VPopover
      side="bottom"
      align="end"
      trigger={
        <VButton variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </VButton>
      }
    >
      <div className="space-y-4 p-2">

        <div>
          <h3 className="font-semibold">
            Notifications
          </h3>

          <p className="text-muted-foreground text-sm">
            You have 3 unread notifications.
          </p>
        </div>

        <div className="space-y-3">

          <div className="rounded-md border p-3">
            New order received.
          </div>

          <div className="rounded-md border p-3">
            Payment confirmed.
          </div>

          <div className="rounded-md border p-3">
            Weekly report is ready.
          </div>

        </div>

      </div>
    </VPopover>
  ),
};

export const RowActions: Story = {
  render: () => (
    <VPopover
      side="bottom"
      align="end"
      trigger={
        <VButton
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4" />
        </VButton>
      }
    >
      <div className="w-48 space-y-1">

        <button className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm">
          View
        </button>

        <button className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm">
          Edit
        </button>

        <button className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm text-destructive">
          Delete
        </button>

      </div>
    </VPopover>
  ),
};