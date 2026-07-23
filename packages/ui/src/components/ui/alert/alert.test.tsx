import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VAlert } from "./alert";
import type { AlertProps } from "./alert.types";

describe("VAlert", () => {

  const variants: AlertProps["variant"][] = [
  "default",
  "success",
  "warning",
  "danger",
  "info",
];


it.each(variants)(
  "supports %s variant",
  (variant) => {
    render(
      <VAlert variant={variant}>
        Message
      </VAlert>,
    );


    expect(
      screen.getByRole("alert"),
    ).toBeInTheDocument();
  },
);

  it("renders alert", () => {
    render(
      <VAlert>
        Alert message
      </VAlert>,
    );


    expect(
      screen.getByRole("alert"),
    ).toBeInTheDocument();
  });



  it("renders children content", () => {
    render(
      <VAlert>
        Something went wrong
      </VAlert>,
    );


    expect(
      screen.getByText("Something went wrong"),
    ).toBeInTheDocument();
  });



  it("renders title", () => {
    render(
      <VAlert title="Error">
        Failed request
      </VAlert>,
    );


    expect(
      screen.getByText("Error"),
    ).toBeInTheDocument();


    expect(
      screen.getByText("Failed request"),
    ).toBeInTheDocument();
  });



  it("renders icon when provided", () => {
    render(
      <VAlert
        icon={
          <span data-testid="alert-icon">
            icon
          </span>
        }
      >
        Message
      </VAlert>,
    );


    expect(
      screen.getByTestId("alert-icon"),
    ).toBeInTheDocument();
  });

  it("renders dismiss button when dismissible", () => {
    render(
      <VAlert
        dismissible
        onDismiss={() => {}}
      >
        Message
      </VAlert>,
    );


    expect(
      screen.getByRole(
        "button",
        {
          name: "Dismiss alert",
        },
      ),
    ).toBeInTheDocument();
  });



  it("calls onDismiss when dismiss button is clicked", async () => {
    const onDismiss = vi.fn();

    const user = userEvent.setup();


    render(
      <VAlert
        dismissible
        onDismiss={onDismiss}
      >
        Message
      </VAlert>,
    );


    await user.click(
      screen.getByRole(
        "button",
        {
          name: "Dismiss alert",
        },
      ),
    );


    expect(
      onDismiss,
    ).toHaveBeenCalledTimes(1);
  });



  it("does not render dismiss button without dismissible prop", () => {
    render(
      <VAlert>
        Message
      </VAlert>,
    );


    expect(
      screen.queryByRole(
        "button",
        {
          name: "Dismiss alert",
        },
      ),
    ).not.toBeInTheDocument();
  });



  it("does not render dismiss button when handler is missing", () => {
    render(
      <VAlert dismissible>
        Message
      </VAlert>,
    );


    expect(
      screen.queryByRole(
        "button",
        {
          name: "Dismiss alert",
        },
      ),
    ).not.toBeInTheDocument();
  });



  it("forwards ref correctly", () => {
    let element: HTMLDivElement | null = null;


    render(
      <VAlert
        ref={(node) => {
          element = node;
        }}
      >
        Message
      </VAlert>,
    );


    expect(element).toBeInstanceOf(
      HTMLDivElement,
    );
  });



  it("forwards custom className", () => {
    render(
      <VAlert className="custom-alert">
        Message
      </VAlert>,
    );


    expect(
      screen.getByRole("alert"),
    ).toHaveClass(
      "custom-alert",
    );
  });



  it("marks icon container as decorative", () => {
  render(
    <VAlert
      icon={
        <span data-testid="alert-icon">
          !
        </span>
      }
    >
      Message
    </VAlert>,
  );


  expect(
    screen.getByTestId("alert-icon").parentElement,
  ).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});


  it("uses alert accessibility role", () => {
    render(
      <VAlert>
        Message
      </VAlert>,
    );


    expect(
      screen.getByRole("alert"),
    ).toHaveAttribute(
      "role",
      "alert",
    );
  });


});