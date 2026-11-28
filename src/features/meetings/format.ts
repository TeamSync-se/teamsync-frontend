const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: VIETNAM_TIMEZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: VIETNAM_TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export type ConfirmedScheduleDisplay = {
  dateText: string;
  timeText: string;
};

export type SafeExternalLink = {
  href: string;
  label: string;
};

/** Kiểm tra chuỗi `groupId` trên URL có phải số nguyên dương hợp lệ hay không. */
export function parseGroupId(rawGroupId: string): number | null {
  if (!/^[1-9]\d*$/.test(rawGroupId)) return null;
  const parsed = Number(rawGroupId);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

/** Đổi cặp thời điểm UTC (`Z`) sang ngày và khung giờ Việt Nam (`Asia/Ho_Chi_Minh`). */
export function formatConfirmedSchedule(
  startTimeIso: string | null,
  endTimeIso: string | null,
): ConfirmedScheduleDisplay | null {
  if (!startTimeIso || !endTimeIso) return null;

  const startDate = new Date(startTimeIso);
  const endDate = new Date(endTimeIso);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null;
  }

  const startDay = dateFormatter.format(startDate);
  const endDay = dateFormatter.format(endDate);

  return {
    dateText: startDay === endDay ? startDay : `${startDay} - ${endDay}`,
    timeText: `${timeFormatter.format(startDate)} - ${timeFormatter.format(endDate)}`,
  };
}

/** Chỉ cho phép liên kết `http:` hoặc `https:` và rút gọn nhãn hiển thị. */
export function parseSafeExternalLink(
  rawUrl: string | null,
): SafeExternalLink | null {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    const cleanPath =
      url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");
    return {
      href: url.toString(),
      label: `${url.host}${cleanPath}`,
    };
  } catch {
    return null;
  }
}
