import type {
  DropdownAlign,
  DropdownSide,
} from "./dropdown.types";


export const DROPDOWN_DEFAULTS = {

  side:
    "bottom" as DropdownSide,

  align:
    "start" as DropdownAlign,

  sideOffset:
    8,

} as const;