import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { VBadge } from "./badge";

describe("VBadge", () => {
  it("renders children", () => {
    render(<VBadge>Active</VBadge>);

    expect(
      screen.getByText("Active"),
    ).toBeInTheDocument();
  });

  it("applies the success variant", () => {
    render(
      <VBadge variant="success">
        Success
      </VBadge>,
    );

    expect(
      screen.getByText("Success"),
    ).toHaveClass("bg-success");
  });

  it("applies the small size", () => {
    render(
      <VBadge size="sm">
        Small
      </VBadge>,
    );

    expect(
      screen.getByText("Small"),
    ).toHaveClass("h-5");
  });

  it("merges custom className", () => {
    render(
      <VBadge className="custom-class">
        Badge
      </VBadge>,
    );

    expect(
      screen.getByText("Badge"),
    ).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <VBadge ref={ref}>
        Badge
      </VBadge>,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLSpanElement,
    );
  });
});