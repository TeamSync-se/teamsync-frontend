import { redirect } from "next/navigation";

// Trang gốc chưa có nội dung riêng: chuyển thẳng vào dashboard.
export default function Home() {
  redirect("/dashboard");
}
