// hooks/methods
import { Link } from "react-router-dom";
import { useGetPersonalInfoQuery } from "services/api/gatherapp";
import { useContext, useState } from "react";
import ModalContext from "Contexts/ModalContext";
import { useAppSelector } from "store/store";

// components
import Button from "components/Reusable/Button/Button";
import Calendar from "components/Calendar/Calendar";
import {
  faUser,
  faEnvelope,
  faLocationDot,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import SelectLocation from "components/SelectLocation/SelectLocation";
import ProfileImage from "components/ProfileImage/ProfileImage";
import InformationField from "components/Reusable/InformationField/InformationField";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

// styles
import {
  SMainContainer,
  LeftContainer,
  SLocationButtonStyles,
  SInfoContainer,
  SButton,
} from "pages/MyProfile/styles";

const MyProfile = () => {
  const { handleModal } = useContext(ModalContext);
  const userId = useAppSelector((state) => state.login.user.id);

  const [isOpen, setIsOpen] = useState(false);
  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  const { data, isLoading, isSuccess, isError } = useGetPersonalInfoQuery({
    userId,
  });

  if (isLoading) return <NotificationMessage type="loading" />;
  if (isError || !isSuccess)
    return (
      <NotificationMessage
        type="error"
        message="Oops! Something went wrong :O"
      />
    );
  const handleLocationButtoModal = () => {
    handleModal(
      <SelectLocation
        user={data}
        closeModal={() => handleModal(null, false)}
      />,
      true
    );
  };

  const countryLabel: string | JSX.Element =
    data.countryName !== null ? (
      data.countryName
    ) : (
      <Button
        onClick={handleLocationButtoModal}
        customStyles={SLocationButtonStyles}
      >
        Add Location
      </Button>
    );

  const changePasswordLabel: string | JSX.Element = (
    <Link to="/change-password">
      <Button customStyles={SLocationButtonStyles}>Change Password</Button>
    </Link>
  );

  return (
    <SMainContainer>
      <LeftContainer>
        <ProfileImage initialUrl={data.profilePicture} userId={data.id} />
        <SButton onClick={toggleInfo} isSelected={isOpen}>
          Personal Information
        </SButton>
        {isOpen && (
          <SInfoContainer>
            <InformationField
              icon={faUser}
              label={`${data.firstName} ${data.lastName}`}
            />
            <InformationField icon={faEnvelope} label={data.email} />
            <InformationField icon={faLocationDot} label={countryLabel} />
            <InformationField icon={faLock} label={changePasswordLabel} />
          </SInfoContainer>
        )}
      </LeftContainer>
      <Calendar />
    </SMainContainer>
  );
};
export default MyProfile;
