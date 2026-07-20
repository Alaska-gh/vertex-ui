import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { VFormField } from "./form-field";

describe("VFormField", () => {
  it("renders label", () => {
    render(
      <VFormField label="Username">
        <input />
      </VFormField>
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <VFormField helperText="Helpful text">
        <input />
      </VFormField>
    );

    expect(screen.getByText("Helpful text")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <VFormField
        error
        errorMessage="Something went wrong"
      >
        <input />
      </VFormField>
    );

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <VFormField label="Name" required>
        <input />
      </VFormField>
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("associates label with input", () => {
    render(
      <VFormField
        label="Username"
        htmlFor="username"
      >
        <input id="username" />
      </VFormField>
    );

    expect(
      screen.getByLabelText("Username")
    ).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <VFormField>
        <input data-testid="input" />
      </VFormField>
    );

    expect(
      screen.getByTestId("input")
    ).toBeInTheDocument();
  });

  it("applies disabled styling", () => {
    render(
      <VFormField
        label="Username"
        disabled
      >
        <input />
      </VFormField>
    );

    expect(
      screen.getByText("Username")
    ).toHaveClass("opacity-50");
  });
});