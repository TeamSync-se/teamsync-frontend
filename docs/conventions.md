# Quy ước viết code frontend

Dành cho người viết và người review code trong repo. Các mục ghi "đề xuất" là phần chưa chốt, xem [roadmap.md](roadmap.md#cần-chốt-trong-buổi-họp).

## Next.js 16

Phiên bản Next.js trong repo mới hơn phần lớn bài hướng dẫn trên mạng và có thay đổi so với các bản cũ. Khi không chắc một API, đọc tài liệu đi kèm đúng phiên bản ở `node_modules/next/dist/docs/` thay vì làm theo trí nhớ hay bài viết cũ.

## Tổ chức thư mục

```text
src/
  app/                    Route, layout, loading, error
    (auth)/               Nhóm route chưa đăng nhập: đăng nhập, đăng ký
    (app)/                Nhóm route đã đăng nhập, dùng chung sidebar và header
  components/
    ui/                   Thành phần cơ bản: Button, Input, Card, Modal, Badge, Table
    layout/               Sidebar, Header, khung trang
  features/
    <tính-năng>/
      components/         Thành phần chỉ tính năng này dùng
      api.ts              Hàm gọi API của tính năng
      hooks.ts            Hook của tính năng
      types.ts            Kiểu dữ liệu của tính năng
  lib/
    api-client.ts         Một chỗ duy nhất gọi fetch tới backend
    env.ts                Đọc và kiểm tra biến môi trường
```

Tên tính năng thống nhất với phạm vi commit: `auth`, `groups`, `chat`, `resources`, `tasks`, `meetings`, `dashboard`.

Quy tắc phụ thuộc:

- `app/` chỉ ghép nối: lấy tham số route, gọi thành phần từ `features/`. Không viết nghiệp vụ trong `page.tsx`.
- `features/a` không import từ `features/b`. Thứ gì hai tính năng cùng cần thì đưa lên `components/` hoặc `lib/`.
- `components/ui` không biết gì về nghiệp vụ và không gọi API.
- Import bằng alias `@/`, ví dụ `@/components/ui/button`. Không dùng `../../..`.

## Đặt tên

| Thứ | Quy ước | Ví dụ |
| --- | --- | --- |
| File và thư mục | kebab-case | `task-list.tsx`, `use-tasks.ts` |
| Component | PascalCase, named export | `export function TaskList()` |
| Hook | camelCase, bắt đầu bằng `use` | `useTasks` |
| Biến, hàm | camelCase | `groupId`, `formatDate` |
| Kiểu, interface | PascalCase | `Task`, `GroupMember` |
| Hằng số | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
| Đường dẫn URL | tiếng Anh, kebab-case | `/groups/[groupId]/tasks` |

Tên trong code viết bằng tiếng Anh. Chữ hiển thị cho người dùng viết bằng tiếng Việt có dấu. `page.tsx` và `layout.tsx` dùng default export theo yêu cầu của Next.js, còn lại dùng named export.

## TypeScript

- Giữ `strict`. Không dùng `any`; chưa biết kiểu thì dùng `unknown` rồi thu hẹp.
- Không dùng `@ts-ignore`. Nếu buộc phải dùng `@ts-expect-error` thì ghi lý do bên cạnh.
- Kiểu dữ liệu trả về từ API khai báo trong `features/<tính-năng>/types.ts`, khớp với hợp đồng API đã chốt với backend.
- Props của component khai báo bằng `type` hoặc `interface` ngay trên component.

## Component

- Mặc định là Server Component. Chỉ thêm `"use client"` khi cần state, effect, sự kiện hoặc API của trình duyệt, và đặt nó ở component nhỏ nhất có thể.
- Một component một file, dưới khoảng 150 dòng. Dài hơn thì tách.
- Không lấy dữ liệu trong `useEffect` rải rác; đi qua hàm trong `api.ts` và hook của tính năng.
- Mỗi màn hình lấy dữ liệu phải xử lý đủ bốn trạng thái: đang tải, rỗng, lỗi, có dữ liệu.
- Dùng `next/link` để chuyển trang và `next/image` cho ảnh.

## Giao diện

Nguồn chuẩn là hệ thiết kế **Slate** (`DESIGN.md`) và 27 màn hình prototype trong PA02 mục 5.

- Màu, cỡ chữ, bo góc, khoảng cách khai báo một lần trong `src/app/globals.css` bằng `@theme` của Tailwind 4, rồi dùng qua class (`bg-primary`, `text-secondary-text`). Không viết mã màu trực tiếp trong component.
- Khoảng cách theo bội số 8px (4px cho chi tiết nhỏ). Bo góc 6–8px cho nút, ô nhập, thẻ.
- Phân tách bằng viền 1px, hạn chế đổ bóng. Không gradient, không hiệu ứng kính mờ.
- Phông chữ Inter. Chữ nội dung 14–16px.
- Ưu tiên class Tailwind. Không viết CSS riêng nếu Tailwind làm được, không dùng `style={{}}` trừ giá trị tính lúc chạy.
- Dùng lại thành phần trong `components/ui` trước khi tạo mới. Thiếu thì bổ sung vào đó để người khác dùng chung.
- Giao diện phải dùng được ở bề rộng điện thoại (từ 360px) đến màn hình máy tính.
- HTML prototype chỉ để tham khảo bố cục. Không chép nguyên vào dự án, vì nó dùng Tailwind bản CDN và cấu hình khác.

## Gọi API

- Mọi lời gọi tới backend đi qua `lib/api-client.ts`. Không gọi `fetch` trực tiếp trong component.
- Địa chỉ backend lấy từ `NEXT_PUBLIC_API_URL`. Không viết cứng `http://localhost:8080` trong code.
- Lỗi từ backend được chuyển thành thông báo tiếng Việt rõ ràng cho người dùng (NFR-09): dữ liệu không hợp lệ, không có quyền, dịch vụ không phản hồi.
- Frontend ẩn nút mà người dùng không có quyền dùng, nhưng không coi đó là bảo mật. Phân quyền do backend quyết định.
- Khi API chưa có: viết hàm trong `api.ts` trả dữ liệu giả đúng kiểu đã thống nhất, đánh dấu `// TODO(#<số issue>): nối API thật`. Khi backend xong chỉ cần thay thân hàm.

## Biến môi trường và bảo mật

- Biến mới phải thêm vào `.env.example` kèm một dòng chú thích.
- Biến có tiền tố `NEXT_PUBLIC_` lộ ra trình duyệt. Khoá AI, email, lưu trữ tệp không bao giờ nằm ở frontend (NFR-04).
- Không lưu mật khẩu hay dữ liệu nhạy cảm vào `localStorage`. Cách giữ phiên đăng nhập sẽ theo quyết định chung với backend.

## Thư viện

Thêm thư viện là quyết định của cả nhóm: nêu lý do trong pull request và ghi vào mục "Quyết định" của roadmap. Ưu tiên thứ đã có trong Next.js, React và Tailwind trước.
