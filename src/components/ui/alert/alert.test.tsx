import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import { VAlert } from "./alert";


describe("VAlert", () => {
  it("renders alert", () => {
    render(
      <VAlert>
        Alert message
      </VAlert>,
    );

    expect(
      screen.getByRole("alert"),
    ).toBeInTheDocument();
  });


  it("renders title", () => {
    render(
      <VAlert
        title="Success"
      >
        Operation completed.
      </VAlert>,
    );


    expect(
      screen.getByText(
        "Success",
      ),
    ).toBeInTheDocument();


    expect(
      screen.getByText(
        "Operation completed.",
      ),
    ).toBeInTheDocument();
  });


  it("supports variants", () => {
    render(
      <VAlert
        variant="success"
      >
        Success message
      </VAlert>,
    );


    expect(
      screen.getByRole("alert"),
    ).toHaveClass(
      "bg-success",
    );
  });


  it("renders icon", () => {
    render(
      <VAlert
        icon={<span data-testid="icon" />}
      >
        Message
      </VAlert>,
    );


    expect(
      screen.getByTestId(
        "icon",
      ),
    ).toBeInTheDocument();
  });


  it("renders dismiss button when dismissible", () => {
    const onDismiss = vi.fn();


    render(
      <VAlert
        dismissible
        onDismiss={onDismiss}
      >
        Message
      </VAlert>,
    );


    const button =
      screen.getByRole(
        "button",
        {
          name: /dismiss alert/i,
        },
      );


    expect(
      button,
    ).toBeInTheDocument();


    fireEvent.click(button);


    expect(
      onDismiss,
    ).toHaveBeenCalledTimes(1);
  });


  it("forwards className", () => {
    render(
      <VAlert
        className="custom-class"
      >
        Message
      </VAlert>,
    );


    expect(
      screen.getByRole("alert"),
    ).toHaveClass(
      "custom-class",
    );
  });
});