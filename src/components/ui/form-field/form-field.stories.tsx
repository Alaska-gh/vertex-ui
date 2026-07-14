import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField label="Username" htmlFor="username">
      <input
        id="username"
        className="border rounded-md px-3 py-2"
        placeholder="Enter username"
      />
    </FormField>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <FormField
      label="Email"
      htmlFor="email"
      helperText="We'll never share your email."
    >
      <input
        id="email"
        className="border rounded-md px-3 py-2"
        placeholder="example@email.com"
      />
    </FormField>
  ),
};

export const Error: Story = {
  render: () => (
    <FormField
      label="Email"
      htmlFor="email"
      error
      errorMessage="Email is required."
    >
      <input
        id="email"
        className="border rounded-md px-3 py-2"
      />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField
      label="Password"
      htmlFor="password"
      required
    >
      <input
        id="password"
        className="border rounded-md px-3 py-2"
      />
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField
      label="Username"
      htmlFor="username"
      disabled
    >
      <input
        id="username"
        disabled
        className="border rounded-md px-3 py-2"
      />
    </FormField>
  ),
};