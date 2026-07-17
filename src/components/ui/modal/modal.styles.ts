export const MODAL_STYLES = {
  overlay:
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in",

  content:
  "fixed left-1/2 top-1/2 z-50 w-full max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200",
  header:
    "flex items-start justify-between gap-4 px-6 pt-6",

  title:
    "text-lg font-semibold tracking-tight",

  description:
    "mt-2 text-sm text-muted-foreground",

  body:
    "px-6 py-6",

  footer:
    "flex items-center justify-end gap-3 px-6 pb-6",

  closeButton:
    "rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring",

  closeIcon:
    "h-4 w-4",
} as const;