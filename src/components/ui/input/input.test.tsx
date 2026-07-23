import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { VInput } from "./input";


describe("VInput", () => {

  it("renders correctly", () => {
    render(
      <VInput placeholder="Enter text" />
    );

    expect(
      screen.getByPlaceholderText("Enter text")
    ).toBeInTheDocument();
  });


  it("renders label", () => {
    render(
      <VInput label="Username" />
    );

    expect(
      screen.getByText("Username")
    ).toBeInTheDocument();
  });


  it("shows helper text", () => {
    render(
      <VInput helperText="Enter your username" />
    );

    expect(
      screen.getByText("Enter your username")
    ).toBeInTheDocument();
  });


  it("shows error message", () => {
    render(
      <VInput
        error
        errorMessage="Invalid email"
      />
    );

    expect(
      screen.getByText("Invalid email")
    ).toBeInTheDocument();
  });


  it("fires change event", () => {

    const handleChange = vi.fn();

    render(
      <VInput
        onChange={handleChange}
      />
    );


    fireEvent.change(
      screen.getByRole("textbox"),
      {
        target: {
          value: "hello",
        },
      }
    );


    expect(handleChange)
      .toHaveBeenCalled();
  });


  it("supports disabled state", () => {

    render(
      <VInput disabled />
    );


    expect(
      screen.getByRole("textbox")
    )
    .toBeDisabled();

  });


  it("renders left icon", () => {

    render(
      <VInput
        leftIcon={<span>icon</span>}
      />
    );


    expect(
      screen.getByText("icon")
    )
    .toBeInTheDocument();

  });

  it("renders right icon and applies right padding", () => {
  render(
    <VInput
      rightIcon={<span data-testid="right-icon">icon</span>}
    />,
  );

  const input = screen.getByRole("textbox");

  expect(
    screen.getByTestId("right-icon"),
  ).toBeInTheDocument();

  expect(input).toHaveClass("pr-10");
});
});