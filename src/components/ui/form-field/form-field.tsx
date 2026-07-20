import { cn } from "@/lib/utils";
import type { FormFieldProps } from "./form-field.types";

export function VFormField({
  label,
  helperText,
  error,
  errorMessage,
  htmlFor,
  required,
  disabled,
  children,
  layout = "vertical",
  labelClassName,
}: FormFieldProps) {
  if (layout == "horizontal") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          {children}

          {label && (
            <label
              htmlFor={htmlFor}
              className={cn(
                "text-sm font-medium",
                disabled && "text-muted-foreground",
                labelClassName,
              )}
            >
              {label}

              {required && <span className="text-danger ml-1">*</span>}
            </label>
          )}
        </div>

        {helperText && !error && (
          <p className="text-muted-foreground text-sm">{helperText}</p>
        )}

        {error && errorMessage && (
          <p className="text-danger text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
  // default to vertical layout
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className={["text-sm font-medium", disabled && "opacity-50"]
            .filter(Boolean)
            .join(" ")}
        >
          {label}

          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {children}

      {error
        ? errorMessage && (
            <p id={`${htmlFor}-error`} className="text-danger text-sm">
              {errorMessage}
            </p>
          )
        : helperText && (
            <p id={`${htmlFor}-helper`} className="text-sm text-gray-500">
              {helperText}
            </p>
          )}
    </div>
  );
}
