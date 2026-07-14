type ButtonSpinnerProps = {
  className?: string;
};

export function ButtonSpinner({className}: ButtonSpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "h-4",
        "w-4",
        "animate-spin",
        "rounded-full",
        "border-2",
        "border-current",
        "border-t-transparent",
        className,
      ].join(" ")}
    />
  );
}