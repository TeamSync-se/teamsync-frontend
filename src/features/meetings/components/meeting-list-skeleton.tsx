/** Trạng thái đang tải dữ liệu, giữ cấu trúc bảng/thẻ tránh giật bố cục. */
export function MeetingListSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Đang tải danh sách cuộc họp">
      <div className="flex flex-col gap-3 md:hidden">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-lg border border-border bg-surface p-4"
          >
            <div className="h-4 w-24 rounded-md bg-surface-container" />
            <div className="mt-3 h-5 w-3/4 rounded-md bg-surface-container" />
            <div className="mt-2 h-4 w-full rounded-md bg-surface-container-low" />
            <div className="mt-4 h-9 w-full rounded-md bg-surface-container-low" />
          </div>
        ))}
      </div>
      <div className="hidden animate-pulse overflow-hidden rounded-lg border border-border bg-surface md:block">
        <div className="h-11 border-b border-border bg-surface-container-low" />
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-6 border-b border-border px-4 py-4 last:border-b-0"
          >
            <div className="flex-1 space-y-2">
              <div className="h-5 w-64 rounded-md bg-surface-container" />
              <div className="h-4 w-96 rounded-md bg-surface-container-low" />
            </div>
            <div className="h-8 w-28 rounded-md bg-surface-container-low" />
            <div className="h-6 w-24 rounded-md bg-surface-container" />
            <div className="h-9 w-24 rounded-md bg-surface-container-low" />
          </div>
        ))}
      </div>
    </div>
  );
}
