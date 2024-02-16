// hooks/methods
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateEventMutation,
  useEditEventMutation,
} from "services/api/gatherapp";
import useFormInput from "hooks/useFormInput";
import { useCustomSelect } from "hooks/useCustomSelect";
import useCheckbox from "hooks/useCheckbox";
import { store } from "store/store";
import {
  DateToDayjsObj,
  isUserAdmin,
  mapInviteeToOptions,
} from "utils/helpers";
import useFileInput from "hooks/useFileInput";
import useInputs from "hooks/useInputs";
import useOutlook from "hooks/useOutlook";

// libraries
import dayjs from "dayjs";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";
import Input from "components/Reusable/Input/Input";
import Button from "components/Reusable/Button/Button";
import UploadButton from "components/Reusable/UploadButton/UploadButton";
import CustomSelect from "components/Reusable/Select/CustomSelect";
import Toggle from "components/Reusable/Toggle/Toggle";
import LocationGroup from "components/Reusable/Location/LocationGroup";
import CountriesSelect from "components/CountriesSelect/CountriesSelect";
import InviteesSelect from "components/InviteesSelect/InviteesSelect";

// types and constants
import { categoriesData } from "constants/selectOptions";
import { validationSchemas } from "constants/validationSchemas";
import { ButtonType } from "ts/enums/ButtonType";
import { EventTypes } from "ts/enums/EventTypes";
import { EventOrganizers } from "ts/enums/EventOrganizers";
import { SingleEvent } from "ts/types/Event";
import { CountryOption, InviteeOption } from "ts/types/User";
import { EventStatuses } from "ts/enums/EventStatuses";

// styles
import { STATIC_ROUTES } from "utils/constants";
import {
  SContainer,
  SMainContainer,
  ModalContainer,
  Modal,
  ModalTitle,
  ModalButtonStyles,
  SButtonContainer,
  SSelectContainer,
  SToggleContainer,
} from "./styles";

const MODAL_STATES = {
  CLOSED: "CLOSED",
  SUBMITTING: "SUBMITTING",
  CANCELING: "CANCELING",
} as const;

type Props = {
  editFields?: SingleEvent;
};

