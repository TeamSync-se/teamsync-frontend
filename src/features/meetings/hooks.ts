"use client";

import { useQuery } from "@tanstack/react-query";
import { getGroupMeetings } from "@/features/meetings/api";
import type { MeetingFilterStatus } from "@/features/meetings/types";

export const MEETING_LIST_PAGE_SIZE = 20;

export const meetingKeys = {
  all: ["meetings"] as const,
  list: (
    groupId: number | null,
    status: MeetingFilterStatus,
    page: number,
    size: number,
  ) => [...meetingKeys.all, "list", groupId, status, page, size] as const,
};

type UseGroupMeetingsParams = {
  status: MeetingFilterStatus;
  page: number;
  size?: number;
};

/** Lấy danh sách cuộc họp của nhóm theo bộ lọc và trang hiện tại. */
export function useGroupMeetings(
  groupId: number | null,
  { status, page, size = MEETING_LIST_PAGE_SIZE }: UseGroupMeetingsParams,
) {
  return useQuery({
    queryKey: meetingKeys.list(groupId, status, page, size),
    queryFn: ({ signal }) => {
      if (groupId === null) {
        throw new Error("Mã nhóm không hợp lệ.");
      }
      return getGroupMeetings(groupId, { status, page, size, signal });
    },
    enabled: groupId !== null,
  });
}
