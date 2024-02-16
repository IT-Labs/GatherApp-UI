import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Reusable/Button/Button";

import { SButtonContainer, DeclineModal, SModalContainer } from "./styles";

interface ModalProps {
  handleModalAction: () => void;
  handleEditAction: (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => void;
  message: string;
  buttonOneMessage: string;
  buttonTwoMessage: string;
  children?: any;
}

export default function ModalContainer({
  handleModalAction,
  handleEditAction,
  message,
  buttonOneMessage,
  buttonTwoMessage,
  children,
}: ModalProps) {
  const isRequestDecline = !!children;

  return (
    <SModalContainer>
      <FontAwesomeIcon
        icon={faXmark}
        style={{ marginLeft: "auto", marginBottom: "1rem", cursor: "pointer" }}
        onClick={handleModalAction}
      />
      {message}
      {children}
      <SButtonContainer isRequestDecline={isRequestDecline}>
        <Button type="submit" onClick={handleEditAction}>
          {buttonOneMessage}
        </Button>
        <Button type="button" onClick={handleModalAction} style={DeclineModal}>
          {buttonTwoMessage}
        </Button>
      </SButtonContainer>
    </SModalContainer>
  );
}
