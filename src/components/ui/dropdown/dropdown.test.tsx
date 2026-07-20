import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VDropdown } from "./dropdown";

import type { DropdownItem } from "./dropdown.types";

const renderDropdown = (items: DropdownItem[]) =>
  render(<VDropdown trigger={<button>Open</button>} items={items} />);

describe("VDropdown", () => {
  it("renders the trigger", () => {
    renderDropdown([{ type: "item", key: "edit", label: "Edit" }]);

    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
  });

  it("does not show menu items initially", () => {
    renderDropdown([{ type: "item", key: "edit", label: "Edit" }]);

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("shows menu items after clicking the trigger", async () => {
    const user = userEvent.setup();

    renderDropdown([
      { type: "item", key: "edit", label: "Edit" },
      { type: "item", key: "duplicate", label: "Duplicate" },
    ]);

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(await screen.findByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Duplicate")).toBeInTheDocument();
  });

  it("calls onSelect when an item is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    renderDropdown([{ type: "item", key: "edit", label: "Edit", onSelect }]);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(await screen.findByText("Edit"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("closes the menu after selecting an item", async () => {
    const user = userEvent.setup();

    renderDropdown([{ type: "item", key: "edit", label: "Edit" }]);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(await screen.findByText("Edit"));

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("does not call onSelect for a disabled item", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    renderDropdown([
      { type: "item", key: "share", label: "Share", disabled: true, onSelect },
    ]);

    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(await screen.findByText("Share"));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders a label as non-interactive text", async () => {
    const user = userEvent.setup();

    renderDropdown([
      { type: "label", key: "section", label: "Section" },
      { type: "item", key: "edit", label: "Edit" },
    ]);

    await user.click(screen.getByRole("button", { name: /open/i }));

    const label = await screen.findByText("Section");

    expect(label).toBeInTheDocument();
    expect(label.closest("[role='menuitem']")).toBeNull();
  });

  it("applies destructive styling to a destructive item", async () => {
    const user = userEvent.setup();

    renderDropdown([
      { type: "item", key: "delete", label: "Delete", destructive: true },
    ]);

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(await screen.findByText("Delete")).toHaveClass("text-danger");
  });

  it("supports controlled open state", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <VDropdown
        open={false}
        onOpenChange={onOpenChange}
        trigger={<button>Open</button>}
        items={[{ type: "item", key: "edit", label: "Edit" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("forwards ref to the content element", async () => {
    let node: HTMLDivElement | null = null;
    const user = userEvent.setup();

    render(
      <VDropdown
        ref={(el) => {
          node = el;
        }}
        trigger={<button>Open</button>}
        items={[{ type: "item", key: "edit", label: "Edit" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: /open/i }));
    await screen.findByText("Edit");

    expect(node).toBeInstanceOf(HTMLDivElement);
  });
});