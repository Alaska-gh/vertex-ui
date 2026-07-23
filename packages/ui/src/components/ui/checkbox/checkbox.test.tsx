import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VCheckbox } from "./checkbox";

describe("VCheckbox", () => {
  it("renders label", () => {
    render(<VCheckbox label="Accept Terms" />);
    expect(
        screen.getByText("Accept Terms")
    ).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
    <VCheckbox helperText="You must agree first" />
  );

  expect(
    screen.getByText("You must agree first")
  ).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
        <VCheckbox
        error
        errorMessage="Required"
        />
    );

    expect(
        screen.getByText("Required")
    ).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
    <VCheckbox
      label="Accept Terms"
      required
    />
  );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<VCheckbox disabled />);

    expect(
        screen.getByRole("checkbox")
    ).toBeDisabled();
  });

  it("toggles checked state", async () => {
    const user = userEvent.setup();

    render(<VCheckbox />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute(
        "data-state",
        "unchecked"
    );

    await user.click(checkbox);

    expect(checkbox).toHaveAttribute(
        "data-state",
        "checked"
    );
  });

  it("calls onCheckedChange", async () => {
    const user = userEvent.setup();

    const onCheckedChange = vi.fn();

    render(
        <VCheckbox
        onCheckedChange={onCheckedChange}
        />
    );

    await user.click(
        screen.getByRole("checkbox")
    );

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("supports controlled checked state", () => {
     render(<VCheckbox checked />);

    expect(
        screen.getByRole("checkbox")
    ).toHaveAttribute("data-state", "checked");
  });

  it("supports defaultChecked", () => {
     render(<VCheckbox defaultChecked />);

    expect(
        screen.getByRole("checkbox")
    ).toHaveAttribute("data-state", "checked");
  });

  it("links the label to the checkbox", () => {
     render(<VCheckbox defaultChecked />);

    expect(
        screen.getByRole("checkbox")
    ).toHaveAttribute("data-state", "checked");
  });

  it("renders error styles", () => {
      render(<VCheckbox error />);

    expect(
        screen.getByRole("checkbox")
    ).toHaveClass("data-[state=unchecked]:border-danger");
  });
});
