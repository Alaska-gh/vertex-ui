import type { Meta, StoryObj } from "@storybook/react-vite";
import { VFormField } from "./form-field";

const meta: Meta<typeof VFormField> = {
  title: "Components/FormField",
  component: VFormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VFormField>;

export const Default: Story = {
  render: () => (
    <VFormField label="Username" htmlFor="username">
      <input
        id="username"
        className="border rounded-md px-3 py-2"
        placeholder="Enter username"
      />
    </VFormField>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <VFormField
      label="Email"
      htmlFor="email"
      helperText="We'll never share your email."
    >
      <input
        id="email"
        className="border rounded-md px-3 py-2"
        placeholder="example@email.com"
      />
    </VFormField>
  ),
};

export const Error: Story = {
  render: () => (
    <VFormField
      label="Email"
      htmlFor="email"
      error
      errorMessage="Email is required."
    >
      <input
        id="email"
        className="border rounded-md px-3 py-2"
      />
    </VFormField>
  ),
};

export const Required: Story = {
  render: () => (
    <VFormField
      label="Password"
      htmlFor="password"
      required
    >
      <input
        id="password"
        className="border rounded-md px-3 py-2"
      />
    </VFormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <VFormField
      label="Username"
      htmlFor="username"
      disabled
    >
      <input
        id="username"
        disabled
        className="border rounded-md px-3 py-2"
      />
    </VFormField>
  ),
};