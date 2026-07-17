import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  VTooltip,
} from "./tooltip";
import { VTooltipProvider } from "./tooltip-provider";

const renderTooltip = (
  props?: Partial<React.ComponentProps<typeof VTooltip>>,
) =>
  render(
    <VTooltipProvider>
      <VTooltip
        content="Tooltip content"
        {...props}
      >
        <button>Hover me</button>
      </VTooltip>
    </VTooltipProvider>,
  );

describe("VTooltip", () => {
  it("renders trigger", () => {
    renderTooltip();

    expect(
      screen.getByRole("button", {
        name: /hover me/i,
      }),
    ).toBeInTheDocument();
  });

  it("does not show tooltip initially", () => {
    renderTooltip();

    expect(
      screen.queryByRole("tooltip"),
    ).not.toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();

    renderTooltip();

    await user.hover(
      screen.getByRole("button"),
    );

    const tooltip =
      await screen.findByRole("tooltip");

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
      "Tooltip content",
    );
  });

it("renders tooltip on the correct side", async () => {
  const user = userEvent.setup();

  render(
    <VTooltipProvider>
      <VTooltip
        side="left"
        content="Tooltip content"
      >
        <button>Hover me</button>
      </VTooltip>
    </VTooltipProvider>,
  );

  await user.hover(screen.getByRole("button"));

  const tooltip = await screen.findByRole("tooltip");

  expect(tooltip.parentElement).toHaveAttribute(
    "data-side",
    "left",
  );
});

  it("renders rich content", async () => {
    const user = userEvent.setup();

    render(
      <VTooltipProvider>
        <VTooltip
          content={
            <strong>
              Rich tooltip
            </strong>
          }
        >
          <button>
            Hover me
          </button>
        </VTooltip>
      </VTooltipProvider>,
    );

    await user.hover(
      screen.getByRole("button"),
    );

    const tooltip =
      await screen.findByRole("tooltip");

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
      "Rich tooltip",
    );
  });
});