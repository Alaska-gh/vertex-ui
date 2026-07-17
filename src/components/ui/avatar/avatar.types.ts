import type { Radius } from "@/types/variants";
import type { ComponentPropsWithoutRef } from "react";
import type * as AvatarPrimitive from "@radix-ui/react-avatar";



export interface AvatarProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: Radius;
}