import { cleanup, render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { afterEach, describe, expect, it, vi } from "vitest";
import type React from "react";

import { VModal } from "./modal";

afterEach(() => {
  cleanup();
});

describe("VModal", () => {
  const renderModal = (
    props: Partial<React.ComponentProps<typeof VModal>> = {},
  ) => {
    const onOpenChange = vi.fn();

    render(
      <VModal
        open
        onOpenChange={onOpenChange}
        title="Test Modal"
        description="Modal description"
        {...props}
      >
        {props.children ?? "Modal content"}
      </VModal>,
    );

    return {
      onOpenChange,
    };
  };

  it("renders when open", () => {
    renderModal();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <VModal open={false} onOpenChange={vi.fn()}>
        Hidden content
      </VModal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title correctly", () => {
    renderModal();

    expect(
      screen.getByRole("heading", {
        name: "Test Modal",
      }),
    ).toBeInTheDocument();
  });

  it("renders description correctly", () => {
    renderModal();

    expect(screen.getByText("Modal description")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    renderModal();

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("closes from close button", async () => {
    const user = userEvent.setup();

    const { onOpenChange } = renderModal();

    await user.click(
      screen.getByRole("button", {
        name: /close modal/i,
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes with Escape key", async () => {
    const user = userEvent.setup();

    const { onOpenChange } = renderModal();

    await user.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close when escape is disabled", async () => {
    const user = userEvent.setup();

    const { onOpenChange } = renderModal({
      disableEscapeKey: true,
    });

    await user.keyboard("{Escape}");

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes when clicking overlay", async () => {
    const user = userEvent.setup();

    const { onOpenChange } = renderModal();

    const overlay = screen.getByTestId("modal-overlay");

    await user.click(overlay);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close when overlay closing is disabled", async () => {
    const user = userEvent.setup();

    const { onOpenChange } = renderModal({
      closeOnOverlayClick: false,
    });

    const overlay = screen.getByTestId("modal-overlay");

    await user.click(overlay);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("hides close button when disabled", () => {
    renderModal({
      showCloseButton: false,
    });

    expect(
      screen.queryByRole("button", {
        name: /close modal/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders footer content", () => {
    renderModal({
      footer: <button>Save</button>,
    });

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();
  });

  it("applies correct size styles", () => {
    renderModal({
      size: "lg",
    });

    expect(screen.getByRole("dialog")).toHaveClass("max-w-lg");
  });

  it("supports complex children", () => {
    renderModal({
      children: (
        <form>
          <input aria-label="username" />
        </form>
      ),
    });

    expect(screen.getByLabelText("username")).toBeInTheDocument();
  });

  it("does not render footer when not provided", () => {
  render(
    <VModal open>
      Content
    </VModal>
  );

  expect(
    screen.queryByRole("contentinfo")
  ).not.toBeInTheDocument();
});


it("does not render header when no title description or close button", () => {
  render(
    <VModal
      open
      onOpenChange={vi.fn()}
      showCloseButton={false}
    >
      Content
    </VModal>,
  );

  expect(
    screen.queryByTestId("modal-header"),
  ).not.toBeInTheDocument();
});

it("renders header when only title exists", () => {
  render(
    <VModal
      open
      onOpenChange={vi.fn()}
      title="Test Title"
    >
      Content
    </VModal>,
  );

  expect(screen.getByText("Test Title")).toBeInTheDocument();
});


it("renders header when only description exists", () => {
  render(
    <VModal
      open
      onOpenChange={vi.fn()}
      description="Test Description"
    >
      Content
    </VModal>,
  );

  expect(screen.getByText("Test Description")).toBeInTheDocument();
});


it("renders header when only close button exists", () => {
  render(
    <VModal
      open
      onOpenChange={vi.fn()}
      showCloseButton
    >
      Content
    </VModal>,
  );

  expect(
    screen.getByRole("button", {
      name: /close modal/i,
    }),
  ).toBeInTheDocument();
});

it("does not move focus into the dialog when disableAutoFocus is true", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Open modal";
    document.body.appendChild(trigger);
    trigger.focus();

    renderModal({
      disableAutoFocus: true,
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(trigger).toHaveFocus();

    document.body.removeChild(trigger);
  });

  it("moves focus into the dialog by default (sanity check for the test above)", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Open modal";
    document.body.appendChild(trigger);
    trigger.focus();

    renderModal();

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(trigger).not.toHaveFocus();

    document.body.removeChild(trigger);
  });
});
