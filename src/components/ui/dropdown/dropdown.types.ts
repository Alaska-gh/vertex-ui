import type { ReactElement, ReactNode } from "react";

export type DropdownSide = "top" | "right" | "bottom" | "left";

export type DropdownAlign = "start" | "center" | "end";

export type DropdownItemVariant = "default" | "destructive";

export type DropdownItem =
  | {
      type: "item";
      key: string;
      label: ReactNode;
      icon?: ReactNode;
      onSelect?: () => void;
      disabled?: boolean;
      variant?: DropdownItemVariant;
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
  /**
   * Element that triggers the dropdown.
   */
  trigger: ReactElement;

  /**
   * Dropdown menu items.
   */
  items: DropdownItem[];

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Default uncontrolled state.
   */
  defaultOpen?: boolean;

  /**
   * Open state callback.
   */
  onOpenChange?: (open: boolean) => void;

  side?: DropdownSide;

  align?: DropdownAlign;

  sideOffset?: number;

  className?: string;
}
