"use client";

import { Button } from "@vertex-ui/react";

export default function UiPreview() {
  return (
    <div>
      <Button variant="outline">Hello Vertex UI</Button>
      <main className="flex min-h-screen items-center justify-center">
        <Button>Click me</Button>

        <Button variant="ghost" size="lg" loading>
          Save
        </Button>
      </main>
    </div>
  );
}
