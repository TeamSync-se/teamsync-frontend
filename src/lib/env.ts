/**
 * Đọc biến môi trường. Phải truy cập `process.env.NEXT_PUBLIC_*` trực tiếp
 * để Next.js thay giá trị vào lúc build, nên không gom qua object động.
 * Kiểm tra lúc gọi (không phải lúc import) để `pnpm build` không vỡ khi chưa có `.env.local`.
 */
export function getApiUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL;

  if (!raw) {
    throw new Error(
      "Thiếu biến NEXT_PUBLIC_API_URL. Sao chép .env.example thành .env.local và đặt địa chỉ backend.",
    );
  }

  try {
    new URL(raw);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_API_URL không phải địa chỉ hợp lệ: "${raw}". Ví dụ: http://localhost:8080`,
    );
  }

  return raw.replace(/\/+$/, "");
}
