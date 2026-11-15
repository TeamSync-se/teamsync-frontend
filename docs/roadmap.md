# Phương hướng phát triển frontend

Tài liệu này nói frontend sẽ đi từ template hiện tại tới sản phẩm theo thứ tự nào. Phạm vi lấy từ `features.md`, PA02 và 27 màn hình prototype. Các mục ghi "đề xuất" cần nhóm chốt.

## Hiện trạng

- Repo mới có template `create-next-app`: một trang mẫu, chưa có layout, thành phần hay lời gọi API nào.
- Công nghệ đã cố định theo PA02 mục 2.5: Next.js, TypeScript, Tailwind CSS; giao tiếp với backend bằng REST và WebSocket (STOMP).
- Backend cũng đang ở mức khung (mới có bảng `users`), nên giai đoạn đầu frontend làm với dữ liệu giả và ghép API sau.

## Nguyên tắc

1. **Nền tảng trước, tính năng sau.** Layout, thành phần cơ bản và lớp gọi API phải có trước khi chia việc theo màn hình, để mọi người không tự làm mỗi người một kiểu.
2. **Bám prototype.** Mỗi màn hình đối chiếu với ảnh prototype và hệ thiết kế Slate. Muốn lệch thì nêu trong issue.
3. **Đi theo lát cắt dọc.** Một issue đưa một luồng chạy được từ giao diện tới API (hoặc dữ liệu giả), không làm dở nhiều màn hình cùng lúc.
4. **Bắt buộc trước, nâng cao sau.** Xong toàn bộ `[B]` (Milestone 1) rồi mới làm `[N]` (Milestone 3).
5. **Không chờ backend.** Thống nhất kiểu dữ liệu trong issue, frontend dùng dữ liệu giả cùng kiểu.

## Các giai đoạn

### Giai đoạn 0 — Nền tảng (nhãn `nen-tang`, làm trước tất cả)

- [x] Dọn template: xoá trang mẫu và ảnh SVG mẫu, đặt `lang="vi"`, sửa tiêu đề trang.
- [x] Xoá `package-lock.json`, chỉ giữ `pnpm-lock.yaml`.
- [x] Đưa token Slate (màu, chữ, bo góc, khoảng cách) vào `globals.css`; đổi phông sang Inter.
- [x] Thành phần cơ bản trong `components/ui`: Button, Input, Card, Modal, Badge, Table.
- [x] Khung trang đã đăng nhập (sidebar, header) và khung trang chưa đăng nhập.
- [x] `lib/api-client.ts`, `lib/env.ts`, cách xử lý lỗi chung.
- [ ] Cơ chế giữ phiên và chặn trang khi chưa đăng nhập: token Bearer lưu cookie do frontend đặt, chặn trang bằng `proxy.ts` (quyết định đã chốt, xem mục "Quyết định").
- [ ] Cập nhật `lib/api-client.ts` theo quy ước API chung của backend (`docs/api/conventions.md` ở repo backend): đọc lỗi `problem+json` (`code`, `detail`, `errors`), gắn header `Authorization`, xử lý `401`, kiểu `Page<T>`.
- [x] CI bằng GitHub Actions: chạy `pnpm lint` và `pnpm build` khi mở pull request.
- [ ] Bật bảo vệ nhánh `main`, tạo nhãn và milestone (xem [git-workflow.md](git-workflow.md)).
- [x] Đưa `DESIGN.md` và prototype vào `docs/design/` của repo này để người và AI cùng tham chiếu.
- [ ] Kết nối thử frontend với backend sau khi backend cấu hình CORS.

### Giai đoạn 1 — Tài khoản và nhóm (F1)

Mọi tính năng khác đều cần đăng nhập và có nhóm, nên làm trước.

- Đăng ký, đăng nhập, xem và sửa thông tin cá nhân.
- Danh sách nhóm, tạo nhóm, lời mời tham gia.
- Tổng quan nhóm, thành viên, mời thành viên, quản lý nhóm và phân quyền.

