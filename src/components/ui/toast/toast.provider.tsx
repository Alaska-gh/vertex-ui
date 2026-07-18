import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { TOAST_DEFAULTS, TOAST_POSITION_CLASSES } from "./toast.constants";

import type {
  ToastData,
  ToastPosition,
} from "./toast.types";

import { createPortal } from "react-dom";

import { VToast } from "./toast";



interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
}

import { cn } from "@/lib/utils";
import { ToastContext } from "./toast-context.provider";

export function VToastProvider({
  children,
  position = TOAST_DEFAULTS.position,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback(
    (data: Omit<ToastData, "id">) => {
      const id = crypto.randomUUID();

      const nextToast: ToastData = {
        id,
        duration: TOAST_DEFAULTS.duration,
        dismissible: TOAST_DEFAULTS.dismissible,
        variant: TOAST_DEFAULTS.variant,
        ...data,
      };

      setToasts((previous) => {
        const updated = [...previous, nextToast];

        return updated.slice(-TOAST_DEFAULTS.maxVisible);
      });

      if (nextToast.duration && nextToast.duration > 0) {
        window.setTimeout(() => {
          removeToast(id);
        }, nextToast.duration);
      }
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      toasts,
      toast,
      removeToast,
      clearToasts,
    }),
    [toasts, toast, removeToast, clearToasts],
  );

  return (
  <ToastContext.Provider value={value}>
    {children}

    {createPortal(
      <div
        className={cn(
          "fixed z-[100] flex w-96 flex-col gap-3",
          TOAST_POSITION_CLASSES[position],
        )}
      >
        {toasts.map((toast) => (
          <VToast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>,
      document.body,
    )}
  </ToastContext.Provider>
);
}
