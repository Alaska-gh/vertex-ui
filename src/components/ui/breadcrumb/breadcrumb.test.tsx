import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VBreadcrumb } from "./breadcrumb";

import type { BreadcrumbItem } from "./breadcrumb.types";

const items: BreadcrumbItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "settings", label: "Settings", href: "/settings" },
  { key: "profile", label: "Profile" },
];

describe("VBreadcrumb", () => {
  it("renders all items", () => {
    render(<VBreadcrumb items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders a nav with an accessible label", () => {
    render(<VBreadcrumb items={items} />);

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("renders non-last items as links with href", () => {
    render(<VBreadcrumb items={items} />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/settings",
    );
  });

  it("renders the last item as non-interactive text with aria-current", () => {
    render(<VBreadcrumb items={items} />);

    const current = screen.getByText("Profile");

    expect(current).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Profile" })).not.toBeInTheDocument();
  });

  it("renders a button instead of a link when href is omitted on a non-last item", () => {
    const onClick = vi.fn();

    render(
      <VBreadcrumb
        items={[
          { key: "home", label: "Home", onClick },
          { key: "profile", label: "Profile" },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
  });

  it("calls onClick when a non-last item is activated", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <VBreadcrumb
        items={[
          { key: "home", label: "Home", onClick },
          { key: "profile", label: "Profile" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Home" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders one separator fewer than the number of items", () => {
    const { container } = render(<VBreadcrumb items={items} />);

    expect(container.querySelectorAll("svg")).toHaveLength(items.length - 1);
  });

  it("renders a custom separator", () => {
    render(<VBreadcrumb items={items} separator="/" />);

    expect(screen.getAllByText("/")).toHaveLength(items.length - 1);
  });

  it("renders icons when provided", () => {
    render(
      <VBreadcrumb
        items={[
          { key: "home", label: "Home", href: "/", icon: <span data-testid="home-icon" /> },
          { key: "profile", label: "Profile" },
        ]}
      />,
    );

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("handles a single item with no separators", () => {
    const { container } = render(
      <VBreadcrumb items={[{ key: "home", label: "Home" }]} />,
    );

    expect(container.querySelectorAll("svg")).toHaveLength(0);
    expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
  });

  it("forwards ref to the nav element", () => {
    let node: HTMLElement | null = null;

    render(
      <VBreadcrumb
        items={items}
        ref={(el) => {
          node = el;
        }}
      />,
    );

    expect(node).toBeInstanceOf(HTMLElement);
  });
});