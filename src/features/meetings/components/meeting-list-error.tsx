"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type MeetingListErrorProps = {
  message: string;
  isNotFound?: boolean;
  onRetry?: () => void;
};

/** Trạng thái lỗi hiển thị thông báo tiếng Việt và nút thử lại hoặc quay về. */
export function MeetingListError({
  message,
  isNotFound = false,
  onRetry,
}: MeetingListErrorProps) {
  return (
    <section
      role="alert"
      className="flex flex-col items-center rounded-lg border border-border bg-surface px-4 py-10 text-center"
    >
      <div
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-lg bg-error-container text-error"
      >
        <AlertCircle className="size-6" />
      </div>
      <h2 className="mt-4 text-headline-sm text-primary-text">
        Không tải được danh sách cuộc họp
      </h2>
      <p className="mt-1 max-w-md text-body-md text-secondary-text">{message}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Thử lại
          </Button>
        ) : null}
        {isNotFound ? (
          <Link
            href="/groups"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-container px-4 text-label-md text-on-primary transition-colors hover:bg-primary-hover"
          >
            Quay lại Nhóm của tôi
          </Link>
        ) : null}
      </div>
    </section>
  );
}
