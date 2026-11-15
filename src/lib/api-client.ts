import { getApiUrl } from "@/lib/env";

/** Lỗi của một trường trong form, backend trả trong `errors` khi `code` là `VALIDATION_ERROR`. */
export type FieldError = {
  field: string;
  message: string;
};

/**
 * Lỗi khi gọi backend. `message` luôn là tiếng Việt, dùng thẳng để hiển thị.
 * Xử lý theo `code`, không theo câu chữ của `message`.
 */
export class ApiError extends Error {
  readonly status: number;
  /** Mã lỗi cố định của backend (ví dụ `EMAIL_ALREADY_EXISTS`); `null` khi không có body lỗi. */
  readonly code: string | null;
  /** Lỗi theo từng trường, để hiện dưới đúng ô nhập; rỗng khi không có. */
  readonly fieldErrors: FieldError[];

  constructor(
    status: number,
    message: string,
    code: string | null = null,
    fieldErrors: FieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
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
  502: "Dịch vụ bên ngoài đang gặp sự cố hoặc không phản hồi. Vui lòng thử lại sau.",
  503: "Dịch vụ bên ngoài đang gặp sự cố hoặc không phản hồi. Vui lòng thử lại sau.",
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseFieldErrors(value: unknown): FieldError[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item): FieldError[] =>
    isRecord(item) &&
    typeof item.field === "string" &&
    typeof item.message === "string"
      ? [{ field: item.field, message: item.message }]
      : [],
  );
}

/**
 * Đọc lỗi dạng `application/problem+json` của backend (`detail`, `code`, `errors`).
 * Không có body hoặc body không đúng dạng thì dùng thông báo mặc định theo mã HTTP.
 */
async function toApiError(response: Response): Promise<ApiError> {
  const fallback = messageForStatus(response.status);
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return new ApiError(response.status, fallback);
  }
  if (!isRecord(body)) return new ApiError(response.status, fallback);

  const detail =
    typeof body.detail === "string" && body.detail.trim() !== ""
      ? body.detail
      : fallback;
  const code = typeof body.code === "string" ? body.code : null;
  return new ApiError(
    response.status,
    detail,
    code,
    parseFieldErrors(body.errors),
  );
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
    throw await toApiError(response);
  }

  if (response.status === 204) return undefined as T;

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(response.status, UNKNOWN_ERROR_MESSAGE);
  }
}
