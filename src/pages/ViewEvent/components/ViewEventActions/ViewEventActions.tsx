import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import ModalContext from "Contexts/ModalContext";

import CTAButtons from "components/Reusable/CTAButtons/CTAButtons";
import ViewInviteesModal from "components/ViewInviteesModal/ViewInviteesModal";

import { EventOnlyProps } from "ts/types/Event";

import { SInvitesButton, SCounter, SButtonContainer } from "./styles";

const ViewEventActions = ({ event }: EventOnlyProps) => {
  const { handleModal } = useContext(ModalContext);
  const handleOpenInviteesModal = () => {
    handleModal(<ViewInviteesModal invitations={event.invitations} />, true);
  };
  return (
    <SButtonContainer>
      <CTAButtons event={event} />

      <SInvitesButton onClick={handleOpenInviteesModal}>
        <FontAwesomeIcon
          icon={faUsers}
          color="var(--primary-color-green)"
          size="3x"
        />
        <SCounter>
          {
            event.invitations.filter(
              (invitation) =>
                invitation.inviteStatus !== "NotGoing" &&
                invitation.inviteStatus !== "NoResponse"
            ).length
          }
        </SCounter>
      </SInvitesButton>
    </SButtonContainer>
  );
};

export default ViewEventActions;
