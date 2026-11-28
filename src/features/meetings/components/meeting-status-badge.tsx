import { Badge } from "@/components/ui/badge";
import type { MeetingStatus } from "@/features/meetings/types";

type MeetingStatusBadgeProps = {
  status: MeetingStatus;
};

/** Nhãn trạng thái cuộc họp theo quy ước Milestone 1. */
export function MeetingStatusBadge({ status }: MeetingStatusBadgeProps) {
  const isVoting = status === "VOTING";

  return (
    <Badge tone={isVoting ? "info" : "neutral"}>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${
            isVoting ? "bg-primary-container" : "bg-secondary"
          }`}
        />
        {isVoting ? "Đang bình chọn" : "Đã chốt"}
      </span>
    </Badge>
  );
}
