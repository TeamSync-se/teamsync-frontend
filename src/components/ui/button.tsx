import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const VARIANT_CLASSES = {
  primary:
    "bg-primary-container text-on-primary hover:bg-primary-hover border border-transparent",
  secondary:
    "bg-surface text-primary-text border border-border hover:bg-background",
} as const;

export function Button({
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/30 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
