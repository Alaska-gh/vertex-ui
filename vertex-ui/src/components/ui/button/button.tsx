import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.types";


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
     className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    }, ref ) => {

    const Comp = asChild ? Slot : "button";

    return (
      <Comp ref={ref}
        className={cn(buttonVariants({variant, size }), className )}
        disabled={ disabled || loading }
        {...props}
        >

        {loading && (
          <span 
          className=" h-4 w-4 animate-spin 
          rounded-full border-2 border-current border-t-transparent"
          />
        )}

        {children}
      </Comp>

    );
  }
);


Button.displayName = "Button";