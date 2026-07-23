import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VPagination } from "./pagination";

describe("VPagination", () => {
  it("renders nothing when pageCount is 1", () => {
    const { container } = render(<VPagination pageCount={1} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when pageCount is 0", () => {
    const { container } = render(<VPagination pageCount={0} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders all page numbers when pageCount is small", () => {
    render(<VPagination pageCount={4} />);

    for (const page of [1, 2, 3, 4]) {
      expect(
        screen.getByRole("button", { name: `Page ${page}` }),
      ).toBeInTheDocument();
    }

    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("marks the current page with aria-current", () => {
    render(<VPagination pageCount={5} defaultPage={3} />);

    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Page 1" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("shows an ellipsis when there are many pages", () => {
    render(<VPagination pageCount={50} defaultPage={25} />);

    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
  });

  it("always shows the first and last page when far from the edges", () => {
    render(<VPagination pageCount={50} defaultPage={25} />);

    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Page 50" }),
    ).toBeInTheDocument();
  });

  it("disables Previous and First on the first page", () => {
    render(<VPagination pageCount={10} />);

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "First page" })).toBeDisabled();
  });

  it("disables Next and Last on the last page", () => {
    render(<VPagination pageCount={10} defaultPage={10} />);

    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Last page" })).toBeDisabled();
  });

  it("hides first/last buttons when showFirstLast is false", () => {
    render(<VPagination pageCount={10} showFirstLast={false} />);

    expect(
      screen.queryByRole("button", { name: "First page" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Last page" }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the next page uncontrolled", async () => {
    const user = userEvent.setup();

    render(<VPagination pageCount={10} />);

    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("jumps to the last page", async () => {
    const user = userEvent.setup();

    render(<VPagination pageCount={10} />);

    await user.click(screen.getByRole("button", { name: "Last page" }));

    expect(screen.getByRole("button", { name: "Page 10" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("calls onPageChange with the new page", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(<VPagination pageCount={10} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Page 3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("respects a controlled page value", () => {
    render(
      <VPagination pageCount={10} page={7} onPageChange={() => {}} />,
    );

    expect(screen.getByRole("button", { name: "Page 7" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not advance past pageCount when clicking a page number", async () => {
    const user = userEvent.setup();

    render(<VPagination pageCount={4} />);

    await user.click(screen.getByRole("button", { name: "Page 4" }));

    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("applies the requested size", () => {
    render(<VPagination pageCount={5} size="sm" />);

    expect(screen.getByRole("button", { name: "Page 1" })).toHaveClass("h-7");
  });

  it("forwards ref to the nav element", () => {
    let node: HTMLElement | null = null;

    render(
      <VPagination
        pageCount={5}
        ref={(el) => {
          node = el;
        }}
      />,
    );

    expect(node).toBeInstanceOf(HTMLElement);
  });

  it("jumps to the first page", async () => {
  const user = userEvent.setup();

  render(<VPagination pageCount={10} defaultPage={5} />);

  await user.click(
    screen.getByRole("button", {
      name: "First page",
    }),
  );

  expect(
    screen.getByRole("button", {
      name: "Page 1",
    }),
  ).toHaveAttribute("aria-current", "page");
});

it("navigates to the previous page", async () => {
  const user = userEvent.setup();

  render(<VPagination pageCount={10} defaultPage={5} />);

  await user.click(
    screen.getByRole("button", {
      name: "Previous page",
    }),
  );

  expect(
    screen.getByRole("button", {
      name: "Page 4",
    }),
  ).toHaveAttribute("aria-current", "page");
});
});