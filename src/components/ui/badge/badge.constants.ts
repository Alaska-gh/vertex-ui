
import type { Radius } from "@/types/variants";
import type { BadgeVariant } from "./badge.types";
import type { Size } from "@/types/components";

export const BADGE_DEFAULTS: {
  variant: BadgeVariant;
  size: Size;
  radius: Radius;
} = {
  variant: "default",
  size: "md",
  radius: "full",
};