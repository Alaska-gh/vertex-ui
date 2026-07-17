import { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

import { AVATAR_DEFAULTS } from "./avatar.constants";
import {
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
} from "./avatar.variants";

import type { AvatarProps } from "./avatar.types";

export const VAvatar = forwardRef<
  HTMLSpanElement,
  AvatarProps
>(
  (
    {
      src,
      alt = "Avatar",
      fallback,

      size = AVATAR_DEFAULTS.size,
      radius = AVATAR_DEFAULTS.radius,

      className,

      ...props
    },
    ref,
  ) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          avatarVariants({
            size,
            radius,
          }),
          className,
        )}
        {...props}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className={avatarImageVariants()}
          />
        )}

        <AvatarPrimitive.Fallback
          className={avatarFallbackVariants({
            size,
          })}
        >
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  },
);

VAvatar.displayName = "VAvatar";