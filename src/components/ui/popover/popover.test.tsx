import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { VButton } from "../button";
import { VPopover } from "./popover";


describe("VPopover", () => {
  it("renders trigger content", () => {
    render(
      <VPopover
        trigger={
          <VButton>
            Open
          </VButton>
        }
      >
        Content
      </VPopover>
    );

    expect(
      screen.getByText("Open")
    ).toBeInTheDocument();
  });


  it("opens when trigger is clicked", () => {
    render(
      <VPopover
        trigger={
          <VButton>
            Open
          </VButton>
        }
      >
        Popover Content
      </VPopover>
    );


    expect(
      screen.queryByText("Popover Content")
    ).not.toBeInTheDocument();


    fireEvent.click(
      screen.getByText("Open")
    );


    expect(
      screen.getByText("Popover Content")
    ).toBeInTheDocument();
  });


  it("closes when trigger is clicked again", () => {
    render(
      <VPopover
        trigger={
          <VButton>
            Open
          </VButton>
        }
      >
        Content
      </VPopover>
    );


    const trigger =
      screen.getByText("Open");


    fireEvent.click(trigger);

    expect(
      screen.getByText("Content")
    ).toBeInTheDocument();


    fireEvent.click(trigger);


    expect(
      screen.queryByText("Content")
    ).not.toBeInTheDocument();
  });


  it("renders content inside document body using portal", () => {
    render(
      <VPopover
        trigger={
          <VButton>
            Open
          </VButton>
        }
      >
        Portal Content
      </VPopover>
    );


    fireEvent.click(
      screen.getByText("Open")
    );


    const content =
      screen.getByText("Portal Content");


    expect(
      document.body.contains(content)
    ).toBe(true);
  });


  it("closes when clicking outside", () => {
    render(
      <>
        <VPopover
          trigger={
            <VButton>
              Open
            </VButton>
          }
        >
          Content
        </VPopover>

        <button>
          Outside
        </button>
      </>
    );


    fireEvent.click(
      screen.getByText("Open")
    );


    expect(
      screen.getByText("Content")
    ).toBeInTheDocument();


    fireEvent.mouseDown(
      screen.getByText("Outside")
    );


    expect(
      screen.queryByText("Content")
    ).not.toBeInTheDocument();
  });


  it("closes when Escape is pressed", () => {
    render(
      <VPopover
        trigger={
          <VButton>
            Open
          </VButton>
        }
      >
        Content
      </VPopover>
    );


    fireEvent.click(
      screen.getByText("Open")
    );


    expect(
      screen.getByText("Content")
    ).toBeInTheDocument();


    fireEvent.keyDown(
      document,
      {
        key: "Escape",
      }
    );


    expect(
      screen.queryByText("Content")
    ).not.toBeInTheDocument();
  });


  it("calls onOpenChange in controlled mode", () => {
    const onOpenChange =
      vi.fn();


    function ControlledPopover() {
      const [open, setOpen] =
        useState(false);


      return (
        <VPopover
          open={open}
          onOpenChange={(value) => {
            onOpenChange(value);
            setOpen(value);
          }}
          trigger={
            <VButton>
              Open
            </VButton>
          }
        >
          Content
        </VPopover>
      );
    }


    render(
      <ControlledPopover />
    );


    fireEvent.click(
      screen.getByText("Open")
    );


    expect(
      onOpenChange
    ).toHaveBeenCalledWith(true);
  });


  it("supports different placements", () => {
    render(
      <VPopover
        placement="right"
        trigger={
          <VButton>
            Open
          </VButton>
        }
      >
        Content
      </VPopover>
    );


    fireEvent.click(
      screen.getByText("Open")
    );


    const popover =
      screen.getByRole("dialog");


    expect(
      popover
    ).toBeInTheDocument();
  });
});