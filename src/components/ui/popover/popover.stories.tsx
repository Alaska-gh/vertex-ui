import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Bell,
  MoreHorizontal,
  User,
  Settings,
  LogOut,
  Check,
} from "lucide-react";

import { VButton } from "../button";
import { VPopover } from "./popover";

const meta = {
  title: "Components/Popover",
  component: VPopover,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VPopover>;

export default meta;

type Story = StoryObj<ComponentProps<typeof VPopover>>;


/**
 * User account menu
 * Common usage in dashboards/apps.
 */
export const AccountMenu: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center">
      <VPopover
        placement="bottom-end"
        trigger={
          <VButton variant="outline">
            <User className="mr-2 h-4 w-4" />
            Yussif
          </VButton>
        }
      >
        <div className="w-64 space-y-3 p-2">
          <div>
            <p className="font-semibold">
              Yussif Bashiru
            </p>

            <p className="text-sm text-muted-foreground">
              Frontend Engineer
            </p>
          </div>

          <div className="space-y-1 border-t pt-3">
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
              <Settings className="h-4 w-4" />
              Settings
            </button>

            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </VPopover>
    </div>
  ),
};


/**
 * Notification dropdown
 * Typical SaaS header usage.
 */
export const NotificationCenter: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center">
      <VPopover
        placement="bottom-end"
        trigger={
          <VButton
            variant="outline"
            size="icon"
          >
            <Bell className="h-4 w-4" />
          </VButton>
        }
      >
        <div className="w-80 space-y-3 p-2">
          <div>
            <h3 className="font-semibold">
              Notifications
            </h3>

            <p className="text-sm text-muted-foreground">
              You have 3 new updates.
            </p>
          </div>

          <div className="space-y-2">
            <div className="rounded-lg border p-3 text-sm">
              New order received.
            </div>

            <div className="rounded-lg border p-3 text-sm">
              Payment completed.
            </div>

            <div className="rounded-lg border p-3 text-sm">
              Report generated.
            </div>
          </div>
        </div>
      </VPopover>
    </div>
  ),
};


/**
 * Table row actions
 * Common admin dashboard usage.
 */
export const TableActions: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center">
      <VPopover
        placement="bottom-end"
        trigger={
          <VButton
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </VButton>
        }
      >
        <div className="w-48 space-y-1 p-1">
          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            View details
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
            Edit record
          </button>

          <button className="w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-muted">
            Delete
          </button>
        </div>
      </VPopover>
    </div>
  ),
};


/**
 * Status information card
 * Useful for tooltips/info popovers.
 */
export const StatusDetails: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center">
      <VPopover
        placement="right"
        trigger={
          <VButton variant="outline">
            View Status
          </VButton>
        }
      >
        <div className="w-64 space-y-3 p-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />

            <span className="font-medium">
              Deployment Successful
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Your latest deployment completed
            successfully 5 minutes ago.
          </p>
        </div>
      </VPopover>
    </div>
  ),
};