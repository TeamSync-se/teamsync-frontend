import {
  Calendar,
  CalendarCheck2,
  Clock,
  Users,
  Video,
  Vote,
} from "lucide-react";
import Link from "next/link";
import { MeetingActionNeededBadge } from "@/features/meetings/components/meeting-action-badge";
import { MeetingStatusBadge } from "@/features/meetings/components/meeting-status-badge";
import {
  formatConfirmedSchedule,
  parseSafeExternalLink,
} from "@/features/meetings/format";
import type { MeetingSummary } from "@/features/meetings/types";

type MeetingCardProps = {
  groupId: number;
  meeting: MeetingSummary;
};

/** Thẻ cuộc họp cho màn hình điện thoại từ 360px đến dưới `md`. */
export function MeetingCard({ groupId, meeting }: MeetingCardProps) {
  const isVoting = meeting.status === "VOTING";
  const needsMyVote = isVoting && meeting.isInvited && !meeting.hasMyVote;
  const detailHref = `/groups/${groupId}/meetings/${meeting.id}`;
  const schedule = formatConfirmedSchedule(
    meeting.confirmedStartTime,
    meeting.confirmedEndTime,
  );
  const externalLink = parseSafeExternalLink(meeting.externalLink);

  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md ${
            isVoting
              ? "bg-primary-subtle text-primary-container"
              : "bg-surface-container-low text-secondary"
          }`}
        >
          {isVoting ? (
            <Vote className="size-4" />
          ) : (
            <CalendarCheck2 className="size-4" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <MeetingStatusBadge status={meeting.status} />
            {needsMyVote ? <MeetingActionNeededBadge /> : null}
          </div>
          <Link
            href={detailHref}
            className="break-words text-headline-sm text-primary-text hover:text-primary-container hover:underline"
          >
            {meeting.title}
          </Link>
          {meeting.description ? (
            <p className="line-clamp-2 text-label-sm text-secondary-text">
              {meeting.description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-label-sm text-secondary-text">
        {isVoting || !schedule ? (
          <>
            <p className="flex items-center gap-1.5 text-primary-text">
              <Clock className="size-4 shrink-0 text-primary-container" aria-hidden="true" />
              <span>Đang lấy ý kiến · {meeting.slotCount} khung giờ đề xuất</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Users className="size-4 shrink-0" aria-hidden="true" />
              <span>
                {meeting.totalVoted}/{meeting.totalInvited} thành viên đã biểu quyết
                {meeting.isInvited && meeting.hasMyVote ? " · Đã bình chọn" : ""}
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="flex items-center gap-1.5 text-primary-text">
              <Calendar className="size-4 shrink-0 text-secondary-text" aria-hidden="true" />
              <span>
                {schedule.dateText} · {schedule.timeText}
              </span>
            </p>
            {externalLink ? (
              <a
                href={externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 items-center gap-1.5 text-primary-container hover:underline"
              >
                <Video className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{externalLink.label}</span>
              </a>
            ) : (
              <p>Chưa gắn liên kết họp</p>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 pt-1">
        {needsMyVote ? (
          <Link
            href={detailHref}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-primary-container px-3 text-label-md text-on-primary transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/30"
          >
            <Vote className="size-4 shrink-0" aria-hidden="true" />
            Bình chọn ngay
          </Link>
        ) : null}
        <Link
          href={detailHref}
          className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-border bg-surface text-label-md text-primary-text transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/30 ${
            needsMyVote ? "shrink-0 px-4" : "flex-1 px-3"
          }`}
        >
          Chi tiết
        </Link>
      </div>
    </article>
  );
}
