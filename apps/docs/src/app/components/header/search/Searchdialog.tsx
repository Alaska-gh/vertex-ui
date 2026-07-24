"use client";

import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({
  open,
  onClose,
}: SearchDialogProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-start
        justify-center
        bg-black/50
        pt-24
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-lg
          border
          bg-background
          p-4
          shadow-lg
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <Search size={18} />

          <input
            autoFocus
            placeholder="Search documentation..."
            className="
              flex-1
              bg-transparent
              outline-none
            "
          />
        </div>
      </div>
    </div>
  );
}