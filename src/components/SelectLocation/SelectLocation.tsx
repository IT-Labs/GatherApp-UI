import { useCustomSelect } from "hooks/useCustomSelect";
import { useDispatch } from "react-redux";
import { updateUser } from "features/login/loginSlice";
import { useUpdateLocationMutation } from "services/api/gatherapp";

import { CountryOption, UserDetails } from "ts/types/User";
import CountriesSelect from "components/CountriesSelect/CountriesSelect";
import Button from "components/Reusable/Button/Button";

import { SModal, ConfirmButtonStyles } from "./styles";

type Props = {
  user: UserDetails;
  closeModal: () => void;
};
export default function SelectLocation({ user, closeModal }: Props) {
  const [updateLocation] = useUpdateLocationMutation();
  const dispatch = useDispatch();

  const countrySelectState = useCustomSelect<CountryOption, false>({
    id: "select-country-select",
    label: "Please Select your country before proceeding",
    required: false,
    isMulti: false,
    placeholder: "Choose a country",
  });

  const handleSubmit = () => {
    const newCountryId = countrySelectState.getSelectValue();

    const newCountryName = countrySelectState.getSelectLabel();

    const formDataTest = {
      id: user.id,
      countryId: newCountryId,
    };
    updateLocation(formDataTest)
      .unwrap()
      .then(() => {
        const userCopy = { ...user };
        userCopy.countryId = newCountryId;
        userCopy.countryName = newCountryName;
        localStorage.setItem("user", JSON.stringify(userCopy));
        dispatch(updateUser(userCopy));
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SModal>
      <CountriesSelect state={countrySelectState} />
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={!countrySelectState.hasChanged}
        customStyles={ConfirmButtonStyles}
      >
        Save
      </Button>
    </SModal>
  );
}
