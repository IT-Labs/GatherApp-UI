// hooks/methods
import customFetchBase from "services/customFetchBase";

// libraries
import { createApi } from "@reduxjs/toolkit/query/react";

// types and constants
import {
  LoginResponse,
  UserLogin,
  UserSignUp,
  UserDetails,
  UserByName,
  UserAdminPanel,
  UserLoginSSO,
  Countries,
} from "ts/types/User";
import {
  SingleEvent,
  CallToAction,
  DeclineEventRequest,
  // Invitation,
  MyCreatedEventsRequest,
  HomePageFiltersType,
  Invitee,
  RequestsReq,
  Event,
  ApproveEventRequest,
} from "ts/types/Event";
import { ChangePasswordType, ResetPassword } from "ts/types/ResetPassword";
import { CACHE_DURATIONS } from "utils/constants";

type CustomErrorResponse = {
  status: number | string;
  messages: string[];
};

type DeclineDeleteResponse = {
  data: UserDetails;
  status: string | number;
};

type IdRequest = {
  id: string;
};

type AdminPanelRequest = {
  role: string;
  name: string;
  pageSize: number;
  page: number;
};

type LocationRequest = {
  id: string;
  countryId: string;
};

function customQuery(
  url: string,
  method: string,
  body?: any,
  providesTags?: string[]
) {
  return {
    url,
    method,
    body,
    providesTags,
  };
}

