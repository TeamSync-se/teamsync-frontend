"use client";

import { Button } from "@/components/ui/button";

type MeetingPaginationProps = {
  page: number;
  size: number;
  itemCount: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
};

/** Thanh hiển thị số bản ghi và điều hướng phân trang (page đếm từ 0). */
export function MeetingPagination({
  page,
  size,
  itemCount,
  totalItems,
  totalPages,
  onPageChange,
}: MeetingPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const start = totalItems === 0 ? 0 : page * size + 1;
  const end = totalItems === 0 ? 0 : page * size + itemCount;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-label-sm text-secondary-text sm:flex-row sm:items-center sm:justify-between">
      <p>
        {safeTotalPages <= 1
          ? `Hiển thị ${itemCount} trên tổng số ${totalItems} cuộc họp`
          : `Hiển thị ${start}–${end} trên tổng số ${totalItems} cuộc họp`}
      </p>
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <Button
          variant="secondary"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          className="h-8 px-3 text-label-sm"
        >
          Trước
        </Button>
        <span className="px-2 text-label-sm text-primary-text">
          Trang {page + 1} / {safeTotalPages}
        </span>
        <Button
          variant="secondary"
          disabled={page + 1 >= safeTotalPages}
          onClick={() => onPageChange(page + 1)}
          className="h-8 px-3 text-label-sm"
        >
          Sau
        </Button>
      </div>
    </div>
  );
}
