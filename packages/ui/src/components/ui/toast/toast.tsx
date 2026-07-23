import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { toastVariants } from "./toast.variants";

import type { ToastProps } from "./toast.types";

export function VToast({
  title,
  description,
  variant,
  dismissible = true,
  onClose,
}: ToastProps) {
  return (
    <div
      role="status"
      className={cn(
        toastVariants({
          variant,
        }),
      )}
    >
      <div className="flex-1">
        {title && <h4 className="font-medium">{title}</h4>}

        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="rounded-md p-1 transition-colors hover:bg-black/10"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
