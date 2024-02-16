import { FormInputReturnType } from "hooks/useFormInput";
import { CustomSelectHookReturnType } from "hooks/useCustomSelect";
import { CheckboxInputReturnType } from "hooks/useCheckbox";
import { SingleEvent } from "ts/types/Event";
import { EventOrganizers } from "ts/enums/EventOrganizers";
import { EventTypes } from "ts/enums/EventTypes";
import { EventCategories } from "ts/enums/EventCategories";
import { categoriesData } from "constants/selectOptions";
import ExampleBanner from "stories/assets/example-banner.jpg";
import { EventStatuses } from "ts/enums/EventStatuses";

export const mockFormInputState: FormInputReturnType = {
  reset: () => {},
  onChange: () => {},
  setValue: () => {},
  onBlur: () => {},
  errorMessage: "",
  isValid: true,
  hasChanged: false,
  hasError: false,
  isTouched: false,
  value: "",
};

export const mockCheckboxState: CheckboxInputReturnType = {
  checked: false,
  hasChanged: true,
  isValid: true,
  label: "Event Type: On-site",
  reset: () => {},
  value: "",
  onChange: () => {},
};

export const mockSelectState: CustomSelectHookReturnType<any, false> = {
  reset: () => {},
  getSelectValue: () => {},
  getSelectLabel: () => {},
  errorMessage: "",
  isValid: true,
  hasChanged: false,
  props: {
    options: categoriesData,
    required: false,
    id: "choose-category",
    isMulti: false,
    placeholder: "Choose a category",
    label: "Select Category",
  },
};

export const mockEvent: SingleEvent = {
  id: "1",
  banner: ExampleBanner,
  category: EventCategories.Seminar,
  dateStart: new Date(),
  dateEnd: new Date(Date.now() + 24 * 60 * 60 * 1000),
  description:
    "Have you ever wished you could meet an alien? If you have, this is the perfect opportunity for that. Our seminar has wonderful lecturers from all over the universe. Glorb from the Andromeda galaxy, Bha'Hra from the Pleiades star cluster, and Ssssssss from the Great Void are just some of our representatives you will meet. See you there!",
  locationUrl: "Area 51, Nevada, USA",
  organizedBy: EventOrganizers.Company,
  title: "Example event",
  type: EventTypes.OnSite,
  createdBy: "John Doe",
  createdByEmail: "john.doe@doesntexist.com",
  invitations: [],
  isInviteOnly: false,
  status: EventStatuses.Approved,
};
