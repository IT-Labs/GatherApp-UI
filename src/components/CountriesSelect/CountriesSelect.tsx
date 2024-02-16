// hooks/methods
import { useGetCountriesQuery } from "services/api/gatherapp";
import {
  CustomSelectHookReturnType,
  mapToOptions,
} from "hooks/useCustomSelect";

// components
import CustomSelect from "components/Reusable/Select/CustomSelect";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

// types and constants
import { CountryOption } from "ts/types/User";
import { allOption } from "constants/selectOptions";

type Props = {
  state:
    | CustomSelectHookReturnType<CountryOption>
    | CustomSelectHookReturnType<CountryOption, true>;
  isFilter?: boolean;
};

export default function CountriesSelect({ state, isFilter = false }: Props) {
  const {
    data: countriesData,
    isLoading,
    isSuccess,
    isError,
  } = useGetCountriesQuery();

  if (isLoading) return <NotificationMessage type="loading" />;
  if (isError || !isSuccess)
    return (
      <NotificationMessage
        type="error"
        message="Oops! Something went wrong :O"
      />
    );

  let countriesOptions;

  const countryArray = countriesData.countries.map((item) => {
    return {
      label: item.countryName,
      value: isFilter ? item.countryName : item.countryId,
    };
  });

  if (isFilter) {
    countriesOptions = mapToOptions([allOption, ...countryArray]);
  } else {
    countriesOptions = countryArray;
  }

  return (
    <CustomSelect
      {...state}
      props={{
        ...state.props,
        options: countriesOptions,
        defaultValue: countriesOptions[0],
      }}
    />
  );
}
