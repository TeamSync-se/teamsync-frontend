"use client";

import { CalendarX2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { MeetingFilterStatus } from "@/features/meetings/types";

type MeetingListEmptyProps = {
  groupId: number;
  filter: MeetingFilterStatus;
  onResetFilter: () => void;
};

/** Trạng thái rỗng: phân biệt nhóm chưa có cuộc họp với không khớp bộ lọc. */
export function MeetingListEmpty({
  groupId,
  filter,
  onResetFilter,
}: MeetingListEmptyProps) {
  const isAll = filter === "ALL";
  const emptyHint =
    filter === "CONFIRMED"
      ? "Chưa có cuộc họp nào đã chốt lịch."
      : "Hiện không có cuộc họp nào đang lấy ý kiến bình chọn.";

  return (
    <section className="flex flex-col items-center rounded-lg border border-border bg-surface px-4 py-12 text-center">
      <div
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-lg bg-surface-container-low text-secondary-text"
      >
        <CalendarX2 className="size-6" />
      </div>
      <h2 className="mt-4 text-headline-sm text-primary-text">
        {isAll ? "Chưa có cuộc họp nào" : "Không có cuộc họp phù hợp"}
      </h2>
      <p className="mt-1 max-w-md text-body-md text-secondary-text">
        {isAll
          ? "Tạo cuộc họp đầu tiên để đề xuất khung giờ và lấy ý kiến các thành viên trong nhóm."
          : emptyHint}
      </p>
      <div className="mt-5">
        {isAll ? (
          <Link
            href={`/groups/${groupId}/meetings/new`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary-container px-4 text-label-md text-on-primary transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/30"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tạo cuộc họp
          </Link>
        ) : (
          <Button variant="secondary" onClick={onResetFilter}>
            Xem tất cả cuộc họp
          </Button>
        )}
      </div>
    </section>
  );
}
