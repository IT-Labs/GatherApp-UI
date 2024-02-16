import { useContext } from "react";

import ModalContext from "Contexts/ModalContext";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownActions from "ts/enums/DropdownActions";
import { EventOnlyProps } from "ts/types/Event";

import RequestsModal from "components/Reusable/EventDropDown/modals/DeleteEventModal/DeleteEventModal";

import { SLi } from "components/Reusable/EventDropDown/styles";

const DeleteEventAction = ({ event }: EventOnlyProps) => {
  const { handleModal } = useContext(ModalContext);

  const handleDeleteModalTrigger = () => {
    handleModal(<RequestsModal id={event.id} />, true);
  };

  return (
    <SLi onClick={handleDeleteModalTrigger}>
      <FontAwesomeIcon
        icon={faTrash}
        color="var(--primary-color-grey)"
        size="2xs"
        cursor="pointer"
      />
      <p>{DropdownActions.Delete}</p>
    </SLi>
  );
};

export default DeleteEventAction;
