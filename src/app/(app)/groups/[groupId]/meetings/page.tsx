import type { Metadata } from "next";
import { MeetingsView } from "@/features/meetings/components/meetings-view";

export const metadata: Metadata = {
  title: "Lịch họp",
};

export default async function GroupMeetingsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  return <MeetingsView rawGroupId={groupId} />;
}
