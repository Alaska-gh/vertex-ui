import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VTextarea } from "./textarea";

describe("VTextarea", () => {
  it("renders correctly", () => {
    render(<VTextarea placeholder="Write something..." />);

    expect(screen.getByPlaceholderText("Write something...")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<VTextarea label="Description" />);

    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(<VTextarea helperText="Maximum 500 characters." />);

    expect(
      screen.getByText("Maximum 500 characters.")
    ).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(
      <VTextarea
        error
        errorMessage="Description is required."
      />
    );

    expect(
      screen.getByText("Description is required.")
    ).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<VTextarea disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("fires input event", async () => {
    const user = userEvent.setup();

    render(<VTextarea />);

    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "Hello Vertex UI");

    expect(textarea).toHaveValue("Hello Vertex UI");
  });

  it("shows character counter", async () => {
    const user = userEvent.setup();

    render(
      <VTextarea
        showCount
        maxLength={100}
      />
    );

    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "Hello");

    expect(screen.getByText("5 / 100")).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <VTextarea
        label="Description"
        required
      />
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("sets aria-invalid when error exists", () => {
    render(
      <VTextarea
        error
        errorMessage="Required"
      />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("applies resize variant", () => {
    render(<VTextarea resize="none" />);

    expect(screen.getByRole("textbox")).toHaveClass("resize-none");
  });

  it("applies radius variant", () => {
    render(<VTextarea radius="full" />);

    expect(screen.getByRole("textbox")).toHaveClass("rounded-full");
  });

  it("applies full width variant", () => {
    render(<VTextarea fullWidth />);

    expect(screen.getByRole("textbox")).toHaveClass("w-full");
  });


   it("forwards ref to textarea", () => {
    const ref = {
      current: null,
    };

    render(
      <VTextarea ref={ref} />,
    );


    expect(ref.current)
      .toBeInstanceOf(
        HTMLTextAreaElement,
      );
  });



  it("supports callback ref", () => {
    const ref = vi.fn();


    render(
      <VTextarea ref={ref} />,
    );


    expect(ref)
      .toHaveBeenCalled();
  });



  it("generates id when id is not provided", () => {

    render(
      <VTextarea
        label="Description"
      />,
    );


    const textarea =
      screen.getByRole("textbox");


    expect(textarea)
      .toHaveAttribute(
        "id",
      );

  });



  it("uses provided id", () => {

    render(
      <VTextarea
        id="description"
      />,
    );


    expect(
      screen.getByRole("textbox"),
    )
      .toHaveAttribute(
        "id",
        "description",
      );

  });



  it("sets helper aria-describedby", () => {

    render(
      <VTextarea
        id="description"
        helperText="Helper message"
      />,
    );


    expect(
      screen.getByRole("textbox"),
    )
      .toHaveAttribute(
        "aria-describedby",
        "description-helper",
      );

  });



  it("sets error aria-describedby", () => {

    render(
      <VTextarea
        id="description"
        error
        errorMessage="Required"
      />,
    );


    expect(
      screen.getByRole("textbox"),
    )
      .toHaveAttribute(
        "aria-describedby",
        "description-error",
      );

  });



  it("changes counter color when near limit", async () => {

    const user =
      userEvent.setup();


    render(
      <VTextarea
        showCount
        maxLength={10}
      />,
    );


    const textarea =
      screen.getByRole("textbox");


    await user.type(
      textarea,
      "123456",
    );


    expect(
      screen.getByText("6 / 10"),
    )
      .toHaveClass(
        "text-danger",
      );

  });



  it("updates count when controlled value changes", () => {

    const { rerender } =
      render(
        <VTextarea
          showCount
          maxLength={50}
          value="Hello"
          onChange={() => {}}
        />,
      );


    expect(
      screen.getByText("5 / 50"),
    )
      .toBeInTheDocument();



    rerender(
      <VTextarea
        showCount
        maxLength={50}
        value="Hello World"
        onChange={() => {}}
      />,
    );


    expect(
      screen.getByText("11 / 50"),
    )
      .toBeInTheDocument();

  });



  it("applies maxRows height limit", () => {

    render(
      <VTextarea
        maxRows={5}
      />,
    );


    const textarea =
      screen.getByRole("textbox");


    expect(
      textarea.style.maxHeight,
    )
      .toBe(
        "120px",
      );

  });



  it("supports auto resize on input", async () => {

    const user =
      userEvent.setup();


    render(
      <VTextarea
        autoResize
      />,
    );


    const textarea =
      screen.getByRole("textbox");


    await user.type(
      textarea,
      "Hello",
    );


    expect(textarea)
      .toBeInTheDocument();

  });

});