<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TeamSync Frontend — chỉ dẫn cho công cụ AI

Trả lời và viết tài liệu bằng tiếng Việt. Tên trong code bằng tiếng Anh, chữ hiển thị cho người dùng bằng tiếng Việt có dấu.

## Dự án

Giao diện web của TeamSync, hệ thống hỗ trợ làm việc nhóm trực tuyến: tài khoản và nhóm, nhắn tin, tài nguyên, nhiệm vụ, cuộc họp, dashboard. Backend là Spring Boot ở repo riêng, giao tiếp qua REST và WebSocket (STOMP). Frontend không chứa nghiệp vụ phân quyền và không giữ khoá dịch vụ nào.

Đọc trước khi làm:

- `docs/conventions.md` — quy ước code, cấu trúc thư mục, giao diện, gọi API.
- `docs/roadmap.md` — thứ tự công việc, bản đồ màn hình và đường dẫn.
- `docs/git-workflow.md` — nhánh, commit, pull request.

## Lệnh

Chỉ dùng pnpm. Không dùng npm hay yarn, không tạo `package-lock.json`.

- `pnpm dev` — chạy server phát triển
- `pnpm lint` — ESLint
- `pnpm build` — build và kiểm tra kiểu

Sau khi sửa code, chạy `pnpm lint` và `pnpm build` rồi mới báo là xong. Nếu không chạy được thì nói rõ là chưa kiểm tra.

## Cấu trúc

- `src/app/` — route và layout, chỉ ghép nối. Nhóm `(auth)` cho trang chưa đăng nhập, `(app)` cho trang đã đăng nhập.
- `src/components/ui/` — thành phần cơ bản dùng chung, không gọi API.
- `src/components/layout/` — sidebar, header, khung trang.
- `src/features/<tính-năng>/` — `components/`, `api.ts`, `hooks.ts`, `types.ts`. Tên tính năng: `auth`, `groups`, `chat`, `resources`, `tasks`, `meetings`, `dashboard`.
- `src/lib/` — `api-client.ts`, `env.ts`, tiện ích.

## Quy tắc code

- Import bằng alias `@/`. `features/a` không import từ `features/b`.
- File và thư mục kebab-case. Component PascalCase, named export (trừ `page.tsx`, `layout.tsx`).
- TypeScript strict: không `any`, không `@ts-ignore`, không `eslint-disable` để cho qua.
- Mặc định Server Component. Chỉ thêm `"use client"` ở component nhỏ nhất cần tương tác.
- Mọi lời gọi backend đi qua `src/lib/api-client.ts`, địa chỉ lấy từ `NEXT_PUBLIC_API_URL`. Không gọi `fetch` trong component, không viết cứng URL.
- API chưa có thì trả dữ liệu giả đúng kiểu trong `api.ts`, đánh dấu `// TODO(#<số issue>): nối API thật`.
- Màn hình lấy dữ liệu phải có đủ trạng thái: đang tải, rỗng, lỗi, có dữ liệu. Lỗi hiển thị bằng tiếng Việt, rõ nguyên nhân.

## Giao diện

- Theo hệ thiết kế Slate (`docs/design/DESIGN.md`) và ảnh prototype của màn hình tương ứng (`docs/design/prototype/<màn-hình>/screen.png`). Nếu chưa được cung cấp prototype, hỏi trước khi tự thiết kế.
- Dùng token khai báo bằng `@theme` trong `src/app/globals.css`. Không viết mã màu trực tiếp trong component.
- Tailwind CSS 4: cấu hình nằm trong CSS, không tạo `tailwind.config.js`.
- Phông Inter, chữ nội dung 14–16px, khoảng cách bội số 8px, bo góc 6–8px, viền 1px thay cho đổ bóng. Không gradient, không hiệu ứng kính mờ, không nút dạng viên thuốc.
- Dùng lại `components/ui` trước khi tạo thành phần mới.
- Không chép nguyên HTML prototype vào dự án; chỉ tham khảo bố cục.

## Giới hạn

- Chỉ sửa file thuộc phạm vi việc được giao. Không tiện tay định dạng lại hay đổi tên file khác.
- Không thêm thư viện, không sửa `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `package.json` khi chưa được người dùng đồng ý.
- Không commit, push, gộp nhánh hay xoá file khi chưa được yêu cầu rõ ràng. Không bao giờ push lên `main`.
- Không đọc, in ra hay commit `.env.local` và bất kỳ khoá bí mật nào. Biến môi trường mới phải thêm vào `.env.example`.
- Không sửa đoạn giữa `BEGIN:nextjs-agent-rules` và `END:nextjs-agent-rules` ở đầu file này.
- Khi yêu cầu chưa rõ hoặc mâu thuẫn với tài liệu trong `docs/`, hỏi lại thay vì đoán.
- Giải thích ngắn gọn điều đã làm và lý do, để người dùng hiểu được code trước khi commit.
