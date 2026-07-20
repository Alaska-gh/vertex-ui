import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TabItem } from "./tabs.types";
import { VTabs } from "./tabs";



const basicItems: TabItem[] = [
  {
    value: "account",
    label: "Account",
    content: <p className="text-sm">Manage your account settings here.</p>,
  },
  {
    value: "billing",
    label: "Billing",
    content: <p className="text-sm">View invoices and update payment.</p>,
  },
  {
    value: "notifications",
    label: "Notifications",
    content: <p className="text-sm">Choose what you want to hear about.</p>,
  },
];

const meta = {
  title: "Components/Tabs",
  component: VTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: basicItems,
  },
} satisfies Meta<typeof VTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <VTabs {...args} />
    </div>
  ),
};

export const Pills: Story = {
  render: (args) => (
    <div className="w-96">
      <VTabs {...args} variant="pills" />
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className="w-[28rem]">
      <VTabs {...args} orientation="vertical" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-96">
      <VTabs
        items={[
          {
            value: "overview",
            label: "Overview",
            icon: <span aria-hidden>🏠</span>,
            content: <p className="text-sm">Overview content.</p>,
          },
          {
            value: "activity",
            label: "Activity",
            icon: <span aria-hidden>📊</span>,
            content: <p className="text-sm">Activity content.</p>,
          },
        ]}
      />
    </div>
  ),
};

export const WithDisabledtabs: Story = {
  render: () => (
    <div className="w-96">
      <VTabs
        items={[
          {
            value: "general",
            label: "General",
            content: <p className="text-sm">General settings.</p>,
          },
          {
            value: "advanced",
            label: "Advanced",
            disabled: true,
            content: <p className="text-sm">Advanced settings.</p>,
          },
        ]}
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("billing");

    return (
      <VTabs
        {...args}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};