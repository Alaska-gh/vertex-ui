export const POPOVER_STYLES = {
  content: `
    fixed
    z-[1000]
    min-w-56
    max-w-sm

    rounded-xl
    border
    border-border

    bg-background
    text-foreground

    shadow-2xl
    shadow-black/10
    ring-1
    ring-black/5

    p-2

    outline-none

    animate-in
    fade-in-0
    zoom-in-95
    duration-200
    ease-out
  `,

  arrow: `
    absolute
    h-3
    w-3
    rotate-45

    border-l
    border-t
    border-border

    bg-background
  `,
} as const;