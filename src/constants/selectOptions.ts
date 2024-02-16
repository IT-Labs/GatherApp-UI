import { mapToOptions } from "hooks/useCustomSelect";
import { EventCategories } from "ts/enums/EventCategories";
import { EventOrganizers } from "ts/enums/EventOrganizers";
import { EventTypes } from "ts/enums/EventTypes";
import UserRoleNames from "ts/enums/UserRoleNames";

export const allOption = { label: "All", value: "" };
const bothOption = { label: "Both", value: "" };

export const categoriesData = mapToOptions(Object.values(EventCategories));
export const categoryFilterData = [allOption, ...categoriesData];

export const roleData = mapToOptions(Object.values(UserRoleNames));
export const roleFilterData = [allOption, ...roleData];
export type RoleFilterValueType = "" | UserRoleNames;

export const eventOrganizersData = mapToOptions([
  bothOption,
  ...Object.values(EventOrganizers).filter(
    (organizer) => organizer !== EventOrganizers.Both
  ),
]);

export const typesFilterData = mapToOptions([
  bothOption,
  ...Object.values(EventTypes),
]);
