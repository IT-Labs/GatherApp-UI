/* eslint-disable @typescript-eslint/no-use-before-define */
// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validationSchemas } from "constants/validationSchemas";
import dayjs from "dayjs";

// hooks
import { useEffect } from "react";
import { useCustomSelect } from "hooks/useCustomSelect";
import useFormInput from "hooks/useFormInput";
import useInputs from "hooks/useInputs";

// components
import { faX } from "@fortawesome/free-solid-svg-icons";
import CountriesSelect from "components/CountriesSelect/CountriesSelect";
import Button from "components/Reusable/Button/Button";
import CustomSelect from "components/Reusable/Select/CustomSelect";
import Input from "components/Reusable/Input/Input";

// types
import { CountryOption } from "ts/types/User";
import { HomeStateProps } from "components/HomePageFilters/HomePageFilters";

// constants
import {
  categoryFilterData,
  eventOrganizersData,
  typesFilterData,
} from "constants/selectOptions";

// styles
import {
  LoadMoreButtonStyles,
  SFilterContainer,
  SXIconContainer,
  StyledProps,
} from "components/FiltersGroup/styles";

type Props = {
  handleCloseModal: () => void;
} & StyledProps &
  HomeStateProps;

const FiltersGroup = ({
  setAreInputsChanged,
  setFilters,
  isMobileView,
  isToggledOn,
  handleCloseModal,
}: Props) => {
  // filter states
  const categoriesFilterState = useCustomSelect({
    defaultValue: categoryFilterData[0],
    options: categoryFilterData,
    id: "choose-category-filter",
    label: "Filter by category",
    required: false,
    isMulti: false,
    placeholder: "Choose a category",
  });

  const countryFilterState = useCustomSelect<CountryOption, false, any>({
    id: "choose-country-filter",
    label: "Filter by country",
    required: false,
    isMulti: false,
    placeholder: "Choose a country",
  });

  const organizerFilterState = useCustomSelect({
    defaultValue: eventOrganizersData[0],
    options: eventOrganizersData,
    id: "choose-organizer-filter",
    label: "Filter by organizer",
    required: false,
    isMulti: false,
    placeholder: "Choose an organizer",
  });

  const eventTypeFilterState = useCustomSelect({
    defaultValue: typesFilterData[0],
    options: typesFilterData,
    id: "choose-event-type-filter",
    label: "Filter by type",
    required: false,
    isMulti: false,
    placeholder: "Choose a type",
  });

  const startDateFilterState = useFormInput({
    initialValue: dayjs(new Date()),
    zodSchema: validationSchemas.shared.dateSchema,
    onChange: (value) => {
      const startDate = dayjs(value);
      const endDate = dayjs(endDateFilterState.value);
      if (startDate.isAfter(endDate)) {
        endDateFilterState.setValue(startDate.add(7, "days"));
      }
    },
  });

  const endDateFilterState = useFormInput({
    initialValue: dayjs(new Date()).add(1, "year"),
    zodSchema: validationSchemas.shared.dateSchema.refine(
      (endDate) => dayjs(endDate).isAfter(dayjs(startDateFilterState.value)),
      "End date must be after start Date."
    ),
  });

  const inputs = useInputs(
    categoriesFilterState,
    countryFilterState,
    organizerFilterState,
    eventTypeFilterState,
    startDateFilterState,
    endDateFilterState
  );

  const handleResetButtonClick = () => {
    inputs.reset();
  };
  useEffect(() => {
    setFilters({
      category: categoriesFilterState.getSelectValue(),
      location: countryFilterState.getSelectValue(),
      type: eventTypeFilterState.getSelectValue(),
      organizer: organizerFilterState.getSelectValue(),
      startDate: startDateFilterState.value.toISOString(),
      endDate: endDateFilterState.value.toISOString(),
    });
    setAreInputsChanged(inputs.haveChanged);
  }, [
    categoriesFilterState.props.value,
    countryFilterState.props.value,
    eventTypeFilterState.props.value,
    organizerFilterState.props.value,
    startDateFilterState.value,
    endDateFilterState.value,
  ]);

  const styledProps = {
    isMobileView,
    isToggledOn,
  };

  return (
    <SFilterContainer {...styledProps}>
      {isMobileView && (
        <SXIconContainer onClick={handleCloseModal}>
          <FontAwesomeIcon
            icon={faX}
            id="hamburgerIcon"
            cursor="pointer"
            size="2x"
          />
        </SXIconContainer>
      )}

      <CustomSelect {...categoriesFilterState} />

      <CountriesSelect state={countryFilterState} isFilter />

      <CustomSelect {...organizerFilterState} />

      <CustomSelect {...eventTypeFilterState} />

      <Input
        name="start-date"
        id="start-date"
        type="date"
        label="Starting Date"
        state={startDateFilterState}
        showTimeSelect={false}
        required={false}
      />

      <Input
        name="end-date"
        id="end-date"
        type="date"
        label="Ending Date"
        state={endDateFilterState}
        showTimeSelect={false}
        required={false}
      />

      <Button
        disabled={!inputs.haveChanged}
        onClick={handleResetButtonClick}
        customStyles={LoadMoreButtonStyles}
      >
        Reset
      </Button>
    </SFilterContainer>
  );
};

export default FiltersGroup;
