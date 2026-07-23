export const SKELETON_DEFAULTS = {
  variant: "rectangular",
  label: "Loading",
} as const;

export const SKELETON_DEFAULT_DIMENSIONS: Record<
  "rectangular" | "circular" | "text",
  { width: string; height: string }
> = {
  rectangular: { width: "8rem", height: "1rem" },
  circular: { width: "2.5rem", height: "2.5rem" },
  text: { width: "8rem", height: "0.875rem" },
};
