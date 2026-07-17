import { render, screen, fireEvent } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import { VModal } from "./modal";

describe("VModal", () => {
  const renderModal = (props = {}) => {
    const onOpenChange = vi.fn();

    render(
      <VModal
        open={true}
        onOpenChange={onOpenChange}
        title="Test Modal"
        description="Modal description"
        {...props}
      >
        Modal content
      </VModal>,
    );

    return {
      onOpenChange,
    };
  };

  it("renders modal when open", () => {
    renderModal();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <VModal open={false} onOpenChange={vi.fn()}>
        Hidden modal
      </VModal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title and description", () => {
    renderModal();

    expect(screen.getByText("Test Modal")).toBeInTheDocument();

    expect(screen.getByText("Modal description")).toBeInTheDocument();
  });

  it("closes when close button is clicked", () => {
    const { onOpenChange } = renderModal();

    fireEvent.click(
      screen.getByRole("button", {
        name: /close modal/i,
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when Escape key is pressed", () => {
    const { onOpenChange } = renderModal();

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when overlay is clicked", () => {
    const { onOpenChange } = renderModal();

    const overlay = document.querySelector(".bg-black\\/50");

    fireEvent.click(overlay!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close when overlay click is disabled", () => {
    const { onOpenChange } = renderModal({
      closeOnOverlayClick: false,
    });

    const overlay = document.querySelector(".bg-black\\/50");

    fireEvent.click(overlay!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("renders footer", () => {
    renderModal({
      footer: <button>Save</button>,
    });

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("applies size class", () => {
    renderModal({
      size: "lg",
    });

    expect(screen.getByRole("dialog")).toHaveClass("max-w-lg");
  });
});
