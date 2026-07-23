import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VSpinner } from "./spinner";


describe("VSpinner", () => {
  it("renders spinner", () => {
    render(
      <VSpinner />,
    );

    expect(
      screen.getByRole("status"),
    ).toBeInTheDocument();
  });


  it("uses default label", () => {
    render(
      <VSpinner />,
    );

    expect(
      screen.getByLabelText(
        "Loading",
      ),
    ).toBeInTheDocument();
  });


  it("supports custom label", () => {
    render(
      <VSpinner
        label="Saving"
      />,
    );

    expect(
      screen.getByLabelText(
        "Saving",
      ),
    ).toBeInTheDocument();
  });


  it("supports size variants", () => {
    render(
      <VSpinner
        size="lg"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass(
      "h-8",
      "w-8",
    );
  });


  it("supports color variants", () => {
    render(
      <VSpinner
        color="muted"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass(
      "text-muted-foreground",
    );
  });


  it("forwards className", () => {
    render(
      <VSpinner
        className="custom-class"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass(
      "custom-class",
    );
  });
});