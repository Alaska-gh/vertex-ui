import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { VRadioGroup } from "./radio-group";


const options = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];


describe("VRadioGroup", () => {


  it("renders options", () => {

    render(
      <VRadioGroup
        options={options}
      />
    );


    expect(
      screen.getByText("Male")
    ).toBeInTheDocument();


    expect(
      screen.getByText("Female")
    ).toBeInTheDocument();

  });



  it("renders label", () => {

    render(
      <VRadioGroup
        label="Gender"
        options={options}
      />
    );


    expect(
      screen.getByText("Gender")
    ).toBeInTheDocument();

  });



  it("renders helper text", () => {

    render(
      <VRadioGroup
        helperText="Select your gender"
        options={options}
      />
    );


    expect(
      screen.getByText(
        "Select your gender"
      )
    ).toBeInTheDocument();

  });



  it("renders error message", () => {

    render(
      <VRadioGroup
        error
        errorMessage="Gender is required"
        options={options}
      />
    );


    expect(
      screen.getByText(
        "Gender is required"
      )
    ).toBeInTheDocument();

  });



  it("selects an option", async () => {

    const user = userEvent.setup();

    const onValueChange = vi.fn();


    render(
      <VRadioGroup

        options={options}

        onValueChange={
          onValueChange
        }

      />
    );


    await user.click(
      screen.getByRole(
        "radio",
        {
          name: "Female",
        }
      )
    );


    expect(
      onValueChange
    ).toHaveBeenCalledWith(
      "female"
    );

  });



  it("supports controlled value", () => {

    render(
      <VRadioGroup

        value="other"

        options={options}

      />
    );


    expect(
      screen.getByRole(
        "radio",
        {
          name:"Other"
        }
      )
    ).toBeChecked();

  });



  it("supports disabled state", () => {

    render(
      <VRadioGroup

        disabled

        options={options}

      />
    );


    expect(
      screen.getByRole(
        "radio",
        {
          name:"Male"
        }
      )
    ).toBeDisabled();

  });



  it("does not allow disabled option selection", async () => {

    const user = userEvent.setup();


    const onValueChange = vi.fn();


    render(
      <VRadioGroup

        options={[
          {
            label:"Admin",
            value:"admin",
          },
          {
            label:"Guest",
            value:"guest",
            disabled:true,
          },
        ]}

        onValueChange={
          onValueChange
        }

      />
    );


    const guest = screen.getByRole(
      "radio",
      {
        name:"Guest"
      }
    );


    expect(
      guest
    ).toBeDisabled();


    await user.click(
      guest
    );


    expect(
      onValueChange
    ).not.toHaveBeenCalled();

  });


});