### Giai đoạn 2 — Các phân hệ trong nhóm (làm song song)

| Phân hệ | Nội dung | Ghi chú |
| --- | --- | --- |
| Nhiệm vụ (F3) | Danh sách, chi tiết, tạo, phân công, đổi trạng thái | Ít phụ thuộc nhất, nên bắt đầu trước |
| Tài nguyên (F2) | Danh sách, tải lên, chi tiết, thread thảo luận | Tải tệp qua backend, không gọi thẳng R2 |
| Cuộc họp (F4) | Danh sách, tạo và đề xuất khung giờ, bình chọn, kết quả, chốt lịch | Không làm gọi video, chỉ có liên kết ngoài |
| Nhắn tin (F2) | Tin nhắn nhóm, lịch sử, cập nhật gần thời gian thực | Cần WebSocket/STOMP, rủi ro tích hợp cao nhất nên thử sớm |

### Giai đoạn 3 — Tổng hợp

- Dashboard cá nhân và lọc theo nhóm (F5). Làm sau vì lấy dữ liệu từ nhiệm vụ và cuộc họp.
- Thông báo trong ứng dụng (F3).
- AI tóm tắt thảo luận (F2). Frontend chỉ gọi API backend và hiển thị kết quả, lỗi.

### Giai đoạn 4 — Hoàn thiện Milestone 1

- Rà đủ bốn trạng thái (đang tải, rỗng, lỗi, có dữ liệu) trên mọi màn hình.
- Rà hiển thị trên điện thoại và máy tính.
- Thay hết dữ liệu giả bằng API thật, chạy thử các luồng chính với dữ liệu mẫu cho demo.
- Triển khai bản thử nghiệm.

### Sau Milestone 1 — Nâng cao `[N]` (Milestone 3)

Đổi và quên mật khẩu, lời mời có thời hạn, tìm kiếm, xem trước ảnh và PDF, thông báo đẩy, cảnh báo trùng lịch, thống kê tiến độ.

## Bản đồ màn hình và đường dẫn (đề xuất)

| Prototype | Màn hình | Đường dẫn |
| --- | --- | --- |
| 1.1 | Đăng nhập | `/login` |
| 1.2 | Đăng ký | `/register` |
| 1.3 | Thông tin cá nhân | `/profile` |
| 1.4 | Chỉnh sửa thông tin cá nhân | `/profile/edit` |
| 2.1 | Danh sách nhóm của tôi | `/groups` |
| 2.2 | Tạo nhóm mới | modal trên `/groups` |
| 2.3 | Lời mời tham gia nhóm | `/invitations` |
| 2.4 | Mời thành viên | modal trên `/groups/[groupId]/members` |
| 2.5 | Tổng quan nhóm | `/groups/[groupId]` |
| 2.6 | Quản lý nhóm | `/groups/[groupId]/settings` |
| 2.7 | Danh sách thành viên | `/groups/[groupId]/members` |
| 3.1 | Tin nhắn nhóm | `/groups/[groupId]/chat` |
| 3.2 | Thảo luận theo luồng | `/groups/[groupId]/threads/[threadId]` |
| 3.3 | AI tóm tắt thảo luận | bảng bên trong màn hình chat hoặc thread |
| 4.1 | Tài nguyên nhóm | `/groups/[groupId]/resources` |
| 4.2 | Tải lên tài nguyên | modal trên `/groups/[groupId]/resources` |
| 4.3 | Chi tiết tài nguyên và thảo luận | `/groups/[groupId]/resources/[resourceId]` |
| 5.1 | Danh sách cuộc họp | `/groups/[groupId]/meetings` |
| 5.2 | Tạo cuộc họp, đề xuất khung giờ | `/groups/[groupId]/meetings/new` |
| 5.3 – 5.5 | Bình chọn, kết quả, chi tiết đã chốt | `/groups/[groupId]/meetings/[meetingId]` (hiển thị theo trạng thái cuộc họp) |
| 6.1 | Danh sách nhiệm vụ | `/groups/[groupId]/tasks` |
| 6.2 | Chi tiết nhiệm vụ | `/groups/[groupId]/tasks/[taskId]` |
| 6.3 | Tạo nhiệm vụ | modal trên `/groups/[groupId]/tasks` |
| 7.1 | Dashboard cá nhân | `/dashboard` |
| 7.2 | Dashboard lọc theo nhóm | `/dashboard?group=[groupId]` |

