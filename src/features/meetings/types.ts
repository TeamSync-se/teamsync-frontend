export type MeetingStatus = "VOTING" | "CONFIRMED";

export type MeetingFilterStatus =
  | "VOTING"
  | "CONFIRMED"
  | "UPCOMING"
  | "PAST"
  | "ALL";

export type MeetingErrorCode =
  | "INVALID_TIME_SLOT"
  | "INVALID_PARTICIPANT"
  | "INVALID_SLOT_SELECTION"
  | "MEETING_ALREADY_CONFIRMED";

export type MeetingUserSummary = {
  id: number;
  fullName: string;
};

export type MeetingTimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

export type MeetingSummary = {
  id: number;
  groupId: number;
  title: string;
  description: string | null;
  status: MeetingStatus;
  externalLink: string | null;
  confirmedStartTime: string | null;
  confirmedEndTime: string | null;
  creator: MeetingUserSummary;
  totalInvited: number;
  totalVoted: number;
  hasMyVote: boolean;
  slotCount: number;
  isInvited: boolean;
  createdAt: string;
};

export type GetGroupMeetingsParams = {
  status?: MeetingFilterStatus;
  page?: number;
  size?: number;
  signal?: AbortSignal;
};

export type MeetingDetail = {
  id: number;
  groupId: number;
  title: string;
  description: string | null;
  externalLink: string | null;
  status: MeetingStatus;
  confirmedSlotId: number | null;
  confirmedStartTime: string | null;
  confirmedEndTime: string | null;
  creator: MeetingUserSummary;
  isInvited: boolean;
  totalInvited: number;
  participants: MeetingUserSummary[];
  timeSlots: MeetingTimeSlot[];
  createdAt: string;
  updatedAt: string;
};

export type TimeSlotInput = {
  startTime: string;
  endTime: string;
};

export type CreateMeetingInput = {
  title: string;
  description?: string | null;
  externalLink?: string | null;
  invitedUserIds?: number[] | null;
  timeSlots: TimeSlotInput[];
};

export type SubmitVotesInput = {
  selectedSlotIds: number[];
};

export type SubmitVotesResult = {
  meetingId: number;
  selectedSlotIds: number[];
};

export type VoteParticipant = {
  id: number;
  fullName: string;
  hasVoted: boolean;
};

export type TimeSlotVoteSummary = {
  id: number;
  startTime: string;
  endTime: string;
  voteCount: number;
  voters: MeetingUserSummary[];
  isSuggested: boolean;
};

export type MeetingVotesSummary = {
  meetingId: number;
  status: MeetingStatus;
  totalInvited: number;
  totalVoted: number;
  mySelectedSlotIds: number[];
  participants: VoteParticipant[];
  timeSlots: TimeSlotVoteSummary[];
};

export type ConfirmMeetingInput = {
  confirmedSlotId: number;
  externalLink?: string | null;
};
