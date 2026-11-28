import { MeetingListError } from "@/features/meetings/components/meeting-list-error";
import { MeetingsContent } from "@/features/meetings/components/meetings-content";
import { parseGroupId } from "@/features/meetings/format";

type MeetingsViewProps = {
  rawGroupId: string;
};

/** Giao diện màn hình 5.1 Danh sách cuộc họp. */
export function MeetingsView({ rawGroupId }: MeetingsViewProps) {
  const groupId = parseGroupId(rawGroupId);

  if (groupId === null) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-headline-lg text-primary-text">Lịch họp</h1>
        <MeetingListError
          message="Mã nhóm trên đường dẫn không hợp lệ."
          isNotFound
        />
      </div>
    );
  }

  return <MeetingsContent key={groupId} groupId={groupId} />;
}
