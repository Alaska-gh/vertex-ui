import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VTab } from "./tabs";

import type { TabItem } from "./tabs.types";

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

describe("VTabs", () => {
  it("renders all tab triggers", () => {
    render(<VTab items={items} />);

    expect(screen.getByRole("tab", { name: "Account" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Billing" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Advanced" })).toBeInTheDocument();
  });

  it("shows the first tab's content by default", () => {
    render(<VTab items={items} />);

    expect(screen.getByText("Account content")).toBeVisible();
  });

  it("switches content when a tab is clicked", async () => {
    const user = userEvent.setup();

    render(<VTab items={items} />);

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(await screen.findByText("Billing content")).toBeVisible();
  });

  it("respects defaultValue for uncontrolled usage", () => {
    render(<VTab items={items} defaultValue="billing" />);

    expect(screen.getByText("Billing content")).toBeVisible();
  });

  it("supports controlled value and onValueChange", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <VTab items={items} value="account" onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(onValueChange).toHaveBeenCalledWith("billing");
    expect(screen.getByText("Account content")).toBeVisible();
  });

  it("disables a tab marked as disabled", () => {
    render(<VTab items={items} />);

    expect(screen.getByRole("tab", { name: "Advanced" })).toBeDisabled();
  });

  it("does not switch to a disabled tab", async () => {
    const user = userEvent.setup();

    render(<VTab items={items} />);

    await user.click(screen.getByRole("tab", { name: "Advanced" }));

    expect(screen.getByText("Account content")).toBeVisible();
  });

  it("applies the pills variant to triggers", () => {
    render(<VTab items={items} variant="pills" />);

    expect(screen.getByRole("tab", { name: "Account" })).toHaveClass(
      "rounded-md",
    );
  });

  it("forwards ref", () => {
    let node: HTMLDivElement | null = null;

    render(
      <VTab
        items={items}
        ref={(el) => {
          node = el;
        }}
      />,
    );

    expect(node).toBeInstanceOf(HTMLDivElement);
  });
});