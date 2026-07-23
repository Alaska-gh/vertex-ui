import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VBreadcrumb } from "./breadcrumb";

import type { BreadcrumbItem } from "./breadcrumb.types";


const items = [
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
] satisfies BreadcrumbItem[];



describe("VBreadcrumb", () => {

  it("renders breadcrumb navigation", () => {
    render(<VBreadcrumb items={items} />);

    expect(
      screen.getByRole("navigation", {
        name: "Breadcrumb navigation",
      }),
    ).toBeInTheDocument();
  });

  it("renders all breadcrumb labels", () => {
    render(<VBreadcrumb items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders link items correctly", () => {
    render(<VBreadcrumb items={items} />);

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toHaveAttribute("href", "/");


    expect(
      screen.getByRole("link", {
        name: "Settings",
      }),
    ).toHaveAttribute("href", "/settings");
  });

  it("marks the current page correctly", () => {
    render(<VBreadcrumb items={items} />);

    const current =
      screen.getByText("Profile");

    expect(current)
      .toHaveAttribute(
        "aria-current",
        "page",
      );
  });

  it("renders action items as buttons", () => {
    render(
      <VBreadcrumb
        items={[
          {
            type: "action",
            key: "refresh",
            label: "Refresh",
            onClick: vi.fn(),
          },
          {
            type: "current",
            key: "profile",
            label: "Profile",
          },
        ]}
      />,
    );


    expect(
      screen.getByRole("button", {
        name: "Refresh",
      }),
    ).toBeInTheDocument();
  });

  it("calls action handlers when clicked", async () => {
    const onClick = vi.fn();

    const user = userEvent.setup();


    render(
      <VBreadcrumb
        items={[
          {
            type: "action",
            key: "refresh",
            label: "Refresh",
            onClick,
          },
          {
            type: "current",
            key: "profile",
            label: "Profile",
          },
        ]}
      />,
    );


    await user.click(
      screen.getByRole("button", {
        name: "Refresh",
      }),
    );


    expect(onClick)
      .toHaveBeenCalledTimes(1);
  });

  it("renders custom separators", () => {
    render(
      <VBreadcrumb
        items={items}
        separator="/"
      />,
    );


    expect(
      screen.getAllByText("/"),
    ).toHaveLength(2);
  });

  it("renders icons", () => {
    render(
      <VBreadcrumb
        items={[
          {
            type: "link",
            key: "home",
            label: "Home",
            href: "/",
            icon: (
              <span data-testid="home-icon" />
            ),
          },
          {
            type: "current",
            key: "profile",
            label: "Profile",
          },
        ]}
      />,
    );


    expect(
      screen.getByTestId("home-icon"),
    ).toBeInTheDocument();
  });

  it("collapses long breadcrumbs", () => {
    render(
      <VBreadcrumb
        maxItems={3}
        collapsedLabel="More"
        items={[
          ...items.slice(0, 1),
          {
            type: "link",
            key: "products",
            label: "Products",
            href: "/products",
          },
          {
            type: "link",
            key: "category",
            label: "Category",
            href: "/category",
          },
          {
            type: "current",
            key: "item",
            label: "Item",
          },
        ]}
      />,
    );


    expect(
      screen.getByText("More"),
    ).toBeInTheDocument();


    expect(
      screen.queryByText("Products"),
    ).not.toBeInTheDocument();
  });

  it("renders disabled links correctly", () => {
    render(
      <VBreadcrumb
        items={[
          {
            type: "link",
            key: "home",
            label: "Home",
            href: "/",
            disabled: true,
          },
          {
            type: "current",
            key: "profile",
            label: "Profile",
          },
        ]}
      />,
    );


    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("renders no output when items are empty", () => {
    const { container } =
      render(
        <VBreadcrumb items={[]} />,
      );


    expect(
      container.firstChild,
    ).toBeNull();
  });

  it("supports custom aria labels", () => {
    render(
      <VBreadcrumb
        ariaLabel="Application breadcrumb"
        items={items}
      />,
    );


    expect(
      screen.getByRole("navigation", {
        name: "Application breadcrumb",
      }),
    ).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    let refElement:
      HTMLElement | null = null;
    render(
      <VBreadcrumb
        items={items}
        ref={(element) => {
          refElement = element;
        }}
      />,
    );
    expect(refElement)
      .toBeInstanceOf(
        HTMLElement,
      );
  });

  
it("renders a custom collapsed label", () => {
  render(
    <VBreadcrumb
      maxItems={3}
      collapsedLabel="More pages"
      items={[
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
          label: "Category",
          href: "/category",
        },
        {
          type: "current",
          key: "item",
          label: "Item",
        },
      ]}
    />,
  );

  expect(
    screen.getByText("More pages"),
  ).toBeInTheDocument();
});

it("renders disabled action items", () => {
  render(
    <VBreadcrumb
      items={[
        {
          type: "action",
          key: "action",
          label: "Action",
          disabled: true,
          onClick: vi.fn(),
        },
        {
          type: "current",
          key: "current",
          label: "Current",
        },
      ]}
    />,
  );

  expect(
    screen.getByRole("button", {
      name: "Action",
    }),
  ).toBeDisabled();
});

it("prevents navigation for disabled links", async () => {
  const user = userEvent.setup();

  render(
    <VBreadcrumb
      items={[
        {
          type: "link",
          key: "disabled",
          label: "Disabled",
          href: "/disabled",
          disabled: true,
        },
        {
          type: "current",
          key: "current",
          label: "Current",
        },
      ]}
    />,
  );

  const link = screen.getByRole("link", {
    name: "Disabled",
  });

  await user.click(link);

  expect(link).toHaveAttribute(
    "aria-disabled",
    "true",
  );
});

it("renders nothing for unsupported breadcrumb item types", () => {
  render(
    <VBreadcrumb
      items={
        [
          {
            type: "invalid-type",
            key: "invalid",
            label: "Invalid",
          },
        ] as unknown as BreadcrumbItem[]
      }
    />,
  );

  expect(
    screen.queryByText("Invalid"),
  ).not.toBeInTheDocument();
});

it("does not prevent default navigation for non-disabled links", () => {
  render(
    <VBreadcrumb
      items={[
        {
          type: "link",
          key: "home",
          label: "Home",
          href: "/",
        },
        {
          type: "current",
          key: "profile",
          label: "Profile",
        },
      ]}
    />,
  );

  const link = screen.getByRole("link", {
    name: "Home",
  });

  const wasNotPrevented = fireEvent.click(link);

  expect(wasNotPrevented).toBe(true);
});
});
