import type { Meta, StoryObj } from "@storybook/react-vite";

import { VCard } from "./card";

const meta = {
  title: "Components/Card",
  component: VCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: {
    title: "Card title",
    description: "A short supporting description for the card.",
    children: "This is the card body content.",
    variant: "default",
    padding: "md",
  },
} satisfies Meta<typeof VCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <VCard {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      <VCard variant="default" title="Default">
        Bordered, plain background.
      </VCard>

      <VCard variant="outlined" title="Outlined">
        Thicker border, transparent background.
      </VCard>

      <VCard variant="elevated" title="Elevated">
        Adds a drop shadow.
      </VCard>

      <VCard variant="filled" title="Filled">
        Muted background fill.
      </VCard>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div className="w-80">
      <VCard
        title="Delete account"
        description="This action cannot be undone."
        footer={
          <>
            <button className="rounded-md border px-3 py-1.5 text-sm">
              Cancel
            </button>

            <button className="bg-danger text-danger-foreground rounded-md px-3 py-1.5 text-sm">
              Delete
            </button>
          </>
        }
      >
        Deleting your account will remove all of your data permanently.
      </VCard>
    </div>
  ),
};

export const WithIconAndActions: Story = {
  render: () => (
    <div className="w-80">
      <VCard
        icon={
          <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-md">
            V
          </div>
        }
        title="Vertex UI"
        description="Component library"
        actions={
          <button
            aria-label="Card menu"
            className="hover:bg-muted rounded-md p-1"
          >
            ⋯
          </button>
        }
      >
        Accessible, composable, type-safe, beautiful.
      </VCard>
    </div>
  ),
};

export const PaddingSizes: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      {(["none", "sm", "md", "lg"] as const).map((padding) => (
        <VCard key={padding} padding={padding} title={`Padding: ${padding}`}>
          Card content.
        </VCard>
      ))}
    </div>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <div className="w-80">
      <VCard>No title, description, or footer — just content.</VCard>
    </div>
  ),
};
