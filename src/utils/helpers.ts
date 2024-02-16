// libraries
import dayjs, { Dayjs } from "dayjs";

// types and constants
import UserRoleNames from "ts/enums/UserRoleNames";
import { GraphApiResponseStatus } from "ts/enums/GraphApiStatusResponse";
import { InvitationStatusResponse, Invitee } from "ts/types/Event";
import { InviteeOption } from "ts/types/User";
import { InvitationStatus } from "ts/enums/InvitationStatusEnum";

export function mapInvitationStatusToGraphApiResponseStatus(
  status: InvitationStatusResponse
): GraphApiResponseStatus {
  if (status === "NoResponse") return GraphApiResponseStatus.None;
  switch (InvitationStatus[status]) {
    case InvitationStatus.Going:
      return GraphApiResponseStatus.Accepted;
    case InvitationStatus.NotGoing:
      return GraphApiResponseStatus.Declined;
    case InvitationStatus.Maybe:
      return GraphApiResponseStatus.TentativelyAccepted;
    default:
      return GraphApiResponseStatus.None;
  }
}

export function isUserAdmin(userRole: string): boolean {
  return userRole === UserRoleNames.Admin;
}

export const mapInviteeToOptions = ({
  fullName,
  id,
  profilePicture,
  email,
}: Invitee): InviteeOption => {
  return {
    label: fullName,
    value: id,
    profilePicture: profilePicture || "",
    email,
  };
};

export const DateToDayjsObj = (date: Date): Dayjs => {
  const dateObj = dayjs(date);

  return dateObj;
};

export const createDateRangeString = (
  startDate: Dayjs,
  endDate: Dayjs,
  dateFormat: string = "D-MMM-YYYY HH-mm"
): string => {
  return `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}`;
};

export const stripHtmlTagsAndEntities = (string: string): string => {
  // Removes HTML entities ex. &lt; for < and replaces then with an empty space as a placeholder for length checks
  const withoutEntities = string.replace(/&[^\s]*?;/g, " ");
  // Removes HTML tags
  return withoutEntities.replace(/<\/?[^>]+(>|$)/g, "");
};

export const splitCamelCase = (inputString: string): string => {
  return inputString.replace(/([a-z])([A-Z])/g, "$1 $2");
};

const isIndexValid = (index: number, arrayLength: number): boolean => {
  if (index < 0 || index >= arrayLength) {
    console.error(`Index ${index} is out of bounds.`);
    return false;
  }
  return true;
};

export const swapTwoArrayElements = (
  arr: any[],
  index1: number,
  index2: number
) => {
  const len = arr.length;
  if (!isIndexValid(index1, len) || !isIndexValid(index2, len)) {
    return;
  }
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};
