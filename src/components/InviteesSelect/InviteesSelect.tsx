// hooks/methods
import { useGetUsersByNameQuery } from "services/api/gatherapp";
import { CustomSelectHookReturnType } from "hooks/useCustomSelect";
import { mapInviteeToOptions } from "utils/helpers";

// components
import CustomSelect from "components/Reusable/Select/CustomSelect";
import InviteeSelectCard from "components/InviteeSelectCard/InviteeSelectCard";

// types and constants
import { CountryOption, InviteeOption } from "ts/types/User";

type Props = {
  countriesSelect: CustomSelectHookReturnType<CountryOption, true>;
  inviteesSelect: CustomSelectHookReturnType<InviteeOption, true>;
};

export default function InviteesSelect({
  countriesSelect,
  inviteesSelect,
}: Props) {
  const {
    data: usersSearchData,
    isLoading,
    isSuccess,
  } = useGetUsersByNameQuery({
    name: inviteesSelect.props.inputValue
      ? inviteesSelect.props.inputValue
      : "",
    countries: countriesSelect.getSelectValue(),
  });

  const inviteeOptions = isSuccess
    ? usersSearchData.map((item) => mapInviteeToOptions(item))
    : inviteesSelect.props.options;

  const formatOptionLabel = (data: unknown) =>
    isSuccess ? <InviteeSelectCard {...(data as InviteeOption)} /> : undefined;

  return (
    <CustomSelect
      {...inviteesSelect}
      props={{
        ...inviteesSelect.props,
        options: inviteeOptions,
        formatOptionLabel,
        isLoading,
      }}
    />
  );
}
