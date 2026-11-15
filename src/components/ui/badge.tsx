import type { ReactNode } from "react";

type BadgeProps = {
  tone?: "neutral" | "info" | "error";
  children: ReactNode;
};

const TONE_CLASSES = {
  neutral: "border-border text-secondary-text",
  info: "border-primary-fixed-dim text-primary-container",
  error: "border-error-container text-error",
} as const;

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border bg-surface px-2 py-0.5 text-label-sm ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
