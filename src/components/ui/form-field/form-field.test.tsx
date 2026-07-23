import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { VFormField } from "./form-field";

describe("VFormField", () => {
  it("renders label", () => {
    render(
      <VFormField label="Username">
        <input />
      </VFormField>
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <VFormField helperText="Helpful text">
        <input />
      </VFormField>
    );

    expect(screen.getByText("Helpful text")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <VFormField
        error
        errorMessage="Something went wrong"
      >
        <input />
      </VFormField>
    );

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <VFormField label="Name" required>
        <input />
      </VFormField>
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("associates label with input", () => {
    render(
      <VFormField
        label="Username"
        htmlFor="username"
      >
        <input id="username" />
      </VFormField>
    );

    expect(
      screen.getByLabelText("Username")
    ).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <VFormField>
        <input data-testid="input" />
      </VFormField>
    );

    expect(
      screen.getByTestId("input")
    ).toBeInTheDocument();
  });

  it("applies disabled styling", () => {
    render(
      <VFormField
        label="Username"
        disabled
      >
        <input />
      </VFormField>
    );

    expect(
      screen.getByText("Username")
    ).toHaveClass("opacity-50");
  });

  it("renders horizontal layout", () => {
  render(
    <VFormField
      layout="horizontal"
      label="Email"
      htmlFor="email"
    >
      <input id="email"/>
    </VFormField>,
  );

  expect(screen.getByLabelText("Email")).toBeInTheDocument();
});

it("applies disabled styling in horizontal layout", () => {
  render(
    <VFormField
      layout="horizontal"
      label="Email"
      disabled
    >
      <input />
    </VFormField>,
  );

  expect(
    screen.getByText("Email"),
  ).toHaveClass("text-muted-foreground");
});

it("renders helper text in horizontal layout", () => {
  render(
    <VFormField
      layout="horizontal"
      helperText="Helper"
    >
      <input />
    </VFormField>,
  );

  expect(
    screen.getByText("Helper"),
  ).toBeInTheDocument();
});

it("renders error message in horizontal layout", () => {
  render(
    <VFormField
      layout="horizontal"
      error
      errorMessage="Required"
    >
      <input />
    </VFormField>,
  );

  expect(
    screen.getByText("Required"),
  ).toBeInTheDocument();
});

it("merges custom label class", () => {
  render(
    <VFormField
      layout="horizontal"
      label="Email"
      labelClassName="custom-label"
    >
      <input />
    </VFormField>,
  );

  expect(
    screen.getByText("Email"),
  ).toHaveClass("custom-label");
});

it("does not render a label when label is not provided", () => {
  render(
    <VFormField>
      <input />
    </VFormField>,
  );

  expect(
    screen.queryByText(/email/i),
  ).not.toBeInTheDocument();
});

it("does not render a label in horizontal layout when omitted", () => {
  render(
    <VFormField layout="horizontal">
      <input />
    </VFormField>,
  );

  expect(
    document.querySelector("label"),
  ).toBeNull();
});

it("does not render required indicator in horizontal layout when not required", () => {
  render(
    <VFormField
      label="Email"
      layout="horizontal"
      htmlFor="email"
    >
      <input id="email" />
    </VFormField>,
  );

  expect(screen.queryByText("*")).not.toBeInTheDocument();
});

it("does not render required indicator by default", () => {
  render(
    <VFormField
      label="Email"
      htmlFor="email"
    >
      <input id="email" />
    </VFormField>,
  );

  expect(screen.queryByText("*")).not.toBeInTheDocument();
});

it("does not crash when required is true but label is missing", () => {
  render(
    <VFormField
      required
      htmlFor="email"
    >
      <input id="email" />
    </VFormField>,
  );

  expect(
    screen.queryByText("*"),
  ).not.toBeInTheDocument();
});
});