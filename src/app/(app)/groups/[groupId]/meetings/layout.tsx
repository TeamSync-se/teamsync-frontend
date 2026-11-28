import type { ReactNode } from "react";
import { MeetingsQueryProvider } from "@/features/meetings/components/meetings-query-provider";

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MeetingsQueryProvider>{children}</MeetingsQueryProvider>;
}
