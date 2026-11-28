import { ApiError } from "@/lib/api-client";
import type { Page } from "@/lib/api-types";
import type {
  GetGroupMeetingsParams,
  MeetingFilterStatus,
  MeetingSummary,
} from "@/features/meetings/types";

type MockMeetingEntry = {
  summary: Omit<MeetingSummary, "groupId">;
  earliestSlotStartTime?: string;
};

const MOCK_MEETINGS: MockMeetingEntry[] = [
  {
    summary: {
      id: 10,
      title: "Họp kiểm tra tiến độ sprint 2",
      description:
        "Rà soát các API đã hoàn thiện và thống nhất kế hoạch tích hợp giữa frontend và backend.",
      status: "VOTING",
      externalLink: null,
      confirmedStartTime: null,
      confirmedEndTime: null,
      creator: { id: 1, fullName: "Nguyễn Minh Tuấn" },
      totalInvited: 5,
      totalVoted: 4,
      hasMyVote: false,
      slotCount: 3,
      isInvited: true,
      createdAt: "2026-11-26T07:00:00Z",
    },
    earliestSlotStartTime: "2027-01-10T02:00:00Z",
  },
  {
    summary: {
      id: 11,
      title: "Họp thống nhất hợp đồng API giai đoạn 2",
      description:
        "Đối chiếu trường dữ liệu, mã lỗi Problem Details và luồng thông báo trong ứng dụng.",
      status: "VOTING",
      externalLink: "https://meet.google.com/cnpm-api-sync",
      confirmedStartTime: null,
      confirmedEndTime: null,
      creator: { id: 2, fullName: "Lê Hoàng An" },
      totalInvited: 5,
      totalVoted: 3,
      hasMyVote: true,
      slotCount: 2,
      isInvited: true,
      createdAt: "2026-11-27T04:00:00Z",
    },
    earliestSlotStartTime: "2027-01-12T07:00:00Z",
  },
  {
    summary: {
      id: 12,
      title: "Họp nhóm thiết kế giao diện",
      description:
        "Rà soát lại khoảng cách 8px và trạng thái hiển thị trên màn hình điện thoại 360px.",
      status: "VOTING",
      externalLink: null,
      confirmedStartTime: null,
      confirmedEndTime: null,
      creator: { id: 4, fullName: "Phạm Quỳnh Chi" },
      totalInvited: 3,
      totalVoted: 2,
      hasMyVote: false,
      slotCount: 2,
      isInvited: false,
      createdAt: "2026-11-28T01:30:00Z",
    },
    earliestSlotStartTime: "2027-01-14T02:00:00Z",
  },
  {
    summary: {
      id: 8,
      title: "Họp phân chia nhiệm vụ",
      description:
        "Thảo luận kiến trúc hệ thống tổng quan và phân bổ đầu việc cho các thành viên.",
      status: "CONFIRMED",
      externalLink: "https://meet.google.com/xyz-abcd-efg",
      confirmedStartTime: "2027-01-15T02:00:00Z",
      confirmedEndTime: "2027-01-15T03:30:00Z",
      creator: { id: 1, fullName: "Nguyễn Minh Tuấn" },
      totalInvited: 5,
      totalVoted: 5,
      hasMyVote: true,
      slotCount: 2,
      isInvited: true,
      createdAt: "2026-11-20T03:00:00Z",
    },
  },
  {
    summary: {
      id: 9,
      title: "Họp rà soát kịch bản kiểm thử",
      description:
        "Kiểm tra lại danh sách ca kiểm thử tích hợp trước khi nghiệm thu Milestone 1.",
      status: "CONFIRMED",
      externalLink: null,
      confirmedStartTime: "2027-01-20T07:00:00Z",
      confirmedEndTime: "2027-01-20T08:30:00Z",
      creator: { id: 3, fullName: "Trần Thái Bình" },
      totalInvited: 4,
      totalVoted: 4,
      hasMyVote: true,
      slotCount: 3,
      isInvited: true,
      createdAt: "2026-11-22T05:00:00Z",
    },
  },
  {
    summary: {
      id: 5,
      title: "Họp khởi động đồ án CNPM",
      description:
        "Chốt đề tài, phạm vi Milestone 1 và công cụ quản lý mã nguồn cho cả nhóm.",
      status: "CONFIRMED",
      externalLink: "https://meet.google.com/cba-zyxw-vut",
      confirmedStartTime: "2026-11-05T02:00:00Z",
      confirmedEndTime: "2026-11-05T03:30:00Z",
      creator: { id: 1, fullName: "Nguyễn Minh Tuấn" },
      totalInvited: 5,
      totalVoted: 5,
      hasMyVote: true,
      slotCount: 2,
      isInvited: true,
      createdAt: "2026-11-01T02:00:00Z",
    },
  },
];

