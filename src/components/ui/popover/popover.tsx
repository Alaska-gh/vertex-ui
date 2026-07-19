import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { POPOVER_DEFAULTS, POPOVER_Z_INDEX } from "./popover.constants";
import { POPOVER_STYLES } from "./popover.styles";
import type { VPopoverProps } from "./popover.types";

export function VPopover({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  placement = POPOVER_DEFAULTS.placement,
  offset = POPOVER_DEFAULTS.offset,
  closeOnOutsideClick = POPOVER_DEFAULTS.closeOnOutsideClick,
  closeOnEscape = POPOVER_DEFAULTS.closeOnEscape,
  className,
}: VPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }

      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) {
      return;
    }

    const trigger = triggerRef.current.getBoundingClientRect();
    const popover = popoverRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = trigger.top - popover.height - offset;
        left = trigger.left + trigger.width / 2 - popover.width / 2;
        break;

      case "top-start":
        top = trigger.top - popover.height - offset;
        left = trigger.left;
        break;

      case "top-end":
        top = trigger.top - popover.height - offset;
        left = trigger.right - popover.width;
        break;

      case "bottom":
        top = trigger.bottom + offset;
        left = trigger.left + trigger.width / 2 - popover.width / 2;
        break;

      case "bottom-start":
        top = trigger.bottom + offset;
        left = trigger.left;
        break;

      case "bottom-end":
        top = trigger.bottom + offset;
        left = trigger.right - popover.width;
        break;

      case "left":
        top = trigger.top + trigger.height / 2 - popover.height / 2;
        left = trigger.left - popover.width - offset;
        break;

      case "right":
        top = trigger.top + trigger.height / 2 - popover.height / 2;
        left = trigger.right + offset;
        break;
    }

    setPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });
  }, [placement, offset]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleOutside(event: MouseEvent) {
      if (
        closeOnOutsideClick &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (closeOnEscape && event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeOnOutsideClick, closeOnEscape, setOpen]);

  if (!isValidElement(trigger)) {
    throw new Error("VPopover trigger must be a valid React element.");
  }

  const triggerElement = trigger as ReactElement<{
    onClick?: React.MouseEventHandler;
  }>;

  const clonedTrigger = cloneElement(triggerElement, {
    onClick: (event) => {
      triggerElement.props.onClick?.(event);

      setOpen(!isOpen);
    },
  });

  return (
    <div ref={wrapperRef} className="inline-block">
      <div ref={triggerRef}>{clonedTrigger}</div>

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            className={cn(POPOVER_STYLES.content, className)}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              zIndex: POPOVER_Z_INDEX,
            }}
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  );
}