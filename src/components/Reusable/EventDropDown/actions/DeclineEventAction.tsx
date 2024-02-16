import { useContext } from "react";

import ModalContext from "Contexts/ModalContext";

import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownActions from "ts/enums/DropdownActions";
import { EventOnlyProps } from "ts/types/Event";

import DeclineEventModal from "components/Reusable/EventDropDown/modals/DeclineEventModal/DeclineEventModal";

import { SLi } from "components/Reusable/EventDropDown/styles";

const DeclineEventAction = ({ event }: EventOnlyProps) => {
  const { handleModal } = useContext(ModalContext);

  const handleDeclineModalTrigger = () => {
    handleModal(<DeclineEventModal id={event.id} />, true);
  };

  return (
    <SLi onClick={handleDeclineModalTrigger}>
      <FontAwesomeIcon
        icon={faXmarkCircle}
        color="var(--primary-color-red)"
        size="2xs"
        cursor="pointer"
      />
      <p>{DropdownActions.Decline}</p>
    </SLi>
  );
};

export default DeclineEventAction;
