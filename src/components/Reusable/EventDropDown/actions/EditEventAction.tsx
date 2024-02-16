import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import ModalContext from "Contexts/ModalContext";
import { useAppSelector } from "store/store";
import { isUserAdmin } from "utils/helpers";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownActions from "ts/enums/DropdownActions";
import { EventStatuses } from "ts/enums/EventStatuses";
import { EventOnlyProps } from "ts/types/Event";

import EditModal from "components/Reusable/EventDropDown/modals/EditEventModal/EditEventModal";

import { SLi } from "components/Reusable/EventDropDown/styles";

const EditEventAction = ({ event }: EventOnlyProps) => {
  const { handleModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const userRole = useAppSelector((state) => state.login.user.roleName);
  const isAdmin = isUserAdmin(userRole);

  const handleEditEvent = () => {
    navigate(`/edit-event/${event.id}`);
  };

  const handleEditModalTrigger = () => {
    if (!isAdmin && event.status === EventStatuses.Approved) {
      handleModal(<EditModal handleEdit={handleEditEvent} />, true);
    } else {
      handleEditEvent();
    }
  };

  return (
    <SLi onClick={handleEditModalTrigger}>
      <FontAwesomeIcon
        icon={faEdit}
        color="var(--primary-color-orange)"
        size="2xs"
        cursor="pointer"
      />
      <p>{DropdownActions.Edit}</p>
    </SLi>
  );
};

export default EditEventAction;
