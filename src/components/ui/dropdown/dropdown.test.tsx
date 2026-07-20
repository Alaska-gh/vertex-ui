import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { VDropdown } from "./dropdown";

import type { DropdownItem } from "./dropdown.types";

const renderDropdown = (items: DropdownItem[], props = {}) =>
  render(
    <VDropdown
      trigger={<button>Open</button>}

      items={items}

      {...props}
    />,
  );

describe("VDropdown", () => {
  it("renders trigger", () => {
    renderDropdown([
      {
        type: "item",
        key: "edit",
        label: "Edit",
      },
    ]);

    expect(
      screen.getByRole("button", {
        name: /open/i,
      }),
    ).toBeInTheDocument();
  });

  it("does not render menu before opening", () => {
    renderDropdown([
      {
        type: "item",
        key: "edit",
        label: "Edit",
      },
    ]);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens menu when trigger is clicked", async () => {
    const user = userEvent.setup();

    renderDropdown([
      {
        type: "item",
        key: "edit",
        label: "Edit",
      },

      {
        type: "item",
        key: "duplicate",
        label: "Duplicate",
      },
    ]);

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    expect(await screen.findByText("Edit")).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();

    renderDropdown([
      {
        type: "item",
        key: "edit",
        label: "Edit",
      },

      {
        type: "item",
        key: "duplicate",
        label: "Duplicate",
      },
    ]);

    const trigger = screen.getByRole("button", {
      name: /open/i,
    });

    await user.click(trigger);

    await user.keyboard("{ArrowDown}");

    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("closes with Escape key", async () => {
    const user = userEvent.setup();

    renderDropdown([
      {
        type: "item",
        key: "edit",
        label: "Edit",
      },
    ]);

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    await user.keyboard("{Escape}");

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("calls onSelect when item is selected", async () => {
    const user = userEvent.setup();

    const onSelect = vi.fn();

    renderDropdown([
      {
        type: "item",
        key: "edit",
        label: "Edit",
        onSelect,
      },
    ]);

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    await user.click(await screen.findByText("Edit"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("does not trigger disabled items", async () => {
    const user = userEvent.setup();

    const onSelect = vi.fn();

    renderDropdown([
      {
        type: "item",
        key: "share",
        label: "Share",
        disabled: true,
        onSelect,
      },
    ]);

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    const item = await screen.findByText("Share");

    await user.click(item);

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders labels correctly", async () => {
    const user = userEvent.setup();

    renderDropdown([
      {
        type: "label",
        key: "section",
        label: "Section",
      },

      {
        type: "item",
        key: "edit",
        label: "Edit",
      },
    ]);

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    const label = await screen.findByText("Section");

    expect(label).toBeInTheDocument();

    expect(label.closest("[role='menuitem']")).toBeNull();
  });

  it("supports destructive variant", async () => {
    const user = userEvent.setup();

    renderDropdown([
      {
        type: "item",
        key: "delete",
        label: "Delete",
        variant: "destructive",
      },
    ]);

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    expect(await screen.findByText("Delete")).toHaveClass("text-danger");
  });

  it("supports controlled state", async () => {
    const user = userEvent.setup();

    const onOpenChange = vi.fn();

    render(
      <VDropdown
        open={false}

        onOpenChange={onOpenChange}

        trigger={<button>Open</button>}

        items={[
          {
            type: "item",
            key: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("forwards ref to dropdown content", async () => {
    let refElement: HTMLElement | null = null;

    const user = userEvent.setup();

    render(
      <VDropdown
        ref={(element) => {
          refElement = element;
        }}

        trigger={<button>Open</button>}

        items={[
          {
            type: "item",
            key: "edit",
            label: "Edit",
          },
        ]}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /open/i,
      }),
    );

    await screen.findByText("Edit");

    expect(refElement).not.toBeNull();
  });
});