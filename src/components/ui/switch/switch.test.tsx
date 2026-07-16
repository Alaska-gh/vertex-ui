import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { VSwitch } from "./switch";

describe("VSwitch", () => {
  it("renders label", () => {
    render(<VSwitch label="Enable notifications" />);

    expect(
      screen.getByText("Enable notifications"),
    ).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <VSwitch
        helperText="Receive email updates"
      />,
    );

    expect(
      screen.getByText("Receive email updates"),
    ).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <VSwitch
        error
        errorMessage="Required"
      />,
    );

    expect(
      screen.getByText("Required"),
    ).toBeInTheDocument();
  });

  it("renders checked state", () => {
    render(<VSwitch checked />);

    expect(
      screen.getByRole("switch"),
    ).toBeChecked();
  });

  it("renders unchecked state", () => {
    render(<VSwitch />);

    expect(
      screen.getByRole("switch"),
    ).not.toBeChecked();
  });

  it("calls onCheckedChange", async () => {
    const user = userEvent.setup();

    const handleChange = vi.fn();

    render(
      <VSwitch
        onCheckedChange={handleChange}
      />,
    );

    await user.click(
      screen.getByRole("switch"),
    );

    expect(handleChange).toHaveBeenCalledOnce();
    expect(handleChange).toHaveBeenCalledWith(
      true,
    );
  });

  it("supports controlled checked state", () => {
    render(<VSwitch checked />);

    expect(
      screen.getByRole("switch"),
    ).toBeChecked();
  });

  it("supports disabled state", () => {
    render(<VSwitch disabled />);

    expect(
      screen.getByRole("switch"),
    ).toBeDisabled();
  });
});