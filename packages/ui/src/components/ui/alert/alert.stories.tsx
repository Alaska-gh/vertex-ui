import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";


import { VAlert } from "./alert";


const meta = {
  title: "Components/Alert",
  component: VAlert,
  parameters: {
    layout: "centered",
  },
  tags: [
    "autodocs",
  ],
} satisfies Meta<typeof VAlert>;


export default meta;


type Story = StoryObj<typeof meta>;



export const Default: Story = {
  args: {
    children:
      "This is a default alert message.",
  },
};



export const Variants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">

      <VAlert variant="default">
        Default alert
      </VAlert>


      <VAlert variant="success">
        Success alert
      </VAlert>


      <VAlert variant="warning">
        Warning alert
      </VAlert>


      <VAlert variant="danger">
        Danger alert
      </VAlert>


      <VAlert variant="info">
        Info alert
      </VAlert>

    </div>
  ),
};



export const WithTitle: Story = {
  args: {
    title: "Profile updated",
    children:
      "Your profile information has been saved.",
    variant: "success",
  },
};



export const WithIcon: Story = {
  render: () => (
    <VAlert
      
      icon={
        <span>
          ℹ️
        </span>
      }
      title="Information"
    >
      New updates are available.
    </VAlert>
  ),
};



export const Dismissible: Story = {
  render: () => (
    <VAlert
      variant="warning"
      title="Warning"
      dismissible
      onDismiss={() =>
        console.log(
          "dismissed",
        )
      }
    >
      Your session will expire soon.
    </VAlert>
  ),
};