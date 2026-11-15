import { getApiUrl } from "@/lib/env";

/** Lỗi khi gọi backend. `message` luôn là tiếng Việt, dùng thẳng để hiển thị. */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Được gửi dạng JSON. */
  body?: unknown;
  /** Thêm vào query string; giá trị `undefined` bị bỏ qua. */
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
};

const STATUS_MESSAGES: Record<number, string> = {
  400: "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại.",
  401: "Phiên đăng nhập đã hết hạn hoặc chưa đăng nhập. Vui lòng đăng nhập lại.",
  403: "Bạn không có quyền thực hiện thao tác này.",
  404: "Không tìm thấy dữ liệu yêu cầu.",
  409: "Dữ liệu bị trùng hoặc xung đột với dữ liệu hiện có.",
  413: "Tệp hoặc dữ liệu gửi lên quá lớn.",
  422: "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại.",
  429: "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.",
};

const SERVER_ERROR_MESSAGE = "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";
const NETWORK_ERROR_MESSAGE =
  "Không kết nối được tới máy chủ. Kiểm tra mạng rồi thử lại.";
const UNKNOWN_ERROR_MESSAGE = "Đã có lỗi xảy ra. Vui lòng thử lại.";

function messageForStatus(status: number): string {
  if (STATUS_MESSAGES[status]) return STATUS_MESSAGES[status];
  if (status >= 500) return SERVER_ERROR_MESSAGE;
  return UNKNOWN_ERROR_MESSAGE;
}

function buildUrl(path: string, query: ApiRequestOptions["query"]): string {
  const url = new URL(
    `${getApiUrl()}${path.startsWith("/") ? path : `/${path}`}`,
  );
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

/**
 * Hàm duy nhất gọi backend. Mọi `api.ts` của tính năng đi qua đây.
 * Ném `ApiError` với thông báo tiếng Việt khi thất bại.
 */
export async function apiFetch<T>(
  path: string,
  { method = "GET", body, query, signal }: ApiRequestOptions = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      signal,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(0, NETWORK_ERROR_MESSAGE);
  }

  if (!response.ok) {
    throw new ApiError(response.status, messageForStatus(response.status));
  }

  if (response.status === 204) return undefined as T;

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(response.status, UNKNOWN_ERROR_MESSAGE);
  }
}
