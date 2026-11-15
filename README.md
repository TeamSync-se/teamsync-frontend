# teamsync-frontend

Giao diện web của **TeamSync – Hệ thống hỗ trợ làm việc nhóm trực tuyến** (đồ án môn Nhập môn Công nghệ phần mềm).

Backend nằm ở repo [teamwork-backend](https://github.com/TeamSync-se/teamwork-backend).

## Công nghệ

- Next.js 16 (App Router, Turbopack) + React 19
- TypeScript (strict)
- Tailwind CSS 4
- ESLint (`eslint-config-next`)
- Package manager: **pnpm** (không dùng npm hay yarn trong repo này)

## Yêu cầu

- Node.js 20.9 trở lên (nên dùng bản LTS mới nhất)
- pnpm: `corepack enable` hoặc `npm install -g pnpm`
- Backend đang chạy ở `http://localhost:8080` nếu cần gọi API thật (xem README của repo backend)

## Chạy dự án

```bash
pnpm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
pnpm dev
```

Mở http://localhost:3000.

## Lệnh thường dùng

| Lệnh | Tác dụng |
| --- | --- |
| `pnpm dev` | Chạy server phát triển, tự nạp lại khi sửa code |
| `pnpm lint` | Kiểm tra code bằng ESLint |
| `pnpm build` | Build bản production, đồng thời kiểm tra kiểu TypeScript |
| `pnpm start` | Chạy bản đã build |
| `pnpm add <gói>` | Thêm thư viện (phải nêu lý do trong PR) |

Trước khi mở pull request, `pnpm lint` và `pnpm build` phải chạy qua.

## Cấu trúc thư mục

```text
src/
  app/          Route và layout (App Router). Chỉ ghép nối, không chứa nghiệp vụ.
  components/   Thành phần dùng chung giữa nhiều tính năng (ui/, layout/)
  features/     Mỗi tính năng một thư mục: components, api, hooks, types
  lib/          Hàm dùng chung: gọi API, đọc biến môi trường, tiện ích
public/         Tệp tĩnh
docs/           Tài liệu của repo frontend
```

Hiện tại repo mới có `src/app` từ template; các thư mục còn lại được tạo dần theo [docs/roadmap.md](docs/roadmap.md).

## Tài liệu

| Tài liệu | Nội dung |
| --- | --- |
| [docs/git-workflow.md](docs/git-workflow.md) | Quy tắc làm việc với Git và GitHub |
| [docs/conventions.md](docs/conventions.md) | Quy ước viết code và tổ chức thư mục |
| [docs/ai-rules.md](docs/ai-rules.md) | Quy tắc dùng công cụ AI khi làm việc trong repo |
| [docs/roadmap.md](docs/roadmap.md) | Phương hướng phát triển và thứ tự công việc |
| [docs/README.md](docs/README.md) | Mục lục tài liệu và quy tắc viết tài liệu Markdown |
| [AGENTS.md](AGENTS.md) | Chỉ dẫn dành cho công cụ AI (Claude Code đọc qua `CLAUDE.md`) |

Yêu cầu nghiệp vụ (PA01, PA02, `features.md`) nằm ở thư mục `docs/requirements` của repo backend.
