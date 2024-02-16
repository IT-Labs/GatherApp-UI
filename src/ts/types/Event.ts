// types and constants
import { EventTypes } from "ts/enums/EventTypes";
import { EventCategories } from "ts/enums/EventCategories";
import { EventOrganizers } from "ts/enums/EventOrganizers";
import { InvitationStatus } from "ts/enums/InvitationStatusEnum";
import { EventStatusFilters, EventStatuses } from "ts/enums/EventStatuses";

// response for Home Page
export type Event = {
  totalPageCount: number;
  totalItemCount: number;
  events: SingleEvent[];
};

export type SingleEvent = {
  id: string;
  title: string;
  description: string;
  organizedBy: EventOrganizers;
  dateStart: Date;
  dateEnd: Date;
  banner: string;
  type: EventTypes;
  locationUrl: string;
  invitations: Invitation[];
  category: EventCategories;
  createdBy: string;
  createdByEmail?: string;
  status: EventStatuses;
  isInviteOnly?: boolean;
};

// interface for home page request data
export type HomePageFiltersType = {
  page: number;
  pageSize: number;
  category: string;
  location: string;
  organizer: string;
  type: string;
  startDate: Date | string;
  endDate: Date | string;
};

export type HomePageFilterState = Omit<
  HomePageFiltersType,
  "pageSize" | "page"
> | null;

// interface for requests page request data
export type RequestsReq = {
  page: number;
  pageSize: number;
  status: EventStatusFilters;
};

export type InvitationStatusResponse =
  | keyof typeof InvitationStatus
  | "NoResponse";
// response we get for invitations
export type Invitation = {
  id: string;
  inviteStatus: InvitationStatusResponse;
  user: Invitee;
};

// user from an invitation response
export type Invitee = {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string | null;
};

export type EventDataRequired = {
  eventTitle: string;
  eventCategory: string;
  eventDescription: string;
  eventType: string;
  eventOrganizedBy: string;
  eventLocation: string;
  eventUrl: string;
  dateStart: Date | null;
  timeStart: string;
};

// request type for Going/Maybe/Not going buttons
export type CallToAction = {
  eventId: string;
  userId: string;
  inviteStatus: number;
  invitationId: string;
};

export type ApproveEventRequest = {
  id: string;
  status: EventStatuses;
};
export type DeclineEventRequest = {
  declineReason: string;
} & ApproveEventRequest;

export type MyCreatedEventsRequest = {
  userId: string;
  page: number;
  pageSize: number;
  organizer: string;
  eventStatus: EventStatusFilters;
};
export type EventOnlyProps = {
  event: SingleEvent;
};
