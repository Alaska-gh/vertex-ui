import {
  Folder,
  Home,
  Package,
  Settings,
} from "lucide-react";

import { fn } from "storybook/test";

import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";

import { VBreadcrumb } from "./breadcrumb";

import type {
  BreadcrumbItem,
} from "./breadcrumb.types";


const defaultItems: BreadcrumbItem[] = [
  {
    type: "link",
    key: "home",
    label: "Home",
    href: "/",
  },
  {
    type: "link",
    key: "settings",
    label: "Settings",
    href: "/settings",
  },
  {
    type: "current",
    key: "profile",
    label: "Profile",
  },
];


const meta = {
  title: "Components/Breadcrumb",
  component: VBreadcrumb,

  parameters: {
    layout: "centered",
  },

  tags: [
    "autodocs",
  ],

  argTypes: {
    size: {
      control: "select",
      options: [
        "sm",
        "md",
        "lg",
      ],
    },

    maxItems: {
      control: "number",
    },

    collapsedLabel: {
      control: "text",
    },

    ariaLabel: {
      control: "text",
    },

    separator: {
      control: false,
    },
  },

  args: {
    size: "md",
    ariaLabel: "Breadcrumb navigation",
    items: defaultItems,
  },

} satisfies Meta<typeof VBreadcrumb>;


export default meta;


type Story = StoryObj<typeof meta>;



export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default breadcrumb showing navigation links and the current page.",
      },
    },
  },
};



export const WithIcons: Story = {
  args: {
    items: [
      {
        type: "link",
        key: "home",
        label: "Home",
        href: "/",
        icon: (
          <Home
            className="h-4 w-4"
            aria-hidden="true"
          />
        ),
      },

      {
        type: "link",
        key: "projects",
        label: "Projects",
        href: "/projects",
        icon: (
          <Folder
            className="h-4 w-4"
            aria-hidden="true"
          />
        ),
      },

      {
        type: "current",
        key: "vertex",
        label: "Vertex UI",
        icon: (
          <Package
            className="h-4 w-4"
            aria-hidden="true"
          />
        ),
      },
    ],
  },
};



export const CustomSeparator: Story = {
  args: {
    separator: "/",
  },
};



export const IconSeparator: Story = {
  args: {
    separator: (
      <Settings
        className="h-3 w-3 text-muted-foreground"
        aria-hidden="true"
      />
    ),
  },
};



export const ActionItems: Story = {
  args: {
    items: [
      {
        type: "action",
        key: "home",
        label: "Home",
        onClick: fn(),
      },

      {
        type: "action",
        key: "settings",
        label: "Settings",
        onClick: fn(),
      },

      {
        type: "current",
        key: "profile",
        label: "Profile",
      },
    ],
  },
};



export const SingleItem: Story = {
  args: {
    items: [
      {
        type: "current",
        key: "dashboard",
        label: "Dashboard",
      },
    ],
  },
};



export const Collapsed: Story = {
  args: {
    maxItems: 4,

    collapsedLabel: "More",

    items: [
      {
        type: "link",
        key: "home",
        label: "Home",
        href: "/",
      },

      {
        type: "link",
        key: "products",
        label: "Products",
        href: "/products",
      },

      {
        type: "link",
        key: "category",
        label: "Furniture",
        href: "/products/furniture",
      },

      {
        type: "link",
        key: "chairs",
        label: "Chairs",
        href: "/products/furniture/chairs",
      },

      {
        type: "current",
        key: "item",
        label: "Ergonomic Office Chair",
      },
    ],
  },
};



export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">

      <VBreadcrumb
        size="sm"
        items={defaultItems}
      />

      <VBreadcrumb
        size="md"
        items={defaultItems}
      />

      <VBreadcrumb
        size="lg"
        items={defaultItems}
      />

    </div>
  ),
};



export const DisabledItems: Story = {
  args: {
    items: [
      {
        type: "link",
        key: "home",
        label: "Home",
        href: "/",
      },

      {
        type: "link",
        key: "restricted",
        label: "Restricted",
        href: "/restricted",
        disabled: true,
      },

      {
        type: "current",
        key: "profile",
        label: "Profile",
      },
    ],
  },
};



export const LongLabels: Story = {
  args: {
    items: [
      {
        type: "link",
        key: "home",
        label: "Home",
        href: "/",
      },

      {
        type: "link",
        key: "category",
        label:
          "Very long product category name example",
        href: "/category",
      },

      {
        type: "current",
        key: "product",
        label:
          "Professional Wireless Mechanical Keyboard",
      },
    ],
  },
};



export const CustomAriaLabel: Story = {
  args: {
    ariaLabel: "Application location",
  },
};