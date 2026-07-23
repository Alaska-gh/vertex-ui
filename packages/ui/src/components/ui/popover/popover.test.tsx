import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VPopover } from "./popover";

const renderPopover = (
  props?: Partial<React.ComponentProps<typeof VPopover>>,
) =>
  render(
    <VPopover
      trigger={<button>Open</button>}
      {...props}
    >
      Popover content
    </VPopover>,
  );

describe("VPopover", () => {
  it("renders trigger", () => {
    renderPopover();

    expect(
      screen.getByRole("button", { name: /open/i }),
    ).toBeInTheDocument();
  });

  it("does not show content initially", () => {
    renderPopover();

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("shows content on trigger click", async () => {
    const user = userEvent.setup();

    renderPopover();

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(
      await screen.findByText("Popover content"),
    ).toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <VPopover trigger={<button>Open</button>}>Popover content</VPopover>
        <button>Outside</button>
      </div>,
    );

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(
      await screen.findByText("Popover content"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /outside/i }));

    expect(
      screen.queryByText("Popover content"),
    ).not.toBeInTheDocument();
  });

  it("renders on the correct side", async () => {
    const user = userEvent.setup();

    renderPopover({ side: "left" });

    await user.click(screen.getByRole("button", { name: /open/i }));

    const content = await screen.findByText("Popover content");

    expect(content.closest("[data-side]")).toHaveAttribute(
      "data-side",
      "left",
    );
  });

  it("supports controlled open state", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    renderPopover({ open: false, onOpenChange });

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("hides the arrow when showArrow is false", async () => {
    const user = userEvent.setup();

    const { container } = renderPopover({ showArrow: false });

    await user.click(screen.getByRole("button", { name: /open/i }));

    await screen.findByText("Popover content");

    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});