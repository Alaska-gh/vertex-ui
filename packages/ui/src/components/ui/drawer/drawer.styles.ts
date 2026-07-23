export const DRAWER_STYLES = {
  overlay:
    "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300",

  base:
    "fixed z-50 flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-out border-border",

  left:
    "left-0 top-0 h-full border-r",

  right:
    "right-0 top-0 h-full border-l",

  top:
    "left-0 top-0 w-full border-b",

  bottom:
    "bottom-0 left-0 w-full border-t",


  header:
    [
      "flex items-start justify-between",
      "gap-4",
      "px-6 py-5",
      "border-b",
      "border-border",
      "shrink-0",
    ].join(" "),


  title:
    "text-lg font-semibold leading-none tracking-tight",


  description:
    [
      "mt-2",
      "text-sm",
      "leading-relaxed",
      "text-muted-foreground",
    ].join(" "),


  body:
    [
      "flex-1",
      "overflow-y-auto",
      "px-6 py-6",
    ].join(" "),


  footer:
    [
      "flex items-center justify-end",
      "gap-3",
      "px-6 py-4",
      "border-t",
      "border-border",
      "bg-muted/20",
      "shrink-0",
    ].join(" "),


  closeButton:
    [
      "inline-flex items-center justify-center",
      "rounded-md",
      "h-8 w-8",
      "text-muted-foreground",
      "transition-colors",
      "hover:bg-muted",
      "hover:text-foreground",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-ring",
    ].join(" "),


  closeIcon:
    "h-4 w-4",
} as const;