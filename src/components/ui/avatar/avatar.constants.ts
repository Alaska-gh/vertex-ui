import type { AvatarProps } from "./avatar.types";

export const AVATAR_DEFAULTS = {
  size: "md",
  radius: "full",
} satisfies Pick<
  AvatarProps,
  "size" | "radius"
>;