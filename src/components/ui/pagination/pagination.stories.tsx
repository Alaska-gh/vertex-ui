import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VPagination } from "./pagination";

const meta = {
  title: "Components/Pagination",
  component: VPagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    pageCount: 10,
  },
} satisfies Meta<typeof VPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyPages: Story = {
  args: {
    pageCount: 50,
    defaultPage: 24,
  },
};

export const FewPages: Story = {
  args: {
    pageCount: 4,
  },
};

export const WithoutFirstLast: Story = {
  args: {
    pageCount: 20,
    defaultPage: 10,
    showFirstLast: false,
  },
};

export const WiderSiblingRange: Story = {
  args: {
    pageCount: 20,
    defaultPage: 10,
    siblingCount: 2,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(1);

    return (
      <div className="flex flex-col items-center gap-3">
        <VPagination
          {...args}
          page={page}
          onPageChange={setPage}
        />

        <p className="text-sm text-muted-foreground">Current page: {page}</p>
      </div>
    );
  },
};

export const SinglePage: Story = {
  args: {
    pageCount: 1,
  },
};