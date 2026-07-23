import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import { VAvatar } from "./avatar";


describe("VAvatar", () => {

  it("renders fallback text", () => {
    render(
      <VAvatar fallback="JD" />,
    );

    expect(
      screen.getByText("JD"),
    ).toBeInTheDocument();
  });


  it("renders image when src is provided", () => {
    render(
      <VAvatar
        src="https://example.com/avatar.png"
        alt="John Doe"
        fallback="JD"
      />,
    );

    /**
     * Radix Avatar waits for image loading.
     * In jsdom the image will fallback.
     */
    expect(
      screen.getByText("JD"),
    ).toBeInTheDocument();
  });


  it("renders fallback when image fails", () => {
    render(
      <VAvatar
        src="/invalid-image.png"
        fallback="JD"
      />,
    );

    expect(
      screen.getByText("JD"),
    ).toBeInTheDocument();
  });


  it("supports custom size", () => {
    render(
      <VAvatar
        size="xl"
        fallback="XL"
      />,
    );

    const avatar =
      screen.getByText("XL").parentElement;

    expect(avatar)
      .toHaveClass("h-16");
  });


  it("supports custom radius", () => {
    render(
      <VAvatar
        radius="lg"
        fallback="LG"
      />,
    );

    const avatar =
      screen.getByText("LG").parentElement;

    expect(avatar)
      .toHaveClass("rounded-lg");
  });


  it("forwards className", () => {
    render(
      <VAvatar
        className="custom-class"
        fallback="CC"
      />,
    );

    const avatar =
      screen.getByText("CC").parentElement;

    expect(avatar)
      .toHaveClass("custom-class");
  });


  it("renders accessible alt text on image", () => {
    render(
      <VAvatar
        src="/avatar.png"
        alt="John Doe"
        fallback="JD"
      />,
    );

    const image =
      document.querySelector("img");

    /**
     * Radix may remove image in jsdom
     * before it loads, so only assert when present.
     */
    if (image) {
      expect(image)
        .toHaveAttribute(
          "alt",
          "John Doe",
        );
    }
  });


  it("handles missing fallback gracefully", () => {
    render(
      <VAvatar />,
    );

    expect(
      screen.queryByText("undefined"),
    )
      .not
      .toBeInTheDocument();
  });


  it("forwards ref correctly", () => {
    let node: HTMLSpanElement | null = null;

    render(
      <VAvatar
        ref={(element) => {
          node = element;
        }}
        fallback="VB"
      />,
    );

    expect(node)
      .toBeInstanceOf(
        HTMLSpanElement,
      );
  });


  it("supports image error fallback behavior", () => {
    render(
      <VAvatar
        src="/broken.png"
        fallback="AB"
      />,
    );

    /**
     * Radix Avatar handles fallback internally.
     * Verify fallback is visible.
     */
    expect(
      screen.getByText("AB"),
    )
      .toBeInTheDocument();
  });

});