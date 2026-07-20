export const MODAL_STYLES = {
  overlay:
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200",

  content: [
    "fixed left-1/2 top-1/2 z-50",
    "w-full max-h-[90vh] overflow-y-auto",
    "-translate-x-1/2 -translate-y-1/2",
    "rounded-xl border border-border",
    "bg-background text-foreground",
    "shadow-2xl",
    "outline-none",
    "animate-in fade-in-0 zoom-in-95 duration-200",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ].join(" "),

  header: "flex items-start justify-between gap-4 px-6 pt-6",

  title: "text-lg font-semibold tracking-tight",

  description: "mt-2 text-sm text-muted-foreground",

  body: "px-6 py-6",

  footer: "flex items-center justify-end gap-3 border-t border-border px-6 py-4",

  closeButton: [
    "rounded-md p-1",
    "text-muted-foreground",
    "transition-colors",
    "hover:bg-muted",
    "hover:text-foreground",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
  ].join(" "),

  closeIcon: "size-4",
} as const;