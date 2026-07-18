import { useEffect } from "react";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { DRAWER_DEFAULTS, DRAWER_SIZE_CLASSES } from "./drawer.constants";

import { DRAWER_STYLES } from "./drawer.styles";

import type { VDrawerProps } from "./drawer.types";
import { createPortal } from "react-dom";

export function VDrawer({
  open,
  onOpenChange,
  children,
  title,
  description,
  footer,
  side = DRAWER_DEFAULTS.side,
  size = DRAWER_DEFAULTS.size,
  closeOnOverlayClick = DRAWER_DEFAULTS.closeOnOverlayClick,
  showCloseButton = DRAWER_DEFAULTS.showCloseButton,
  className,
}: VDrawerProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        onOpenChange(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onOpenChange(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50" role="presentation">
      <div 
      data-testid= "drawer-overlay"
      className={DRAWER_STYLES.overlay} onClick={handleOverlayClick} />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          DRAWER_STYLES.base,
          DRAWER_STYLES[side],
          DRAWER_SIZE_CLASSES[size][side],
          side === "right" && "rounded-l-2xl",
          side === "left" && "rounded-r-2xl",
          side === "top" && "rounded-b-2xl",
          side === "bottom" && "rounded-t-2xl",
          className,
        )}
      >
        <div
          className={cn(
            DRAWER_STYLES.header,
            !title && !description && "justify-end",
          )}
        >
          <div>
            {title && <h2 className={DRAWER_STYLES.title}>{title}</h2>}

            {description && (
              <p className={DRAWER_STYLES.description}>{description}</p>
            )}
          </div>

          {showCloseButton && (
            <button
              aria-label="Close drawer"
              className={DRAWER_STYLES.closeButton}
              onClick={() => onOpenChange(false)}
            >
              <X className={DRAWER_STYLES.closeIcon} />
            </button>
          )}
        </div>

        <div className={DRAWER_STYLES.body}>{children}</div>

        {footer && <div className={DRAWER_STYLES.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
