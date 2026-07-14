import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { FormField } from "./form-field";

describe("FormField", () => {
  it("renders label", () => {
    render(
      <FormField label="Username">
        <input />
      </FormField>
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <FormField helperText="Helpful text">
        <input />
      </FormField>
    );

    expect(screen.getByText("Helpful text")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <FormField
        error
        errorMessage="Something went wrong"
      >
        <input />
      </FormField>
    );

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <FormField label="Name" required>
        <input />
      </FormField>
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("associates label with input", () => {
    render(
      <FormField
        label="Username"
        htmlFor="username"
      >
        <input id="username" />
      </FormField>
    );

    expect(
      screen.getByLabelText("Username")
    ).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <FormField>
        <input data-testid="input" />
      </FormField>
    );

    expect(
      screen.getByTestId("input")
    ).toBeInTheDocument();
  });

  it("applies disabled styling", () => {
    render(
      <FormField
        label="Username"
        disabled
      >
        <input />
      </FormField>
    );

    expect(
      screen.getByText("Username")
    ).toHaveClass("opacity-50");
  });
});