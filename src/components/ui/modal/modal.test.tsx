import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { VModal } from "./modal";


describe("VModal", () => {

  const renderModal = (
    props = {},
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
        Modal content
      </VModal>,
    );

    return {
      onOpenChange,
    };
  };


  it("renders when open", () => {

    renderModal();

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();


    expect(
      screen.getByText("Modal content"),
    ).toBeInTheDocument();

  });



  it("does not render when closed", () => {

    render(
      <VModal
        open={false}
        onOpenChange={vi.fn()}
      >
        Hidden content
      </VModal>,
    );


    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();

  });



  it("renders title correctly", () => {

    renderModal();


    expect(
      screen.getByRole(
        "heading",
        {
          name: "Test Modal",
        },
      ),
    ).toBeInTheDocument();

  });



  it("renders description correctly", () => {

    renderModal();


    expect(
      screen.getByText(
        "Modal description",
      ),
    ).toBeInTheDocument();

  });



  it("has correct accessibility attributes", () => {

    renderModal();


    const dialog =
      screen.getByRole("dialog");


    expect(dialog)
      .toHaveAttribute(
        "aria-modal",
        "true",
      );

  });



  it("closes from close button", async () => {

    const user = userEvent.setup();


    const {
      onOpenChange,
    } = renderModal();


    await user.click(
      screen.getByRole(
        "button",
        {
          name: /close modal/i,
        },
      ),
    );


    expect(
      onOpenChange,
    )
      .toHaveBeenCalledWith(false);

  });



  it("closes with Escape key", async () => {

    const user = userEvent.setup();


    const {
      onOpenChange,
    } = renderModal();


    await user.keyboard(
      "{Escape}",
    );


    expect(
      onOpenChange,
    )
      .toHaveBeenCalledWith(false);

  });



  it("does not close when escape is disabled", async () => {

    const user = userEvent.setup();


    const {
      onOpenChange,
    } = renderModal({
      disableEscapeKey: true,
    });


    await user.keyboard(
      "{Escape}",
    );


    expect(
      onOpenChange,
    )
      .not
      .toHaveBeenCalled();

  });



  it("closes when clicking overlay", async () => {

    const user = userEvent.setup();


    const {
      onOpenChange,
    } = renderModal();


    const overlay =
      document.querySelector(
        "[data-radix-dialog-overlay]",
      );


    await user.click(
      overlay!,
    );


    expect(
      onOpenChange,
    )
      .toHaveBeenCalledWith(false);

  });



  it("does not close when overlay closing is disabled", async () => {

    const user = userEvent.setup();


    const {
      onOpenChange,
    } = renderModal({
      closeOnOverlayClick:false,
    });


    const overlay =
      document.querySelector(
        "[data-radix-dialog-overlay]",
      );


    await user.click(
      overlay!,
    );


    expect(
      onOpenChange,
    )
      .not
      .toHaveBeenCalled();

  });



  it("hides close button when disabled", () => {

    renderModal({
      showCloseButton:false,
    });


    expect(
      screen.queryByRole(
        "button",
        {
          name:/close modal/i,
        },
      ),
    )
      .not
      .toBeInTheDocument();

  });



  it("renders footer content", () => {

    renderModal({
      footer:
        <button>
          Save
        </button>,
    });


    expect(
      screen.getByRole(
        "button",
        {
          name:"Save",
        },
      ),
    )
      .toBeInTheDocument();

  });



  it("applies correct size styles", () => {

    renderModal({
      size:"lg",
    });


    expect(
      screen.getByRole(
        "dialog",
      ),
    )
      .toHaveClass(
        "max-w-lg",
      );

  });



  it("supports complex children", () => {

    renderModal({
      children:
        <form>
          <input
            aria-label="username"
          />
        </form>,
    });


    expect(
      screen.getByLabelText(
        "username",
      ),
    )
      .toBeInTheDocument();

  });

});