function waitWithSignal(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(new DOMException("Aborted", "AbortError"));
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);
      resolve();
    }, ms);

    function handleAbort() {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

function isPastMeeting(entry: MockMeetingEntry, nowMs: number): boolean {
  if (entry.summary.status !== "CONFIRMED" || !entry.summary.confirmedEndTime) {
    return false;
  }
  return Date.parse(entry.summary.confirmedEndTime) <= nowMs;
}

function matchesFilter(
  entry: MockMeetingEntry,
  filter: MeetingFilterStatus | undefined,
  nowMs: number,
): boolean {
  const past = isPastMeeting(entry, nowMs);
  if (!filter) return entry.summary.status === "VOTING" || !past;
  if (filter === "ALL") return true;
  if (filter === "VOTING") return entry.summary.status === "VOTING";
  if (filter === "CONFIRMED") return entry.summary.status === "CONFIRMED";
  if (filter === "UPCOMING") {
    return entry.summary.status === "CONFIRMED" && !past;
  }
  return past;
}

function startTimestamp(entry: MockMeetingEntry): number {
  const raw =
    entry.summary.confirmedStartTime ??
    entry.earliestSlotStartTime ??
    entry.summary.createdAt;
  return Date.parse(raw);
}

function compareEntries(
  a: MockMeetingEntry,
  b: MockMeetingEntry,
  nowMs: number,
): number {
  const aPast = isPastMeeting(a, nowMs);
  const bPast = isPastMeeting(b, nowMs);
  if (aPast !== bPast) return aPast ? 1 : -1;

  if (aPast) {
    const diff = startTimestamp(b) - startTimestamp(a);
    return diff !== 0 ? diff : b.summary.id - a.summary.id;
  }

  const startDiff = startTimestamp(a) - startTimestamp(b);
  if (startDiff !== 0) return startDiff;
  const createdDiff =
    Date.parse(a.summary.createdAt) - Date.parse(b.summary.createdAt);
  return createdDiff !== 0 ? createdDiff : a.summary.id - b.summary.id;
}

/** Lấy danh sách cuộc họp của nhóm có phân trang và lọc theo trạng thái. */
export async function getGroupMeetings(
  groupId: number,
  params: GetGroupMeetingsParams = {},
): Promise<Page<MeetingSummary>> {
  // TODO(#26): nối API thật GET /api/groups/{groupId}/meetings (TeamSync-se/teamwork-backend#31) qua apiFetch
  const page = Math.max(0, params.page ?? 0);
  const size = Math.min(100, Math.max(1, params.size ?? 20));

  await waitWithSignal(250, params.signal);

  if (groupId === 999) {
    throw new ApiError(
      404,
      "Không tìm thấy nhóm hoặc bạn không thuộc nhóm này.",
      "NOT_FOUND",
    );
  }

  if (groupId === 500) {
    throw new ApiError(
      500,
      "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.",
      "INTERNAL_ERROR",
    );
  }

  if (groupId === 2) {
    return { items: [], page, size, totalItems: 0, totalPages: 0 };
  }

  const nowMs = Date.now();
  const filtered = MOCK_MEETINGS.filter((entry) =>
    matchesFilter(entry, params.status, nowMs),
  ).sort((a, b) => compareEntries(a, b, nowMs));

  const start = page * size;
  const items = filtered
    .slice(start, start + size)
    .map((entry) => ({ ...entry.summary, groupId }));

  return {
    items,
    page,
    size,
    totalItems: filtered.length,
    totalPages: Math.ceil(filtered.length / size),
  };
}
