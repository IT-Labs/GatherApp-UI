// hooks/methods
import { useContext } from "react";
import { useDeclineEventMutation } from "services/api/gatherapp";
import useFormInput from "hooks/useFormInput";
import ModalContext from "Contexts/ModalContext";

// libraries
import { z } from "zod";

// components
import ModalContainer from "components/Reusable/ModalContainer/ModalContainer";
import Input from "components/Reusable/Input/Input";

// types and constants
import { DeclineEventRequest, SingleEvent } from "ts/types/Event";
import { EventStatuses } from "ts/enums/EventStatuses";

function DeclineEventModal({ id }: Pick<SingleEvent, "id">) {
  const [declineEvent] = useDeclineEventMutation();

  const { handleModal } = useContext(ModalContext);

  const declineReasonState = useFormInput({
    initialValue: "",
    zodSchema: z
      .string()
      .max(150, { message: "A maximum of 150 characters are allowed." }),
  });

  const handleModalAction = () => {
    handleModal(null, false);
  };

  const handleDeclineEvent = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();

    const formData: DeclineEventRequest = {
      id,
      status: EventStatuses.Declined,
      declineReason: declineReasonState.value,
    };

    await declineEvent(formData);
    handleModalAction();
  };

  return (
    <ModalContainer
      handleModalAction={handleModalAction}
      handleEditAction={handleDeclineEvent}
      message="Decline reason"
      buttonOneMessage="Decline"
      buttonTwoMessage="Cancel"
    >
      <Input
        id="decline-reason"
        name="decline-reason"
        type="text"
        required
        placeholder="Enter decline reason"
        state={declineReasonState}
        style={{ marginTop: "1rem" }}
      />
    </ModalContainer>
  );
}

export default DeclineEventModal;
