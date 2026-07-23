import * as Dialog from "@radix-ui/react-dialog";
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
  disableEscapeKey = MODAL_DEFAULTS.disableEscapeKey,
  disableAutoFocus = MODAL_DEFAULTS.disableAutoFocus,
  className,
}: VModalProps) {

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const handleAutoFocus = (event: Event) => {
  if (disableAutoFocus) {
    event.preventDefault();
  }
};

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={MODAL_STYLES.overlay}
          onPointerDown={() => {
            if (closeOnOverlayClick) {
              handleClose()
            }
          }}
          data-testid="modal-overlay"
        />

        <Dialog.Content
          aria-modal="true"
          className={cn(
            MODAL_STYLES.content,
            MODAL_SIZE_CLASSES[size],
            className,
          )}
          onPointerDownOutside={(event) => {
            if (!closeOnOverlayClick) {
              event.preventDefault();
            }
          }}
          onEscapeKeyDown={(event) => {
            if (disableEscapeKey) {
              event.preventDefault();
            }
          }}
          onOpenAutoFocus={handleAutoFocus}
        >
          {(title || description || showCloseButton) && (
            <header className={MODAL_STYLES.header}>
              <div className="min-w-0 flex-1">
                {title && (
                  <Dialog.Title className={MODAL_STYLES.title}>
                    {title}
                  </Dialog.Title>
                )}

                {description && (
                  <Dialog.Description className={MODAL_STYLES.description}>
                    {description}
                  </Dialog.Description>
                )}
              </div>

              {showCloseButton && (
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close modal"
                    className={MODAL_STYLES.closeButton}
                  >
                    <X className={MODAL_STYLES.closeIcon} />
                  </button>
                </Dialog.Close>
              )}
            </header>
          )}

          <div className={MODAL_STYLES.body}>{children}</div>

          {footer && <footer className={MODAL_STYLES.footer}>{footer}</footer>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
