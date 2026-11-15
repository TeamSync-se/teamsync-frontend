# Quy tắc dùng công cụ AI

Nhóm dùng Claude Code khi làm frontend. Tài liệu này là quy tắc cho **người** dùng AI. Chỉ dẫn cho **AI** nằm ở [AGENTS.md](../AGENTS.md); Claude Code tự đọc file đó qua `CLAUDE.md`.

## Nguyên tắc

1. **Người mở pull request chịu trách nhiệm toàn bộ code trong đó**, dù ai hay công cụ nào viết. "AI viết vậy" không phải là câu trả lời khi review.
2. **Hiểu rồi mới commit.** Bạn phải giải thích được từng đoạn code mình đưa lên. Chưa hiểu thì hỏi AI cho tới khi hiểu, hoặc viết lại theo cách mình hiểu.
3. **AI làm theo quy ước của nhóm, không phải ngược lại.** Kết quả lệch [conventions.md](conventions.md) thì sửa trước khi mở pull request.

## Được và không được

**Nên dùng AI để**

- Dựng khung component, trang, form theo prototype và hệ thiết kế Slate.
- Giải thích lỗi, giải thích API của Next.js 16 và Tailwind 4.
- Viết kiểu TypeScript từ hợp đồng API, viết dữ liệu giả.
- Rà soát diff của chính mình trước khi nhờ người review.

**Không được**

- Dán khoá, mật khẩu, token, nội dung `.env.local` vào bất kỳ công cụ AI nào.
- Để AI tự thêm thư viện, đổi cấu hình (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`) hay sửa file ngoài phạm vi issue mà không xem xét.
- Để AI tự commit, push, gộp pull request hoặc chạy lệnh xoá. Các bước này do người thực hiện.
- Tắt lỗi lint hoặc lỗi kiểu (`any`, `@ts-ignore`, `eslint-disable`) theo gợi ý của AI để "cho qua".
- Dùng AI review thay cho người review. AI rà trước, người vẫn phải duyệt.

## Cách làm việc với AI cho hiệu quả

1. **Giao việc theo issue.** Đưa cho AI: nội dung issue và Acceptance Criteria, ảnh hoặc HTML prototype của màn hình, tên các file liên quan.
2. **Yêu cầu kế hoạch trước, code sau** với việc lớn hơn một file. Đọc kế hoạch, sửa hướng rồi mới cho làm.
3. **Làm từng bước nhỏ** và chạy thử sau mỗi bước, thay vì nhận một lần cả màn hình.
4. **Kiểm tra lại** bằng `pnpm lint`, `pnpm build` và mở trình duyệt xem thật. AI nói "đã xong" chưa phải là xong.
5. **Đọc toàn bộ diff** trước khi commit. Bỏ những thay đổi không liên quan mà AI tiện tay sửa.
6. **Nghi ngờ kiến thức cũ.** AI hay viết theo Next.js và Tailwind bản cũ. Nếu code dùng API lạ hoặc bị báo deprecated, bắt AI đọc lại `node_modules/next/dist/docs/`.

## Ghi nhận trong pull request

Mẫu pull request có mục "Dùng AI". Ghi ngắn gọn phần nào do AI sinh và bạn đã kiểm tra bằng cách nào. Mục đích là giúp người review biết nên đọc kỹ chỗ nào, không phải để đánh giá ai.

## Cập nhật chỉ dẫn cho AI

Khi AI lặp lại cùng một lỗi (sai cấu trúc thư mục, dùng sai màu, viết API cũ), đừng chỉ sửa tay: thêm một dòng vào [AGENTS.md](../AGENTS.md) qua pull request để cả nhóm được hưởng. Không sửa đoạn nằm giữa hai dòng `BEGIN:nextjs-agent-rules` và `END:nextjs-agent-rules`, vì `next dev` tự ghi lại đoạn đó.
