import {
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import { MeetingTableRow } from "@/features/meetings/components/meeting-table-row";
import type { MeetingSummary } from "@/features/meetings/types";

type MeetingTableProps = {
  groupId: number;
  meetings: MeetingSummary[];
};

/** Bảng danh sách cuộc họp cho màn hình từ `md` trở lên. */
export function MeetingTable({ groupId, meetings }: MeetingTableProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHead>
          <TableRow className="bg-surface-container-low">
            <TableHeaderCell>Tên / Nội dung cuộc họp</TableHeaderCell>
            <TableHeaderCell>Thời gian</TableHeaderCell>
            <TableHeaderCell>Trạng thái</TableHeaderCell>
            <TableHeaderCell className="text-right">Thao tác</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((meeting) => (
            <MeetingTableRow
              key={meeting.id}
              groupId={groupId}
              meeting={meeting}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
