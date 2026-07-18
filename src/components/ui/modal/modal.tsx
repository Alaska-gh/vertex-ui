import { createPortal } from "react-dom";
import { useEffect } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { MODAL_DEFAULTS, MODAL_SIZE_CLASSES } from "./modal.constants";

import { MODAL_STYLES } from "./modal.styles";

import type { VModalProps } from "./modal.types";

export function VModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = MODAL_DEFAULTS.size,
  closeOnOverlayClick = MODAL_DEFAULTS.closeOnOverlayClick,
  showCloseButton = MODAL_DEFAULTS.showCloseButton,
  className,
}: VModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);

      document.body.style.overflow = originalOverflow;
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  const modal = (
    <div role="presentation" className="fixed inset-0 z-50">
      <div
        className={MODAL_STYLES.overlay}
        onClick={() => {
          if (closeOnOverlayClick) {
            onOpenChange(false);
          }
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        className={cn(
          MODAL_STYLES.content,
          MODAL_SIZE_CLASSES[size],
          className,
        )}
      >
        {(title || showCloseButton) && (
          <header className={MODAL_STYLES.header}>
            <div>
              {title && (
                <h2 id="modal-title" className={MODAL_STYLES.title}>
                  {title}
                </h2>
              )}

              {description && (
                <p id="modal-description" className={MODAL_STYLES.description}>
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                aria-label="Close modal"
                className={MODAL_STYLES.closeButton}
                onClick={() => onOpenChange(false)}
              >
                <X className={MODAL_STYLES.closeIcon} />
              </button>
            )}
          </header>
        )}

        <div className={MODAL_STYLES.body}>{children}</div>

        {footer && <footer className={MODAL_STYLES.footer}>{footer}</footer>}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
