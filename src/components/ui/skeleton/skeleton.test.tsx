import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VSkeleton } from "./skeleton";

describe("VSkeleton", () => {
  it("renders skeleton", () => {
    render(<VSkeleton />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses default label", () => {
    render(<VSkeleton />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("supports custom label", () => {
    render(<VSkeleton label="Fetching profile" />);

    expect(screen.getByLabelText("Fetching profile")).toBeInTheDocument();
  });

  it("defaults to the rectangular variant", () => {
    render(<VSkeleton />);

    expect(screen.getByRole("status")).toHaveClass("rounded-md");
  });

  it("supports the circular variant", () => {
    render(<VSkeleton variant="circular" />);

    expect(screen.getByRole("status")).toHaveClass("rounded-full");
  });

  it("supports the text variant", () => {
    render(<VSkeleton variant="text" />);

    expect(screen.getByRole("status")).toHaveClass("rounded");
  });

  it("falls back to per-variant default dimensions", () => {
    render(<VSkeleton variant="circular" />);

    const skeleton = screen.getByRole("status");

    expect(skeleton).toHaveStyle({ width: "2.5rem", height: "2.5rem" });
  });

  it("applies custom width and height", () => {
    render(<VSkeleton width={200} height={20} />);

    const skeleton = screen.getByRole("status");

    expect(skeleton).toHaveStyle({ width: "200px", height: "20px" });
  });

  it("accepts string dimensions", () => {
    render(<VSkeleton width="60%" />);

    expect(screen.getByRole("status")).toHaveStyle({ width: "60%" });
  });

  it("forwards className", () => {
    render(<VSkeleton className="custom-class" />);

    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    let node: HTMLSpanElement | null = null;

    render(
      <VSkeleton
        ref={(el) => {
          node = el;
        }}
      />,
    );

    expect(node).toBeInstanceOf(HTMLSpanElement);
  });
});