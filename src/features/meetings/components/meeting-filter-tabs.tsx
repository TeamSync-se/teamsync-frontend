"use client";

import type { MeetingFilterStatus } from "@/features/meetings/types";

type FilterOption = {
  value: MeetingFilterStatus;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: "ALL", label: "Tất cả" },
  { value: "CONFIRMED", label: "Đã chốt" },
  { value: "VOTING", label: "Đang bình chọn" },
];

type MeetingFilterTabsProps = {
  value: MeetingFilterStatus;
  onChange: (nextStatus: MeetingFilterStatus) => void;
};

/** Thanh 3 tab lọc trạng thái cuộc họp khớp tham số query `status` của API. */
export function MeetingFilterTabs({ value, onChange }: MeetingFilterTabsProps) {
  return (
    <div
      role="group"
      aria-label="Lọc cuộc họp theo trạng thái"
      className="flex w-full flex-wrap items-center gap-1 rounded-lg border border-border bg-surface p-1 sm:inline-flex sm:w-auto"
    >
      {FILTER_OPTIONS.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`flex-1 whitespace-nowrap rounded-md px-3 py-1.5 text-label-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/30 sm:flex-none ${
              active
                ? "bg-primary-subtle text-primary-container"
                : "text-secondary-text hover:bg-background hover:text-primary-text"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
