import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Radix UI requires these in jsdom

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();

window.PointerEvent = window.PointerEvent ?? MouseEvent;

// Radix Select requires pointer capture APIs
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

window.HTMLElement.prototype.setPointerCapture = vi.fn();

window.HTMLElement.prototype.releasePointerCapture = vi.fn();