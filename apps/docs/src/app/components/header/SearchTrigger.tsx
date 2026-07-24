"use client";

import { Search } from "lucide-react";

interface SearchTriggerProps {
  onClick: () => void
}

export function SearchTrigger({onClick}: SearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        hidden
        h-10
        w-72
        items-center
        justify-between
        rounded-md
        border
        border-gray-200
        bg-background
        px-3
        text-sm
        text-muted-foreground
        transition-colors
        hover:bg-accent
        hover:text-accent-foreground
        lg:flex
      "
    >
      <span className="flex items-center gap-2">
        <Search size={16} className="shrink-0" />

        <span>Search documentation...</span>
      </span>

      <kbd
        className="
          pointer-events-none
          rounded
          border
          bg-muted
          px-1.5
          py-0.5
          text-xs
          font-medium
        "
      >
        ⌘K
      </kbd>
    </button>
  );
}
