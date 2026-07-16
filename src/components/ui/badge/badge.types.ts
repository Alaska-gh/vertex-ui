import type { Size } from "@/types/components";
import type { Radius } from "@/types/variants";
import type { HTMLAttributes } from "react";


export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: Size;
  radius?: Radius;
}
