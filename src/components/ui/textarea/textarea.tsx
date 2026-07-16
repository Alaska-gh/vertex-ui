import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { TextareaProps } from "./textarea.types";
import { FormField } from "../form-field";
import { cn } from "@/lib/utils";
import { textareaVariants } from "./textarea.variants";

export const VTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      resize,
      radius,
      error,
      label,
      helperText,
      showCount,
      maxLength,
      minRows,
      maxRows,
      errorMessage,
      disabled,
      required,
      fullWidth,
      autoResize,
      id,
      ...props
    },
    ref,
  ) => {
    const [count, setCount] = useState(
      props.defaultValue?.toString().length ??
        props.value?.toString().length ??
        0,
    );
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (autoResize && textareaRef.current) {
        resizeTextarea(textareaRef.current);
      }
    }, [autoResize, props.value]);

    useEffect(() => {
      if (props.value !== undefined) {
        setCount(props.value.toString().length);
      }
    }, [props.value]);

    useEffect(() => {
      const textarea = textareaRef.current;

      if (!textarea || !maxRows) return;

      textarea.style.maxHeight = `${maxRows * 24}px`;
    }, [maxRows]);

    const resizeTextarea = (element: HTMLTextAreaElement) => {
      element.style.height = "auto";
      element.style.overflowY = "hidden";
      element.style.height = `${element.scrollHeight}px`;
    };

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <FormField
        label={label}
        helperText={helperText}
        error={!!error}
        errorMessage={errorMessage}
        htmlFor={textareaId}
        required={required}
        disabled={disabled}
      >
        <>
          <textarea
            ref={setRefs}
            id={textareaId}
            rows={props.rows ?? minRows ?? 3}
            disabled={disabled}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
            }
            className={cn(
              textareaVariants({
                variant,
                size,
                radius,
                error,
                fullWidth,
                resize,
              }),
              className,
            )}
            onInput={(event) => {
              if (autoResize) {
                resizeTextarea(event.currentTarget);
              }
              setCount(event.currentTarget.value.length);
              props.onInput?.(event);
            }}
            {...props}
          />

          {showCount && maxLength && (
            <p
              className={cn(
                "text-right text-xs",
                count >= maxLength - 5
                  ? "text-danger"
                  : "text-muted-foreground",
              )}
            >
              {count} / {maxLength}
            </p>
          )}
        </>
      </FormField>
    );
  },
);

VTextarea.displayName = "VTextarea";