const EVENT_TAGS = {
  GetEvents: "GetEvents",
  GetEvent: "GetEvent",
  GetMyEvents: "GetMyEvents",
  GetRequests: "GetRequests",
  GetMyCreatedEvents: "GetMyCreatedEvents",
};
const eventTagArr = Object.values(EVENT_TAGS);
// Define a service using a base URL and expected endpoints
export const gatherAppApi = createApi({
  reducerPath: "gatherAppApi",
  baseQuery: customFetchBase,
  tagTypes: [
    ...eventTagArr,
    "SignUp",
    "ForgotPassword",
    "Login",
    "LoginSSO",
    "Accept",
    "CallToAction",
    "ChangePassword",
    "User",
    "GetInvitations",
    "Users",
    "Countries",
  ],
  keepUnusedDataFor: CACHE_DURATIONS.SHORT,
  endpoints: (builder) => ({
    createEvent: builder.mutation<SingleEvent, FormData>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (payload) => ({
        url: `events`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": undefined,
        },
      }),

      invalidatesTags: [...eventTagArr],
    }),
    editEvent: builder.mutation<boolean, { data: FormData; eventId: string }>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (payload) => ({
        url: `events/${payload.eventId}`,
        method: "PUT",
        body: payload.data,
        headers: {
          "Content-Type": undefined,
        },
      }),

      invalidatesTags: [...eventTagArr],
    }),
    getAllEvents: builder.query<Event, HomePageFiltersType>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({
        page,
        pageSize,
        category,
        location,
        organizer,
        type,
        startDate,
        endDate,
      }: HomePageFiltersType) =>
        `events?page=${page}&pageSize=${pageSize}&category=${category}&location=${location}&type=${type}&organizer=${organizer}&startDate=${startDate}&endDate=${endDate}`,
      providesTags: [EVENT_TAGS.GetEvents],
    }),
    getEventRequests: builder.query<Event, RequestsReq>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ page, pageSize, status }: RequestsReq) =>
        `events/requests?page=${page}&pageSize=${pageSize}&status=${status}`,
      providesTags: [EVENT_TAGS.GetRequests],
    }),
    getEvent: builder.query<SingleEvent, string>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (eventId) => ({
        url: `events/${eventId}`,
        method: "GET",
      }),

      providesTags: [EVENT_TAGS.GetEvent],
    }),

    getMyEvents: builder.query<SingleEvent[], { userId: string | undefined }>({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => `/myEvents`,
      providesTags: [EVENT_TAGS.GetMyEvents],
    }),
    getMyCreatedEvents: builder.query<Event, MyCreatedEventsRequest>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ page = 1, pageSize = 9, organizer, eventStatus, userId }) =>
        `/users/${userId}/events?page=${page}&pageSize=${pageSize}&organizer=${organizer}&eventStatus=${eventStatus}`,
      providesTags: [EVENT_TAGS.GetMyCreatedEvents],
    }),

    // Currently getInvitations endpoint is unused. We do not have a use case where we need just the invitations for an event without the full event details.
    // getInvitations: builder.query<
    //   Invitation[],
    //   { eventId: string | undefined }
    // >({
    //   // note: an optional `queryFn` may be used in place of `query`
    //   query: ({ eventId }) => `events/${eventId}/invitations`,
    //   providesTags: ["GetInvitations"],
    // }),
    signup: builder.mutation<CustomErrorResponse, Partial<UserSignUp>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) => customQuery("signup", "POST", post, ["SignUp"]),
      invalidatesTags: ["SignUp"],
    }),
    forgotPassword: builder.mutation<string, Partial<string>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) =>
        customQuery("forgot-password", "POST", post, ["ForgotPassword"]),

      invalidatesTags: ["ForgotPassword"],
    }),
    resetPassword: builder.mutation<CustomErrorResponse, ResetPassword>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) =>
        customQuery(`reset-password/${post.token}`, "PUT", post, [
          "ForgotPassword",
        ]),

      invalidatesTags: ["ForgotPassword"],
    }),
    changePassword: builder.mutation<CustomErrorResponse, ChangePasswordType>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) =>
        customQuery(`change-password`, "PUT", post, ["ChangePassword"]),

      invalidatesTags: ["ChangePassword", "User"],
    }),
    callToAction: builder.mutation<string, CallToAction>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ ...post }) => ({
        url: `/invitation/events/${post.eventId}/respond`,
        method: "PUT",
        body: post,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      invalidatesTags: [EVENT_TAGS.GetEvent],
    }),
    login: builder.mutation<LoginResponse, UserLogin>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (credentials) => ({
        url: `/login`,
        method: "POST",
        body: credentials,
        credentials: "include",
        headers: {
          "Access-Control-Allow-Credentials": "true",
        },
      }),

      invalidatesTags: [EVENT_TAGS.GetEvents, EVENT_TAGS.GetMyEvents],
    }),
    loginSSO: builder.mutation<LoginResponse, UserLoginSSO>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (credentials) =>
        customQuery("login/sso", "POST", credentials, ["LoginSSO"]),

      invalidatesTags: [
        "LoginSSO",
        EVENT_TAGS.GetEvents,
        EVENT_TAGS.GetMyEvents,
      ],
    }),
    approveEvent: builder.mutation<CustomErrorResponse, ApproveEventRequest>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ ...post }) => ({
        url: `/events/${post.id}/approve-event`,
        method: "PUT",
        body: post,
      }),

      invalidatesTags: [...eventTagArr],
    }),
    declineEvent: builder.mutation<
      CustomErrorResponse | DeclineDeleteResponse,
      DeclineEventRequest
    >({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ ...post }) => ({
        url: `/events/${post.id}/decline-event`,
        method: "PUT",
        body: post,
      }),

      invalidatesTags: [...eventTagArr],
    }),
    deleteEvent: builder.mutation<
      CustomErrorResponse | DeclineDeleteResponse,
      string
    >({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [...eventTagArr],
    }),
    getCountries: builder.query<Countries, void>({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => ({
        url: `countries`,
        method: "GET",
      }),
      keepUnusedDataFor: CACHE_DURATIONS.LONG,
      providesTags: ["Countries"],
    }),
    getPersonalInfo: builder.query<UserDetails, { userId: string | undefined }>(
      {
        // note: an optional `queryFn` may be used in place of `query`
        query: ({ userId }) => `users/${userId}`,

        providesTags: ["User"],
        keepUnusedDataFor: CACHE_DURATIONS.MEDIUM,
      }
    ),

    getUsersByName: builder.query<Invitee[], UserByName>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ name, countries }) => ({
        url: `users/byName?name=${name}&countries=${countries}`,
        method: "GET",
      }),
    }),
    getUsers: builder.query<UserAdminPanel, AdminPanelRequest>({
      query: ({ role, name, pageSize, page }) => ({
        url: `/users?role=${role}&name=${name}&page=${page}&pageSize=${pageSize}`,
        method: `GET`,
      }),
      providesTags: ["Users"],
    }),
    updateRole: builder.mutation<
      CustomErrorResponse | boolean,
      { userId: string; role: string }
    >({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) => ({
        url: `/users`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Users"],
    }),
    uploadPicture: builder.mutation<CustomErrorResponse, FormData>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) => ({
        url: `/users/image`,
        method: "PUT",
        body: post,
        headers: { "Content-Type": undefined },
      }),

      invalidatesTags: ["User"],
    }),

    updateLocation: builder.mutation<CustomErrorResponse, LocationRequest>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) => ({
        url: `/users/location`,
        method: "PUT",
        body: post,
        headers: { "Content-Type": undefined },
      }),

      invalidatesTags: ["User"],
    }),

    removeProfilePicture: builder.mutation<CustomErrorResponse, IdRequest>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (post) => ({
        url: `/users/image`,
        method: "DELETE",
        body: post,
      }),

      invalidatesTags: ["User"],
    }),
    invalidateRefresh: builder.mutation<string | number, void>({
      query: () => ({
        url: `/refresh-access`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateEventMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetAllEventsQuery,
  useLoginMutation,
  useLoginSSOMutation,
  useGetUsersByNameQuery,
  useGetEventQuery,
  useEditEventMutation,
  useLazyGetAllEventsQuery,
  useCallToActionMutation,
  useApproveEventMutation,
  useDeclineEventMutation,
  // useGetInvitationsQuery,
  // useLazyGetInvitationsQuery,
  useDeleteEventMutation,
  useGetPersonalInfoQuery,
  useGetMyEventsQuery,
  useUploadPictureMutation,
  useUpdateLocationMutation,
  useGetMyCreatedEventsQuery,
  useRemoveProfilePictureMutation,
  useGetEventRequestsQuery,
  useInvalidateRefreshMutation,
  useGetUsersQuery,
  useGetCountriesQuery,
  useUpdateRoleMutation,
} = gatherAppApi;
