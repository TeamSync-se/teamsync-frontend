import { MeetingCard } from "@/features/meetings/components/meeting-card";
import type { MeetingSummary } from "@/features/meetings/types";

type MeetingCardListProps = {
  groupId: number;
  meetings: MeetingSummary[];
};

/** Danh sách thẻ cuộc họp cho màn hình điện thoại từ 360px đến dưới `md`. */
export function MeetingCardList({ groupId, meetings }: MeetingCardListProps) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} groupId={groupId} meeting={meeting} />
      ))}
    </div>
  );
}
