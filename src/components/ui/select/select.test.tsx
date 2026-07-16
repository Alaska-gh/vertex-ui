import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VSelect } from "./select";

const options = [
  { label: "Ghana", value: "gh" },
  { label: "Nigeria", value: "ng" },
  { label: "Kenya", value: "ke" },
];

describe("VSelect", () => {
  it("renders placeholder", () => {
    render(<VSelect placeholder="Select country" options={options} />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Select country");
  });

  it("renders label", () => {
    render(<VSelect label="Country" options={options} />);

    expect(screen.getByText("Country")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<VSelect helperText="Choose your country" options={options} />);

    expect(screen.getByText("Choose your country")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <VSelect error errorMessage="Country is required" options={options} />,
    );

    expect(screen.getByText("Country is required")).toBeInTheDocument();
  });

  it("opens the dropdown", async () => {
    const user = userEvent.setup();

    render(<VSelect options={options} />);

    const trigger = screen.getByRole("combobox");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");

    expect(
      await screen.findByRole("option", {
        name: "Ghana",
      }),
    ).toBeInTheDocument();
  });

  it("calls onValueChange", async () => {
    const user = userEvent.setup();

    const onValueChange = vi.fn();

    render(<VSelect options={options} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));

    await user.click(
      screen.getByRole("option", {
        name: "Nigeria",
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith("ng");
  });

  it("supports disabled state", () => {
    render(<VSelect disabled options={options} />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders selected value", () => {
    render(<VSelect value="ke" options={options} />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Kenya");
  });

  it("does not allow selecting disabled option", async () => {
    const user = userEvent.setup();

    const onValueChange = vi.fn();

    render(
      <VSelect
        options={[
          {
            label: "Admin",
            value: "admin",
          },
          {
            label: "Guest",
            value: "guest",
            disabled: true,
          },
        ]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));

    const option = screen.getByRole("option", {
      name: "Guest",
    });

    expect(option).toHaveAttribute("data-disabled");
  });
});
