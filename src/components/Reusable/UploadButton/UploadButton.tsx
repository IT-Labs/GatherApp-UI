// hooks/methods
import { FileInputReturnType } from "hooks/useFileInput";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import { faCloudUpload, faXmark } from "@fortawesome/free-solid-svg-icons";

// styles
import {
  SLabel,
  SUploadInput,
  SDiv,
  Container,
  SContainerMain,
  SImage,
  SResetIcon,
} from "./styles";

type Props = {
  id: string;
  name: string;
  label: string;
  state: FileInputReturnType;
} & JSX.IntrinsicElements["input"];

function UploadButton({ name, id, label, state }: Props) {
  const handleResetState = () => {
    state.reset();
  };

  const handleClearFileInput = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.currentTarget.value = "";
  };

  return (
    <SContainerMain>
      <Container>
        <SImage
          alt={state.value.name ? state.value.name : "Event Banner"}
          src={state.imageUrl}
          onDragStart={state.onDragStart}
          onDragOver={state.onDragOver}
          onDrop={state.onDrop}
        />
        {state.hasChanged && (
          <SResetIcon>
            <FontAwesomeIcon
              icon={faXmark}
              color="red"
              size="2x"
              onClick={handleResetState}
              cursor="pointer"
            />
          </SResetIcon>
        )}
      </Container>
      <NotificationMessage
        type="error"
        isShowing={!state.isValid}
        message={state.errorMessage}
      />
      <SDiv direction="row">
        <SLabel>{label}</SLabel>
        <SUploadInput
          id={id}
          type="file"
          name={name}
          onChange={state.onChange}
          accept={state.allowedFileExtensions.join(",")}
          onClick={handleClearFileInput}
        />
        <SLabel htmlFor={id}>
          <FontAwesomeIcon
            icon={faCloudUpload}
            color="var(--primary-color-green)"
            size="2x"
            cursor="pointer"
          />
        </SLabel>
      </SDiv>
    </SContainerMain>
  );
}

export default UploadButton;
