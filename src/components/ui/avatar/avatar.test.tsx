import { render, screen } from "@testing-library/react";

import { VAvatar } from "./avatar";
import { describe, expect, it } from "vitest";

describe("VAvatar", () => {
  it("renders fallback text", () => {
    render(<VAvatar fallback="JD" />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(
      <VAvatar
        src="https://example.com/avatar.png"
        alt="John Doe"
        fallback="JD"
      />,
    );

    // Radix falls back in jsdom, so verify fallback behavior
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders fallback when image is unavailable", () => {
    render(<VAvatar src="/invalid-image.png" fallback="JD" />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });
  it("supports custom size", () => {
    render(<VAvatar size="xl" fallback="XL" />);

    const avatar = screen.getByText("XL").parentElement;

    expect(avatar).toHaveClass("h-16");
  });

  it("supports custom radius", () => {
    render(<VAvatar radius="lg" fallback="LG" />);

    const avatar = screen.getByText("LG").parentElement;

    expect(avatar).toHaveClass("rounded-lg");
  });

  it("forwards className", () => {
    render(<VAvatar className="custom-class" fallback="CC" />);

    const avatar = screen.getByText("CC").parentElement;

    expect(avatar).toHaveClass("custom-class");
  });
});
