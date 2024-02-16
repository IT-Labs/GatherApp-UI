export const STATIC_ROUTES = {
  signup: "/signup",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  home: "/",
  viewEvent: "/events",
  changePassword: "/change-password",
  createEvent: "/create-event",
  editEvent: "/edit-event",
  requests: "/requests",
  adminPanel: "/admin-panel",
  myProfile: "/my-profile",
  myEvents: "/my-events",
};

// Cache duration is calculated in seconds for rtk query
const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

export const CACHE_DURATIONS = {
  SHORT: 5 * ONE_MINUTE,
  MEDIUM: ONE_HOUR,
  LONG: ONE_DAY,
};
