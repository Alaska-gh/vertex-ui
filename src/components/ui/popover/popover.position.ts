import type { PopoverPlacement } from "./popover.types";

interface PositionOptions {
  triggerRect: DOMRect;
  popoverWidth: number;
  popoverHeight: number;
  offset: number;
  placement: PopoverPlacement;
}

export function calculatePopoverPosition({
  triggerRect,
  popoverWidth,
  popoverHeight,
  offset,
  placement,
}: PositionOptions) {
  let top = 0;
  let left = 0;

  switch (placement) {
    case "top":
      top = triggerRect.top - popoverHeight - offset;

      left = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;

      break;

    case "top-start":
      top = triggerRect.top - popoverHeight - offset;

      left = triggerRect.left;

      break;

    case "top-end":
      top = triggerRect.top - popoverHeight - offset;

      left = triggerRect.right - popoverWidth;

      break;

    case "bottom":
      top = triggerRect.bottom + offset;

      left = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;

      break;

    case "bottom-start":
      top = triggerRect.bottom + offset;

      left = triggerRect.left;

      break;

    case "bottom-end":
      top = triggerRect.bottom + offset;

      left = triggerRect.right - popoverWidth;

      break;

    case "left":
      top = triggerRect.top + triggerRect.height / 2 - popoverHeight / 2;

      left = triggerRect.left - popoverWidth - offset;

      break;

    case "right":
      top = triggerRect.top + triggerRect.height / 2 - popoverHeight / 2;

      left = triggerRect.right + offset;

      break;
  }

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
  };
}
