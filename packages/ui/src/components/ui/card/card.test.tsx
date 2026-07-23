import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { VCard } from "./card";

describe("VCard", () => {
  it("renders children", () => {
    render(<VCard>Card body</VCard>);

    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <VCard title="Card title" description="Card description">
        Body
      </VCard>,
    );

    expect(screen.getByText("Card title")).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
  });

  it("does not render a header when no header props are given", () => {
    const { container } = render(<VCard>Body only</VCard>);

    expect(container.querySelector("h3")).not.toBeInTheDocument();
  });

  it("renders the icon and actions slots", () => {
    render(
      <VCard
        icon={<span data-testid="icon">icon</span>}
        actions={<button>Menu</button>}
        title="Title"
      >
        Body
      </VCard>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<VCard footer={<button>Confirm</button>}>Body</VCard>);

    expect(
      screen.getByRole("button", { name: /confirm/i }),
    ).toBeInTheDocument();
  });

  it("does not render a footer when none is given", () => {
    const { container } = render(<VCard>Body</VCard>);

    expect(container.querySelector(".border-t")).not.toBeInTheDocument();
  });

  it("applies the elevated variant", () => {
    const { container } = render(
      <VCard variant="elevated">Elevated body</VCard>,
    );

    expect(container.firstChild).toHaveClass("shadow-lg");
  });

  it("applies the outlined variant", () => {
    const { container } = render(
      <VCard variant="outlined">Outlined body</VCard>,
    );

    expect(container.firstChild).toHaveClass("border-2");
  });

  it("applies the requested padding size", () => {
    const { container } = render(<VCard padding="lg">Body</VCard>);

    expect(container.firstChild).toHaveClass("p-8");
  });

  it("merges custom className", () => {
    const { container } = render(<VCard className="custom-class">Body</VCard>);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(<VCard ref={ref}>Body</VCard>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
