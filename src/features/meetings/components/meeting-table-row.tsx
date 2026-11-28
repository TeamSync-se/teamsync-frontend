import {
  Calendar,
  CalendarCheck2,
  Clock,
  Users,
  Video,
  Vote,
} from "lucide-react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { MeetingActionNeededBadge } from "@/features/meetings/components/meeting-action-badge";
import { MeetingStatusBadge } from "@/features/meetings/components/meeting-status-badge";
import {
  formatConfirmedSchedule,
  parseSafeExternalLink,
} from "@/features/meetings/format";
import type { MeetingSummary } from "@/features/meetings/types";

type MeetingTableRowProps = {
  groupId: number;
  meeting: MeetingSummary;
};

/** Một dòng cuộc họp trong bảng danh sách trên màn hình từ `md` trở lên. */
export function MeetingTableRow({ groupId, meeting }: MeetingTableRowProps) {
  const isVoting = meeting.status === "VOTING";
  const needsMyVote = isVoting && meeting.isInvited && !meeting.hasMyVote;
  const detailHref = `/groups/${groupId}/meetings/${meeting.id}`;
  const schedule = formatConfirmedSchedule(
    meeting.confirmedStartTime,
    meeting.confirmedEndTime,
  );
  const externalLink = parseSafeExternalLink(meeting.externalLink);

  return (
    <TableRow
      className={
        needsMyVote
          ? "bg-surface-container-low/50 hover:bg-surface-container-low"
          : "hover:bg-background"
      }
    >
      <TableCell className="max-w-md align-top">
        <div className="flex items-start gap-3">
          <div
            aria-hidden="true"
            className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md ${
              isVoting
                ? "bg-primary-subtle text-primary-container"
                : "bg-surface-container-low text-secondary"
            }`}
          >
            {isVoting ? <Vote className="size-4" /> : <CalendarCheck2 className="size-4" />}
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={detailHref}
                className="text-headline-sm text-primary-text hover:text-primary-container hover:underline"
              >
                {meeting.title}
              </Link>
              {needsMyVote ? <MeetingActionNeededBadge /> : null}
            </div>
            {meeting.description ? (
              <p className="line-clamp-1 text-label-sm text-secondary-text">
                {meeting.description}
              </p>
            ) : null}
            {isVoting ? (
              <p className="mt-0.5 flex items-center gap-1.5 text-label-sm text-secondary-text">
                <Users className="size-3.5 shrink-0" aria-hidden="true" />
                <span>
                  {meeting.totalVoted}/{meeting.totalInvited} thành viên đã biểu quyết
                  {meeting.isInvited && meeting.hasMyVote ? " · Đã bình chọn" : ""}
                </span>
              </p>
            ) : externalLink ? (
              <a
                href={externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex w-fit max-w-full items-center gap-1.5 text-label-sm text-primary-container hover:underline"
              >
                <Video className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{externalLink.label}</span>
              </a>
            ) : (
              <p className="mt-0.5 text-label-sm text-secondary-text">
                Chưa gắn liên kết họp
              </p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap align-top">
        {isVoting || !schedule ? (
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary-text">
              <Clock className="size-4 text-primary-container" aria-hidden="true" />
              Đang lấy ý kiến
            </span>
            <span className="text-label-sm text-secondary-text">
              {meeting.slotCount} khung giờ đề xuất
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary-text">
              <Calendar className="size-4 text-secondary-text" aria-hidden="true" />
              {schedule.dateText}
            </span>
            <span className="inline-flex items-center gap-1.5 text-label-sm text-secondary-text">
              <Clock className="size-4 text-secondary-text" aria-hidden="true" />
              {schedule.timeText}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap align-top">
        <MeetingStatusBadge status={meeting.status} />
      </TableCell>
      <TableCell className="whitespace-nowrap text-right align-top">
        <div className="inline-flex items-center justify-end gap-2">
          {needsMyVote ? (
            <Link
              href={detailHref}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary-container px-3 text-label-md text-on-primary transition-colors hover:bg-primary-hover"
            >
              <Vote className="size-4" aria-hidden="true" />
              Bình chọn ngay
            </Link>
          ) : null}
          <Link
            href={detailHref}
            className="inline-flex h-9 items-center rounded-md border border-border bg-surface px-3 text-label-md text-primary-text transition-colors hover:bg-background"
          >
            Chi tiết
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
