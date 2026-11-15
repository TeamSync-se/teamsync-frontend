# Quy tắc làm việc với Git và GitHub

Áp dụng cho mọi người đóng góp vào repo `teamsync-frontend`. Mô hình nhánh là **GitHub Flow**: chỉ có một nhánh dài hạn là `main`, mọi thay đổi đi qua nhánh ngắn hạn và pull request.

## Nguyên tắc

1. `main` luôn chạy được: `pnpm lint` và `pnpm build` phải qua ở mọi commit trên `main`.
2. Không ai push thẳng lên `main`, kể cả trưởng nhóm. Mọi thay đổi đi qua pull request.
3. Một issue ứng với một nhánh và một pull request.
4. Pull request nhỏ, mở sớm, gộp nhanh. Nhánh không nên sống quá 2–3 ngày.

## Quy trình cho một đầu việc

```bash
# 1. Nhận issue (tự gán mình làm assignee), rồi lấy code mới nhất
git switch main
git pull

# 2. Tạo nhánh
git switch -c feat/12-trang-dang-nhap

# 3. Code, commit từng bước nhỏ
git add .
git commit -m "feat(auth): thêm form đăng nhập"

# 4. Kiểm tra trước khi đẩy
pnpm lint
pnpm build

# 5. Đẩy nhánh và mở pull request
git push -u origin feat/12-trang-dang-nhap
```

Sau đó mở pull request vào `main`, điền mẫu, nhờ một thành viên review. Khi được duyệt thì **Squash and merge** và xoá nhánh.

## Issue

Dùng cùng quy trình với backend để cả nhóm theo dõi một kiểu:

- Mỗi dòng trong `features.md` có phần giao diện thì có một issue ở repo frontend, nhãn `frontend`, tạo theo mẫu "Yêu cầu / tính năng".
- **Milestone 1** là yêu cầu bắt buộc `[B]`, **Milestone 3** là yêu cầu nâng cao `[N]`.
- Issue nhãn `nen-tang` làm trước.
- Issue nhãn `chua-co-AC` chưa được bắt đầu. Người nhận việc điền Acceptance Criteria, nhờ một thành viên khác đọc lại rồi gỡ nhãn.
- Mục **Phụ thuộc**: *cứng* là phải xong trước mới chạy thử được; *mềm* là làm song song được, ghép sau. API backend chưa xong là phụ thuộc mềm: frontend làm với dữ liệu giả cùng kiểu rồi ghép sau (xem [conventions.md](conventions.md#gọi-api)).
- Ghi link issue backend tương ứng vào mục Phụ thuộc, dạng `TeamSync-se/teamwork-backend#<số>`.

## Đặt tên nhánh

`<loại>/<số issue>-<mô tả ngắn không dấu>`

| Loại | Dùng cho | Ví dụ |
| --- | --- | --- |
| `feat` | Tính năng, màn hình mới | `feat/12-trang-dang-nhap` |
| `fix` | Sửa lỗi | `fix/31-sai-mau-nut-chinh` |
| `refactor` | Sắp xếp lại code, không đổi hành vi | `refactor/40-tach-api-client` |
| `docs` | Chỉ sửa tài liệu | `docs/5-quy-tac-git` |
| `chore` | Cấu hình, công cụ, thư viện | `chore/3-ci-lint-build` |

## Commit

Theo [Conventional Commits](https://www.conventionalcommits.org/):

```text
<loại>(<phạm vi>): <mô tả>
```

- **Loại:** `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`.
- **Phạm vi** (không bắt buộc) là tên tính năng: `auth`, `groups`, `chat`, `resources`, `tasks`, `meetings`, `dashboard`, `ui`.
- **Mô tả:** tiếng Việt có dấu, bắt đầu bằng động từ, không viết hoa chữ đầu, không chấm cuối, tối đa khoảng 72 ký tự.
- Mỗi commit làm một việc. Không commit kiểu "update", "fix bug", "wip".

```text
feat(tasks): thêm bảng danh sách nhiệm vụ
fix(auth): hiện thông báo khi sai mật khẩu
chore: thêm biến NEXT_PUBLIC_API_URL vào .env.example
```

## Pull request

**Người mở**

- Tiêu đề viết như một commit: `feat(auth): trang đăng nhập`. Khi squash, tiêu đề này trở thành commit trên `main`.
- Ghi `Closes #<số issue>` trong mô tả để issue tự đóng khi gộp.
- Thay đổi giao diện phải kèm ảnh chụp màn hình, đặt cạnh ảnh prototype tương ứng nếu có.
- Giữ pull request dưới khoảng 400 dòng thay đổi (không tính lockfile). Lớn hơn thì tách.
- Chưa xong mà cần góp ý sớm thì mở dạng **Draft**.
- Tự đọc lại toàn bộ diff trước khi nhờ review.

**Người review**

- Phản hồi trong vòng 24 giờ.
- Kéo nhánh về chạy thử với thay đổi giao diện, không chỉ đọc code.
- Kiểm tra theo Acceptance Criteria của issue và theo [conventions.md](conventions.md).
- Góp ý cụ thể, nói rõ cái nào bắt buộc sửa, cái nào chỉ là gợi ý.

**Điều kiện gộp**

- Ít nhất 1 approve từ người không phải tác giả.
- `pnpm lint` và `pnpm build` qua (khi có CI thì CI phải xanh).
- Không còn conflict với `main`, mọi góp ý bắt buộc đã xử lý.
- Tác giả là người bấm gộp, dùng **Squash and merge**, rồi xoá nhánh.

## Cập nhật nhánh và xử lý conflict

```bash
git fetch origin
git rebase origin/main        # hoặc: git merge origin/main
# sửa conflict, rồi:
git add .
git rebase --continue
git push --force-with-lease   # chỉ cần sau khi rebase, và chỉ trên nhánh của mình
```

- Conflict ở `pnpm-lock.yaml`: lấy bản của `main` rồi chạy lại `pnpm install`, không sửa tay.
- Không bao giờ `--force` lên `main`. Trên nhánh riêng chỉ dùng `--force-with-lease`.
- Hai người cùng cần sửa một file dùng chung (layout, `globals.css`, `components/ui`) thì báo nhau trước trong nhóm chat.

## Không được commit

- `.env.local` và mọi khoá, mật khẩu, token. Lỡ commit thì báo nhóm ngay và đổi khoá, vì xoá commit không đủ.
- `node_modules/`, `.next/`, tệp build.
- `package-lock.json` hoặc `yarn.lock`: repo chỉ dùng `pnpm-lock.yaml`.
- Code bị comment lại, `console.log` dùng để debug.

## Thiết lập repo trên GitHub (làm một lần)

Vào **Settings → Rules → Rulesets** (hoặc **Branches → Branch protection rules**) cho nhánh `main`:

- Require a pull request before merging, với 1 approval.
- Require status checks to pass (bật sau khi có CI).
- Block force pushes.

Vào **Settings → General → Pull Requests**: chỉ bật *Allow squash merging*, bật *Automatically delete head branches*.

Tạo sẵn nhãn `frontend`, `nen-tang`, `chua-co-AC` và hai milestone giống repo backend.
