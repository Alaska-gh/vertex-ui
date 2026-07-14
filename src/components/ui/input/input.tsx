import { forwardRef } from "react";

import { inputVariants} from "./input.variants";

import type { InputProps} from "./input.types";

import { cn } from "@/lib/utils";


export const VInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      fullWidth,
      id,
      ...props
    },
    ref
  ) => {

    const inputId = id ?? crypto.randomUUID();


    return (
      <div
        className={cn( "flex flex-col gap-1.5", fullWidth && "w-full"
        )}
      >
        {label && (
         <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}


        <div className="relative flex items-center" >

          {leftIcon && (
            <span className=" absolute left-3 text-gray-400 flex items-center">
              {leftIcon}
            </span>
          )}


          <input ref={ref} id={inputId}    className={cn(inputVariants({
                variant,
                size,
                error,
                fullWidth,
              }),

              leftIcon && "pl-10",

              rightIcon && "pr-10",

              className
            )}
            {...props}
          />


          {rightIcon && (
            <span className=" absolute right-3 text-gray-400 flex items-center">
              {rightIcon}
            </span>
          )}

        </div>


        {errorMessage ? (
          <p className="text-sm text-danger">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="text-sm text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);


VInput.displayName = "VInput";