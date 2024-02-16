// hooks/methods
import { useContext } from "react";
import ModalContext from "Contexts/ModalContext";

// components
import ModalContainer from "components/Reusable/ModalContainer/ModalContainer";

interface IProps {
  handleEdit: () => void;
}

function EditModal({ handleEdit }: IProps) {
  const { handleModal } = useContext(ModalContext);

  const handleModalAction = () => {
    handleModal(null, false);
  };

  const handleEditAction = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    handleModalAction();
    handleEdit();
  };

  return (
    <ModalContainer
      handleModalAction={handleModalAction}
      handleEditAction={handleEditAction}
      message="Editing an already approved event will send the event for reapproval if
      the date or time is changed. Do you want to continue?"
      buttonOneMessage="Yes"
      buttonTwoMessage="No"
    />
  );
}

export default EditModal;
