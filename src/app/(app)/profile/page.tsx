import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Thông tin cá nhân" };

export default function ProfilePage() {
  return <PagePlaceholder title="Thông tin cá nhân" description="Prototype 1.3 — chưa làm." />;
}