## Cần chốt trong buổi họp

| # | Câu hỏi | Đề xuất | Cần ai |
| --- | --- | --- | --- |
| 8 | Ai làm phân hệ nào ở giai đoạn 2? | Chia theo bảng giai đoạn 2, mỗi phân hệ một người chính | Cả nhóm |
| 9 | Issue frontend đặt ở repo nào? | Repo frontend, dẫn link sang issue backend tương ứng | Cả nhóm |

Một điểm lệch cần lưu ý: bo góc trong HTML prototype (`DEFAULT` 0.125rem) khác với `DESIGN.md` (`DEFAULT` 0.25rem). Đề xuất lấy `DESIGN.md` làm chuẩn.

## Quyết định

Ghi lại quyết định kỹ thuật đã chốt, mới nhất ở trên.

| Ngày | Quyết định | Lý do |
| --- | --- | --- |
| 2026-11-15 | Giữ phiên bằng token Bearer: backend trả `accessToken` (sống 24 giờ, không có refresh token, hết hạn thì đăng nhập lại); frontend lưu vào cookie không `HttpOnly` (`Path=/`, `SameSite=Lax`, hết hạn đúng `expiresAt`, `Secure` khi chạy HTTPS) và gắn header `Authorization: Bearer`. Thay cho đề xuất cũ là cookie `httpOnly` do backend đặt | Theo hợp đồng `docs/api/auth.md` của backend: không ràng buộc tên miền chung khi triển khai, không cần API đăng xuất. Đổi lại frontend phải tránh XSS (không dùng `dangerouslySetInnerHTML` với dữ liệu người dùng) |
| 2026-11-15 | Hợp đồng API chỉ ghi ở thư mục `docs/api/` của repo backend; issue frontend dẫn link, không chép lại | Chỉ có một nguồn, tránh hai bên lệch nhau |
| 2026-11-15 | Lỗi từ backend theo chuẩn Problem Details (`application/problem+json`) có `code`, `detail`, `errors`; frontend xử lý theo `code`, hiển thị `detail` | Theo quy ước API chung của backend |
| 2026-11-15 | Chặn trang chưa đăng nhập bằng `src/proxy.ts` (Next.js 16 đổi tên middleware thành proxy), chỉ kiểm tra cookie có và còn hạn | Kiểm tra nhanh, không nháy trang; bảo vệ dữ liệu thật vẫn do backend |
| 2026-11-15 | Dùng pnpm làm package manager duy nhất | Tránh hai lockfile lệch nhau |
| 2026-11-15 | Mô hình nhánh GitHub Flow, squash merge | Nhóm nhỏ, cần đơn giản và `main` luôn chạy được |
| 2026-11-15 | Claude Code là công cụ AI của nhóm; chỉ dẫn đặt ở `AGENTS.md` | Một nguồn chỉ dẫn chung cho cả nhóm |
| 2026-11-15 | Thêm TanStack Query (dữ liệu server), React Hook Form + Zod (form), `@stomp/stompjs` (WebSocket STOMP), `lucide-react` (biểu tượng, thay Material Symbols của prototype) | Nhóm đã chốt; khớp Spring WebSocket/STOMP, bộ biểu tượng nhẹ dùng được với React |
