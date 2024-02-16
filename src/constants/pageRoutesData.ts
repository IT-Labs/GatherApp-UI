import { STATIC_ROUTES } from "utils/constants";

export const routesToMap = [
  {
    value: "Home",
    to: STATIC_ROUTES.home,
    adminDependent: false,
  },
  {
    value: "Create",
    to: STATIC_ROUTES.createEvent,
    adminDependent: false,
  },
  {
    value: "Requests",
    to: STATIC_ROUTES.requests,
    adminDependent: true,
  },
  {
    value: "Admin Panel",
    to: STATIC_ROUTES.adminPanel,
    adminDependent: true,
  },
  {
    value: "My Profile",
    to: STATIC_ROUTES.myProfile,
    adminDependent: false,
  },
  {
    value: "My Events",
    to: STATIC_ROUTES.myEvents,
    adminDependent: false,
  },
];
