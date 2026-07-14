import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { VButton } from "./button";


describe("VButton", () => {

  it("renders correctly", () => {
    render(
      <VButton>
        Click me
      </VButton>
    );

    expect(
      screen.getByRole("button", {
        name: "Click me",
      })
    ).toBeInTheDocument();
  });


  it("fires click event", async () => {
    const user = userEvent.setup();

    const handleClick = vi.fn();

    render(
      <VButton onClick={handleClick}>
        Click
      </VButton>
    );


    await user.click(
      screen.getByRole("button")
    );


    expect(handleClick)
      .toHaveBeenCalledOnce();

  });


  it("does not fire click when disabled", async () => {
    const user = userEvent.setup();

    const handleClick = vi.fn();


    render(
      <VButton
        disabled
        onClick={handleClick}
      >
        Disabled
      </VButton>
    );


    await user.click(
      screen.getByRole("button")
    );


    expect(handleClick)
      .not
      .toHaveBeenCalled();

  });



  it("does not fire click while loading", async () => {

    const user = userEvent.setup();

    const handleClick = vi.fn();


    render(
      <VButton
        loading
        onClick={handleClick}
      >
        Save
      </VButton>
    );


    const button =
      screen.getByRole("button");


    await user.click(button);


    expect(handleClick)
      .not
      .toHaveBeenCalled();


  });



  it("shows loading state", () => {

    render(
      <VButton loading>
        Save
      </VButton>
    );


    expect(
      screen.getByRole("button")
    )
    .toHaveAttribute(
      "aria-busy",
      "true"
    );

  });



  it("renders left icon", () => {

    render(
      <VButton
        leftIcon={<span data-testid="left-icon" />}
      >
        Add
      </VButton>
    );


    expect(
      screen.getByTestId("left-icon")
    )
    .toBeInTheDocument();

  });



  it("renders right icon", () => {

    render(
      <VButton
        rightIcon={<span data-testid="right-icon" />}
      >
        Next
      </VButton>
    );


    expect(
      screen.getByTestId("right-icon")
    )
    .toBeInTheDocument();

  });



  it("supports full width", () => {

    render(
      <VButton fullWidth>
        Full
      </VButton>
    );


    expect(
      screen.getByRole("button")
    )
    .toHaveClass("w-full");

  });



  it("supports icon-only buttons", () => {

    render(
      <VButton
        size="icon"
        aria-label="Settings"
      >
        ⚙
      </VButton>
    );


    expect(
      screen.getByRole("button", {
        name: "Settings",
      })
    )
    .toBeInTheDocument();

  });


});