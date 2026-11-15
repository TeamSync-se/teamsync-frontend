import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Nhãn hiển thị phía trên ô nhập. */
  label?: string;
  /** Thông báo lỗi tiếng Việt; có giá trị thì ô nhập chuyển sang kiểu lỗi. */
  error?: string;
};

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-label-md text-primary-text">
          {label}
        </label>
      )}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`h-10 rounded-md border bg-surface px-3 text-body-md text-primary-text placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-primary-container/30 disabled:bg-background ${
          error ? "border-error" : "border-border focus:border-primary-container"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-label-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
