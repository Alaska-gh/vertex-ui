import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VDivider } from "./divider";

describe("VDivider", () => {
  it("renders a horizontal divider by default", () => {
    const { container } = render(<VDivider />);

    expect(container.firstChild).toHaveClass("w-full");
  });

  it("renders a vertical divider", () => {
    const { container } = render(<VDivider orientation="vertical" />);

    expect(container.firstChild).toHaveClass("h-full");
  });

  it("is hidden from the accessibility tree by default", () => {
    render(<VDivider data-testid="divider" />);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("exposes role=separator when not decorative", () => {
    render(<VDivider decorative={false} />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders a label between two line segments", () => {
    render(<VDivider label="OR" />);

    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("exposes an accessible separator role on the labeled wrapper when not decorative", () => {
    render(<VDivider label="OR" decorative={false} />);

    const separator = screen.getByRole("separator");

    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    expect(separator).toHaveTextContent("OR");
  });

  it("ignores label for vertical orientation", () => {
    render(<VDivider orientation="vertical" label="OR" />);

    expect(screen.queryByText("OR")).not.toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<VDivider className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    let node: HTMLDivElement | null = null;

    render(
      <VDivider
        ref={(el) => {
          node = el;
        }}
      />,
    );

    expect(node).toBeInstanceOf(HTMLDivElement);
  });
});