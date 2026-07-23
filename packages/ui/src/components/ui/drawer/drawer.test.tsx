import { fireEvent, render, screen } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import { VDrawer } from "./drawer";

describe("VDrawer", () => {
  it("renders drawer content when open", () => {
    render(
      <VDrawer open={true} onOpenChange={() => {}} title="Settings">
        Drawer Content
      </VDrawer>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Settings")).toBeInTheDocument();

    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <VDrawer open={false} onOpenChange={() => {}}>
        Content
      </VDrawer>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when close button is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <VDrawer open={true} onOpenChange={onOpenChange} title="Profile">
        Content
      </VDrawer>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /close drawer/i,
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when overlay is clicked", () => {
    const onOpenChange = vi.fn();

    render(
      <VDrawer open={true} onOpenChange={onOpenChange}>
        Content
      </VDrawer>,
    );

    const overlay = screen.getByTestId("drawer-overlay");

    fireEvent.click(overlay!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not close when overlay click is disabled", () => {
    const onOpenChange = vi.fn();

    render(
      <VDrawer
        open={true}
        onOpenChange={onOpenChange}
        closeOnOverlayClick={false}
      >
        Content
      </VDrawer>,
    );

    const overlay = screen.getByTestId("drawer-overlay");

    fireEvent.click(overlay!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("closes when Escape key is pressed", () => {
    const onOpenChange = vi.fn();

    render(
      <VDrawer open={true} onOpenChange={onOpenChange}>
        Content
      </VDrawer>,
    );

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders footer content", () => {
    render(
      <VDrawer
        open={true}
        onOpenChange={() => {}}
        footer={<button>Save</button>}
      >
        Content
      </VDrawer>,
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("supports different drawer sides", () => {
    render(
      <VDrawer open={true} onOpenChange={() => {}} side="left">
        Content
      </VDrawer>,
    );

    expect(screen.getByRole("dialog")).toHaveClass("left-0");
  });

  it("does not close when another key is pressed", () => {
  const onOpenChange = vi.fn();

  render(
    <VDrawer
      open={true}
      onOpenChange={onOpenChange}
    >
      Content
    </VDrawer>,
  );

  fireEvent.keyDown(document, {
    key: "Enter",
  });

  expect(onOpenChange).not.toHaveBeenCalled();
});

it("applies right side styles", () => {
  render(
    <VDrawer
      open={true}
      onOpenChange={() => {}}
      side="right"
    >
      Content
    </VDrawer>,
  );

  expect(screen.getByRole("dialog"))
    .toHaveClass("rounded-l-2xl");
});


it("applies top side styles", () => {
  render(
    <VDrawer
      open={true}
      onOpenChange={() => {}}
      side="top"
    >
      Content
    </VDrawer>,
  );

  expect(screen.getByRole("dialog"))
    .toHaveClass("rounded-b-2xl");
});


it("applies bottom side styles", () => {
  render(
    <VDrawer
      open={true}
      onOpenChange={() => {}}
      side="bottom"
    >
      Content
    </VDrawer>,
  );

  expect(screen.getByRole("dialog"))
    .toHaveClass("rounded-t-2xl");
});

it("renders description when provided", () => {
  render(
    <VDrawer
      open={true}
      onOpenChange={() => {}}
      title="Settings"
      description="Manage your preferences"
    >
      Content
    </VDrawer>,
  );

  expect(
    screen.getByText("Manage your preferences"),
  ).toBeInTheDocument();
});
});
