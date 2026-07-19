import type { ReactElement, ReactNode } from "react";

import type { PopoverAlign, PopoverSide } from "../popover/popover.types";

export type DropdownItem =
  | {
      type: "item";
      key: string;
      label: ReactNode;
      icon?: ReactNode;
      onSelect?: () => void;
      disabled?: boolean;
      /** Styles the item as a destructive action, e.g. "Delete". */
      destructive?: boolean;
    }
  | {
      type: "separator";
      key: string;
    }
  | {
      type: "label";
      key: string;
      label: ReactNode;
    };

export interface DropdownProps {
  /** The element that opens the menu on click. Must accept a ref (asChild). */
  trigger: ReactElement;

  items: DropdownItem[];

  /** Controlled open state. Omit for uncontrolled usage. */
  open?: boolean;

  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;

  side?: PopoverSide;

  align?: PopoverAlign;

  sideOffset?: number;

  className?: string;
}