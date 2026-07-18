import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VToastProvider } from "./toast.provider";
import { useToast } from "./use-toast";

function TestComponent() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast({
          title: "Toast Title",
          description: "Toast Description",
        })
      }
    >
      Show Toast
    </button>
  );
}

describe("VToast", () => {
  it("renders a toast", async () => {
    render(
      <VToastProvider>
        <TestComponent />
      </VToastProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /show toast/i,
      }),
    );

    expect(await screen.findByText("Toast Title")).toBeInTheDocument();

    expect(screen.getByText("Toast Description")).toBeInTheDocument();
  });

  it("renders success variant", async () => {
    function Demo() {
      const { toast } = useToast();

      return (
        <button
          onClick={() =>
            toast({
              title: "Success",
              variant: "success",
            })
          }
        >
          Show
        </button>
      );
    }

    render(
      <VToastProvider>
        <Demo />
      </VToastProvider>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByRole("status")).toHaveClass("bg-success");
  });

  it("dismisses when close button is clicked", async () => {
    render(
      <VToastProvider>
        <TestComponent />
      </VToastProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /show toast/i,
      }),
    );

    const closeButton = await screen.findByRole("button", {
      name: /close/i,
    });

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Toast Title")).not.toBeInTheDocument();
    });
  });

  it("auto dismisses after duration", async () => {
    function Demo() {
      const { toast } = useToast();

      return (
        <button
          onClick={() =>
            toast({
              title: "Auto",
              duration: 100,
            })
          }
        >
          Show
        </button>
      );
    }

    render(
      <VToastProvider>
        <Demo />
      </VToastProvider>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByText("Auto")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText("Auto")).not.toBeInTheDocument();
      },
      {
        timeout: 300,
      },
    );
  });

  it("throws outside provider", () => {
    expect(() => render(<TestComponent />)).toThrow(/VToastProvider/i);
  });
});
