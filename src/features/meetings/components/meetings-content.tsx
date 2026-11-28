"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MeetingCardList } from "@/features/meetings/components/meeting-card-list";
import { MeetingFilterTabs } from "@/features/meetings/components/meeting-filter-tabs";
import { MeetingListEmpty } from "@/features/meetings/components/meeting-list-empty";
import { MeetingListError } from "@/features/meetings/components/meeting-list-error";
import { MeetingListSkeleton } from "@/features/meetings/components/meeting-list-skeleton";
import { MeetingPagination } from "@/features/meetings/components/meeting-pagination";
import { MeetingTable } from "@/features/meetings/components/meeting-table";
import {
  MEETING_LIST_PAGE_SIZE,
  useGroupMeetings,
} from "@/features/meetings/hooks";
import type { MeetingFilterStatus } from "@/features/meetings/types";
import { ApiError } from "@/lib/api-client";

type MeetingsContentProps = {
  groupId: number;
};

/** Nội dung chính của màn hình 5.1 gồm tiêu đề, bộ lọc và 4 trạng thái dữ liệu. */
export function MeetingsContent({ groupId }: MeetingsContentProps) {
  const [status, setStatus] = useState<MeetingFilterStatus>("ALL");
  const [page, setPage] = useState(0);

  const { data, isPending, isError, error, refetch } = useGroupMeetings(
    groupId,
    { status, page, size: MEETING_LIST_PAGE_SIZE },
  );

  const handleStatusChange = (nextStatus: MeetingFilterStatus) => {
    setStatus(nextStatus);
    setPage(0);
  };

  const errorMessage =
    error instanceof ApiError
      ? error.message
      : "Đã có lỗi xảy ra. Vui lòng thử lại.";
  const isNotFound = error instanceof ApiError && error.code === "NOT_FOUND";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-headline-lg text-primary-text">Lịch họp</h1>
            {data ? (
              <Badge tone="neutral">{data.totalItems} cuộc họp</Badge>
            ) : null}
          </div>
          <p className="max-w-2xl text-body-md text-secondary-text">
            Quản lý các cuộc họp trao đổi định kỳ, lấy ý kiến thời gian và lưu trữ liên kết họp trực tuyến.
          </p>
        </div>
        <Link
          href={`/groups/${groupId}/meetings/new`}
          className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-primary-container px-4 text-label-md text-on-primary transition-colors hover:bg-primary-hover sm:w-auto"
        >
          <Plus className="size-4" aria-hidden="true" />
          Tạo cuộc họp
        </Link>
      </div>

      <MeetingFilterTabs value={status} onChange={handleStatusChange} />

      {isPending ? (
        <MeetingListSkeleton />
      ) : isError ? (
        <MeetingListError
          message={errorMessage}
          isNotFound={isNotFound}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : data && data.items.length > 0 ? (
        <div className="flex flex-col gap-4">
          <MeetingTable groupId={groupId} meetings={data.items} />
          <MeetingCardList groupId={groupId} meetings={data.items} />
          <MeetingPagination
            page={data.page}
            size={data.size}
            itemCount={data.items.length}
            totalItems={data.totalItems}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <MeetingListEmpty
          groupId={groupId}
          filter={status}
          onResetFilter={() => handleStatusChange("ALL")}
        />
      )}
    </div>
  );
}
