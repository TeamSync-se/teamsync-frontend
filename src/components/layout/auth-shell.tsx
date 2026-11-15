import type { ReactNode } from "react";

/** Khung cho trang chưa đăng nhập: thẻ nội dung căn giữa trên nền xám nhạt. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <p className="mb-6 text-headline-md text-primary-container">TeamSync</p>
      <main className="w-full max-w-md">{children}</main>
    </div>
  );
}
