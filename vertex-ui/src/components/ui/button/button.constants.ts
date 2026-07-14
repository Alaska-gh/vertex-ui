export const BUTTON_DEFAULTS = {
  variant: "primary",
  size: "md",
  type: "button",
} as const;

export const BUTTON_WARNINGS = {
  iconOnly:
    'Vertex UI: Icon-only buttons should include an "aria-label" or "aria-labelledby".',
} as const;