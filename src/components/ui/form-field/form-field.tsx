import type { FormFieldProps } from "./form-field.types";

export function FormField({
  label,
  helperText,
  error,
  errorMessage,
  htmlFor,
  required,
  disabled,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className={[
            "text-sm font-medium",
            disabled && "opacity-50",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}

          {required && (
            <span className="ml-1 text-danger">*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        errorMessage && (
          <p id={`${htmlFor}-error`} className="text-sm text-danger">
            {errorMessage}
          </p>
        )
      ) : (
        helperText && (
          <p id={`${htmlFor}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}