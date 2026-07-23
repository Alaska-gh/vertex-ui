import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VProgress } from "./progress";

describe("VProgress", () => {
  it("renders progress bar", () => {
    render(<VProgress value={50} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets correct progress value", () => {
    render(<VProgress value={50} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuenow", "50");
  });

  it("uses custom max value", () => {
    render(<VProgress value={25} max={50} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuemax", "50");
  });

  it("renders label", () => {
    render(<VProgress value={70} label="Uploading" />);

    expect(screen.getByText("Uploading")).toBeInTheDocument();
  });

  it("renders value when showValue is true", () => {
    render(<VProgress value={80} showValue />);

    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("supports striped variant", () => {
    render(<VProgress value={40} striped />);

    const indicator = screen.getByTestId("progress-indicator");

    expect(indicator).toHaveClass("bg-[length:1rem_1rem]");
  });

  it("supports animated variant", () => {
    render(<VProgress value={40} animated />);

    const indicator = screen.getByTestId("progress-indicator");

    expect(indicator).toHaveClass("animate-pulse");
  });

  it("forwards className", () => {
    render(<VProgress value={40} className="custom-class" />);

    expect(screen.getByRole("progressbar")).toHaveClass("custom-class");
  });
});
