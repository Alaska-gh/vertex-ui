import type { PopoverPlacement } from "./popover.types";

export const POPOVER_DEFAULTS = {
  placement: "bottom" as PopoverPlacement,
  offset: 8,
  closeOnOutsideClick: true,
  closeOnEscape: true,
} as const;

export const POPOVER_Z_INDEX = 1000;