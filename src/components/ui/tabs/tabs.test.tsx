import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VTabs} from "./tabs";

import type { TabItem } from "./tabs.types";
import { User } from "lucide-react";

const items: TabItem[] = [
  { value: "account", label: "Account", content: <p>Account content</p> },
  { value: "billing", label: "Billing", content: <p>Billing content</p> },
  {
    value: "advanced",
    label: "Advanced",
    disabled: true,
    content: <p>Advanced content</p>,
  },
];

describe("VTabss", () => {
  it("renders all tab triggers", () => {
    render(<VTabs items={items} />);

    expect(screen.getByRole("tab", { name: "Account" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Billing" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Advanced" })).toBeInTheDocument();
  });

  it("shows the first tab's content by default", () => {
    render(<VTabs items={items} />);

    expect(screen.getByText("Account content")).toBeVisible();
  });

  it("switches content when a tab is clicked", async () => {
    const user = userEvent.setup();

    render(<VTabs items={items} />);

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(await screen.findByText("Billing content")).toBeVisible();
  });

  it("respects defaultValue for uncontrolled usage", () => {
    render(<VTabs items={items} defaultValue="billing" />);

    expect(screen.getByText("Billing content")).toBeVisible();
  });

  it("supports controlled value and onValueChange", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <VTabs items={items} value="account" onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(onValueChange).toHaveBeenCalledWith("billing");
    expect(screen.getByText("Account content")).toBeVisible();
  });

  it("disables a tab marked as disabled", () => {
    render(<VTabs items={items} />);

    expect(screen.getByRole("tab", { name: "Advanced" })).toBeDisabled();
  });

  it("does not switch to a disabled tab", async () => {
    const user = userEvent.setup();

    render(<VTabs items={items} />);

    await user.click(screen.getByRole("tab", { name: "Advanced" }));

    expect(screen.getByText("Account content")).toBeVisible();
  });

  it("applies the pills variant to triggers", () => {
    render(<VTabs items={items} variant="pills" />);

    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass(
      "rounded-md",
    );
  });

  it("forwards ref", () => {
    let node: HTMLDivElement | null = null;

    render(
      <VTabs
        items={items}
        ref={(el) => {
          node = el;
        }}
      />,
    );

    expect(node).toBeInstanceOf(HTMLDivElement);
  });

  it("renders vertical orientation correctly", () => {
  render(
    <VTabs
      items={items}
      orientation="vertical"
    />,
  );

  const tabsRoot = screen.getByRole("tablist").parentElement;

  expect(tabsRoot).toHaveClass(
    "flex",
    "gap-6",
  );
});


it("handles undefined orientation by using default behavior", () => {
  render(
    <VTabs
      items={items}
      orientation={undefined}
    />,
  );

  const tabsRoot = screen.getByRole("tablist").parentElement;

  expect(tabsRoot).toHaveClass(
    "flex",
    "flex-col",
    "gap-4",
  );
});

it("uses provided defaultValue instead of the first item", () => {
  render(<VTabs items={items} defaultValue="billing" />);

  expect(screen.getByText("Billing content")).toBeVisible();
  expect(screen.queryByText("Account content")).not.toBeInTheDocument();
});

it("renders tab icons when provided", () => {
  const itemsWithIcon: TabItem[] = [
    {
      value: "profile",
      label: "Profile",
      icon: <User data-testid="profile-icon" />,
      content: <p>Profile content</p>,
    },
  ];

  render(<VTabs items={itemsWithIcon} />);

  expect(screen.getByTestId("profile-icon")).toBeInTheDocument();
});

it("renders safely when items array is empty", () => {
  expect(() => {
    render(<VTabs items={[]} />);
  }).not.toThrow();
});
it("handles empty items without a default value", () => {
  render(<VTabs items={[]} />);

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("uses the first item value when defaultValue is undefined", () => {
  render(
    <VTabs
      items={items}
      defaultValue={undefined}
    />,
  );

  expect(screen.getByText("Account content")).toBeVisible();
});

it("does not set an initial value when items are empty", () => {
  render(<VTabs items={[]} />);

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("uses first tab value when no defaultValue is provided", () => {
  render(<VTabs items={items} />);

  expect(screen.getByRole("tab", { name: "Account" }))
    .toHaveAttribute("data-state", "active");

  expect(screen.getByText("Account content")).toBeVisible();
});

it("uses first item when defaultValue is explicitly undefined", () => {
  const props = {
    items,
    defaultValue: undefined,
  };

  render(<VTabs {...props} />);

  expect(screen.getByText("Account content")).toBeVisible();
});
});