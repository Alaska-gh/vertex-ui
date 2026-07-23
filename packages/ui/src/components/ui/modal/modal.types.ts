import type { ReactNode } from "react";

export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

export interface VModalProps {
  /**
   * Controls whether the modal is open.
   */
  open: boolean;

  /**
   * Called whenever the open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Optional modal title.
   */
  title?: string;

  /**
   * Optional description announced to screen readers.
   */
  description?: string;

  /**
   * Modal content.
   */
  children: ReactNode;

  /**
   * Optional footer.
   */
  footer?: ReactNode;

  /**
   * Modal width.
   *
   * @default "md"
   */
  size?: ModalSize;

  /**
   * Whether clicking outside closes the modal.
   *
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Shows the close button.
   *
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Prevents closing with the Escape key.
   *
   * @default false
   */
  disableEscapeKey?: boolean;

  /**
   * Prevents auto focusing the first element.
   *
   * Advanced usage.
   */
  disableAutoFocus?: boolean;

  /**
   * Additional classes applied to the dialog content.
   */
  className?: string;
}