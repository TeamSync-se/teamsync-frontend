import { Badge } from "@/components/ui/badge";

/** Nhãn nhắc thành viên được mời nhưng chưa gửi bình chọn. */
export function MeetingActionNeededBadge() {
  return (
    <Badge tone="info">
      <span className="whitespace-nowrap">Cần phản hồi</span>
    </Badge>
  );
}
