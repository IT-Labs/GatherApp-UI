// hooks/methods
import { useContext } from "react";
import { useDeleteEventMutation } from "services/api/gatherapp";
import ModalContext from "Contexts/ModalContext";

// components
import ModalContainer from "components/Reusable/ModalContainer/ModalContainer";
import { SingleEvent } from "ts/types/Event";

function RequestsModal({ id }: Pick<SingleEvent, "id">) {
  const [deleteEvent] = useDeleteEventMutation();
  const { handleModal } = useContext(ModalContext);

  const handleModalAction = () => {
    handleModal(null, false);
  };

  const handleDeleteEventAction = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();

    await deleteEvent(id);
    handleModalAction();
  };

  return (
    <ModalContainer
      handleModalAction={handleModalAction}
      handleEditAction={handleDeleteEventAction}
      message="Are you sure you want to delete this event?"
      buttonOneMessage="Delete"
      buttonTwoMessage="Cancel"
    />
  );
}

export default RequestsModal;
