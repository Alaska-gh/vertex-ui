import type { ComponentProps } from "react";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VDrawer } from "./drawer";


const meta = {
  title: "Components/Drawer",
  component: VDrawer,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VDrawer>;


export default meta;


type DrawerStoryProps = Omit<
  ComponentProps<typeof VDrawer>,
  "open" | "onOpenChange"
>;


type Story = StoryObj<DrawerStoryProps>;



function DrawerDemo(
  props: DrawerStoryProps,
) {
  const [open, setOpen] = useState(false);


  return (
    <div className="flex p-4 items-center justify-center">

      <button
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        onClick={() => setOpen(true)}
      >
        Open Drawer
      </button>


      <VDrawer
        {...props}
        open={open}
        onOpenChange={setOpen}
      />

    </div>
  );
}

export const UserSettings: Story = {
  render: () => (
    <DrawerDemo
      title="Account Settings"
      description="Manage your profile and preferences."
      size="md"
      side="right"
      footer={
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
          Save Changes
        </button>
      }
    >
      <div className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            Name
          </label>

          <input
            className="mt-1 w-full rounded-md border p-2"
            value="Yussif"
            readOnly
          />
        </div>


        <div>
          <label className="text-sm font-medium">
            Email
          </label>

          <input
            className="mt-1 w-full rounded-md border p-2"
            value="user@example.com"
            readOnly
          />
        </div>

      </div>
    </DrawerDemo>
  ),
};

export const ProductFilters: Story = {
  render: () => (
    <DrawerDemo
      title="Filter Products"
      description="Refine your search results."
      side="left"
      size="sm"
    >
      <div className="space-y-5">

        <div>
          <h4 className="font-medium">
            Category
          </h4>

          <label className="block">
            <input type="checkbox" /> Electronics
          </label>

          <label className="block">
            <input type="checkbox" /> Clothing
          </label>
        </div>


        <div>
          <h4 className="font-medium">
            Price Range
          </h4>

          <input
            type="range"
            className="w-full"
          />
        </div>

      </div>
    </DrawerDemo>
  ),
};

export const MobileNavigation: Story = {
  render: () => (
    <DrawerDemo
      title="Navigation"
      side="left"
      size="sm"
    >
      <nav className="space-y-3">

        <a className="block bg-primary p-4 rounded-sm text-primary-foreground">
          Dashboard
        </a>

        <a className="block bg-primary p-4 rounded-sm text-primary-foreground">
          Orders
        </a>

        <a className="block bg-primary p-4 rounded-sm text-primary-foreground">
          Customers
        </a>

        <a className="block bg-primary p-4 rounded-sm text-primary-foreground">
          Settings
        </a>

      </nav>
    </DrawerDemo>
  ),
};

export const OrderDetails: Story = {
  render: () => (
    <DrawerDemo
      title="Order #VX-2026-001"
      description="Customer order information."
      size="lg"
      side="right"
    >
      <div className="space-y-4">

        <p>
          Customer: John Doe
        </p>

        <p>
          Status: Completed
        </p>

        <p>
          Items:
        </p>


        <ul className="list-disc pl-5">
          <li>Wireless Keyboard</li>
          <li>Monitor Stand</li>
          <li>USB Hub</li>
        </ul>

      </div>
    </DrawerDemo>
  ),
};


export const ActionSheet: Story = {
  render: () => (
    <DrawerDemo
      title="Choose Action"
      side="bottom"
      size="sm"
    >
      <div className="space-y-3">

        <button className="w-full rounded-md border p-3">
          Share
        </button>

        <button className="w-full rounded-md border p-3">
          Download
        </button>

        <button className="w-full rounded-md border p-3">
          Delete
        </button>

      </div>
    </DrawerDemo>
  ),
};