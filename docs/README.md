# Tài liệu frontend

## Mục lục

| Tài liệu | Đọc khi nào |
| --- | --- |
| [git-workflow.md](git-workflow.md) | Trước khi tạo nhánh, commit, mở pull request |
| [conventions.md](conventions.md) | Trước khi viết code hoặc review code |
| [ai-rules.md](ai-rules.md) | Trước khi dùng công cụ AI trong repo |
| [roadmap.md](roadmap.md) | Khi nhận việc, cần biết thứ tự và phụ thuộc |

Nguồn tham chiếu nằm ngoài repo này:

- Yêu cầu nghiệp vụ: `docs/requirements/` của repo [teamwork-backend](https://github.com/TeamSync-se/teamwork-backend) (`features.md`, `PA01.md`, `PA02.md`).
- Giao diện mẫu (trong repo này): hệ thiết kế Slate ở [design/DESIGN.md](design/DESIGN.md) và 27 màn hình prototype (ảnh `screen.png` và `code.html`) ở [design/prototype/](design/prototype/).

## Quy tắc viết tài liệu Markdown

1. **Tài liệu sống cùng code.** Thay đổi nào làm tài liệu sai thì sửa tài liệu trong cùng pull request.
2. **Một nguồn sự thật.** Mỗi quy tắc chỉ viết ở một chỗ, chỗ khác dẫn link. Không chép yêu cầu từ PA02 sang đây.
3. **Đặt tên file** bằng chữ thường, không dấu, nối bằng gạch ngang: `git-workflow.md`. Tài liệu mới thì thêm một dòng vào bảng mục lục ở trên.
4. **Ngôn ngữ:** tiếng Việt có dấu. Tên lệnh, tên file, tên biến giữ nguyên và đặt trong dấu `` ` ``.
5. **Cấu trúc:** mỗi file một tiêu đề `#`, các mục dùng `##` và `###`, không nhảy cấp. Mở đầu bằng một hai câu nói file này dành cho ai, dùng để làm gì.
6. **Lệnh và code** đặt trong khối code có ghi ngôn ngữ (` ```bash `, ` ```tsx `). Lệnh phải chạy được nguyên văn.
7. **Link** dùng đường dẫn tương đối trong repo. Ảnh đặt ở `docs/assets/`, tên không dấu.
8. **Viết ngắn.** Ưu tiên bảng và danh sách cho thứ cần tra cứu; giải thích lý do bằng một câu khi quy tắc không hiển nhiên.
9. **Quyết định kỹ thuật** (chọn thư viện, đổi cấu trúc) ghi vào mục "Quyết định" của [roadmap.md](roadmap.md) kèm ngày và lý do.