const EventForm = ({ editFields }: Props) => {
  const [createEvent] = useCreateEventMutation();
  const [editEvent] = useEditEventMutation();

  const [modalState, setModalState] = useState<keyof typeof MODAL_STATES>(
    MODAL_STATES.CLOSED
  );

  const navigate = useNavigate();
  const userRole = store.getState().login.user.roleName;

  const isAdmin = isUserAdmin(userRole);
  const isEditing = editFields !== undefined;

  const outlook = useOutlook();

  const titleState = useFormInput({
    initialValue: isEditing ? editFields.title : "",
    zodSchema: validationSchemas.eventForm.titleSchema,
  });

  // Currently disabling this rule for interactions between the individual state hooks.
  // They are stateful variables so they are defined, but eslint throws an error
  /* eslint-disable @typescript-eslint/no-use-before-define */
  const startDateState = useFormInput({
    initialValue: isEditing
      ? DateToDayjsObj(editFields.dateStart)
      : dayjs(new Date()).add(1, "day"),
    zodSchema: validationSchemas.shared.dateSchema,
    onChange: (value) => {
      const startDate = dayjs(value);
      const endDate = dayjs(endDateState.value);
      if (startDate.isAfter(endDate)) {
        endDateState.setValue(startDate.add(1, "hour"));
      }
    },
  });

  const endDateState = useFormInput({
    initialValue: isEditing
      ? DateToDayjsObj(editFields.dateEnd)
      : dayjs(startDateState.value).add(1, "hour"),
    zodSchema: validationSchemas.shared.dateSchema.refine(
      (endDate) => dayjs(endDate).isAfter(dayjs(startDateState.value)),
      "End date must be after start Date."
    ),
  });
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const categorySelectState = useCustomSelect({
    options: categoriesData,
    defaultValue: isEditing
      ? categoriesData.find(
          (category) => category.value === editFields.category
        )
      : null,
    required: true,
    id: "choose-category",
    isMulti: false,
    placeholder: "Choose a category",
    label: "Select Category",
  });

  const descriptionState = useFormInput({
    initialValue: isEditing ? editFields.description : "",
    zodSchema: validationSchemas.eventForm.descriptionSchema,
  });

  /* eslint-disable @typescript-eslint/no-use-before-define */
  const eventTypeState = useCheckbox({
    initialChecked: isEditing ? editFields.type === EventTypes.Online : false,
    label: "Event Type",
    onChange: (checked, value) => {
      if (isEditing && editFields.type !== value) {
        eventLocationState.setValue("");
        return;
      }
      eventLocationState.reset();
    },
    valueMap: { true: EventTypes.Online, false: EventTypes.OnSite },
  });
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const isOnline = eventTypeState.value === EventTypes.Online;

  const organizedByState = useCheckbox({
    initialChecked: isEditing
      ? editFields.organizedBy === EventOrganizers.Company
      : false,
    label: "Organized By",
    valueMap: {
      true: EventOrganizers.Company,
      false: EventOrganizers.Individual,
    },
  });

  const eventLocationState = useFormInput({
    initialValue: isEditing ? editFields.locationUrl : "",
    zodSchema: validationSchemas.eventForm.locationSchema,
  });

  const countriesSelectState = useCustomSelect<CountryOption, true>({
    options: [],
    defaultValue: null,
    id: "choose-country",
    isMulti: true,
    required: false,
    placeholder: "Select the team's country or everyone is invited.",
    label: "Team's Country",
  });

  const inviteesSelectState = useCustomSelect<InviteeOption, true>({
    options: [],
    id: "choose-users",
    defaultValue:
      isEditing && editFields.isInviteOnly
        ? editFields.invitations!.map((invitation) =>
            mapInviteeToOptions(invitation.user)
          )
        : null,
    label: "Invite",
    isMulti: true,
    required: false,
    placeholder: "Everyone is invited unless specified differently.",
    width: "100%",
  });

  const eventBannerState = useFileInput({
    initialUrl: isEditing
      ? editFields.banner
      : process.env.REACT_APP_PLACEHOLDER_EVENT_BANNER_URL,
  });

  const inputs = useInputs(
    titleState,
    startDateState,
    endDateState,
    categorySelectState,
    descriptionState,
    eventTypeState,
    organizedByState,
    eventLocationState,
    countriesSelectState,
    inviteesSelectState,
    eventBannerState
  );

  const handleSubmit = async () => {
    if (!inputs.areValid) return;

    const eventFormData = new FormData();
    eventFormData.append("Title", titleState.value);
    eventFormData.append("DateStart", startDateState.value.toISOString());

    eventFormData.append("DateEnd", endDateState.value.toISOString());
    eventFormData.append("Category", categorySelectState.getSelectValue());
    eventFormData.append("Description", descriptionState.value);
    eventFormData.append("Type", eventTypeState.value);
    eventFormData.append("LocationUrl", eventLocationState.value);

    eventFormData.append("OrganizedBy", organizedByState.value);
    eventFormData.append(
      "Banner.ImageFile",
      eventBannerState.hasChanged
        ? eventBannerState.value
        : JSON.stringify(null)
    );
    inviteesSelectState
      .getSelectValue()
      .forEach((value: string, index: number) => {
        eventFormData.append(`InviteesIds[${index}]`, value);
      });

    if (isEditing) {
      const response = await editEvent({
        data: eventFormData,
        eventId: editFields.id,
      });

      if ("error" in response) return;

      navigate(`${STATIC_ROUTES.viewEvent}/${editFields.id}`);
    } else {
      const response = await createEvent(eventFormData);
      if ("error" in response) return;

      if (response.data.status === EventStatuses.Approved) {
        await outlook.add(response.data);
      }
      navigate(STATIC_ROUTES.home);
    }
  };

  const handlePositiveAction = () => {
    if (!isEditing) {
      handleSubmit();
      return;
    }
    setModalState(MODAL_STATES.SUBMITTING);
  };

  const handleNegativeAction = () => {
    setModalState(MODAL_STATES.CANCELING);
  };

  const handleModalConfirmation = () => {
    if (modalState === MODAL_STATES.SUBMITTING) handleSubmit();
    if (modalState === MODAL_STATES.CANCELING) {
      navigate(STATIC_ROUTES.home);
    }
    setModalState(MODAL_STATES.CLOSED);
  };

  const handleModalNegation = () => {
    setModalState(MODAL_STATES.CLOSED);
  };

  let modalContent;

  switch (modalState) {
    case MODAL_STATES.SUBMITTING: {
      modalContent = "Are you sure you want to update this event?";
      break;
    }
    case MODAL_STATES.CANCELING: {
      modalContent = isEditing
        ? "Do you really want to cancel editing this event?"
        : "Do you really want to cancel the creation of an event?";
      break;
    }
    default: {
      modalContent = "";
    }
  }

  return (
    <>
      <PageTitle>{isEditing ? "Edit" : "Create"} an Event</PageTitle>
      <SMainContainer>
        <SContainer>
          <Input
            name="title"
            id="title"
            type="text"
            label="Event Title"
            state={titleState}
            required
            maxLen={150}
          />
          <Input
            name="start-date"
            id="start-date"
            type="date"
            label="Starting Date"
            state={startDateState}
            required
          />
          <Input
            name="end-date"
            id="end-date"
            type="date"
            label="Ending Date"
            state={endDateState}
            required
          />

          <CustomSelect {...categorySelectState} />

          <Input
            id="description"
            name="description"
            type="description"
            label="Event Description"
            required
            maxLen={2000}
            styles={{ height: "6.25rem" }}
            state={descriptionState}
          />
        </SContainer>
        <SContainer>
          <SToggleContainer>
            <Toggle id="event-type" state={eventTypeState} />
            {isAdmin && <Toggle id="organized-by" state={organizedByState} />}
          </SToggleContainer>

          <LocationGroup inputState={eventLocationState} isOnline={isOnline} />

          <SSelectContainer>
            <SContainer>
              <CountriesSelect state={countriesSelectState} />
            </SContainer>

            <SContainer>
              <InviteesSelect
                countriesSelect={countriesSelectState}
                inviteesSelect={inviteesSelectState}
              />
            </SContainer>
          </SSelectContainer>

          <UploadButton
            id="event-banner"
            name="event-banner"
            label="Upload an event banner"
            state={eventBannerState}
          />

          <SButtonContainer>
            <Button
              type="button"
              buttonType={ButtonType.SOLID}
              disabled={
                isEditing
                  ? !inputs.haveChanged || !inputs.areValid
                  : !inputs.areValid
              }
              onClick={handlePositiveAction}
            >
              {isEditing ? "Update" : "Submit"}
            </Button>
            <Button
              type="button"
              buttonType={ButtonType.SOLID}
              onClick={handleNegativeAction}
            >
              Cancel
            </Button>
          </SButtonContainer>
        </SContainer>

        <ModalContainer isActive={modalState !== MODAL_STATES.CLOSED}>
          <Modal>
            <ModalTitle>{modalContent}</ModalTitle>
            <SButtonContainer>
              <Button
                type="button"
                buttonType={ButtonType.OUTLINED}
                customStyles={ModalButtonStyles}
                onClick={handleModalConfirmation}
              >
                Yes
              </Button>
              <Button
                type="button"
                buttonType={ButtonType.OUTLINED}
                onClick={handleModalNegation}
                customStyles={{
                  ...ModalButtonStyles,
                  backgroundColor: "var(--primary-color-red)",
                }}
              >
                No
              </Button>
            </SButtonContainer>
          </Modal>
        </ModalContainer>
      </SMainContainer>
    </>
  );
};

export default EventForm;
