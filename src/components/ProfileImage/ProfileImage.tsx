// hooks/methods

import useFileInput from "hooks/useFileInput";
import {
  useRemoveProfilePictureMutation,
  useUploadPictureMutation,
} from "services/api/gatherapp";
import { useRef } from "react";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// components
import {
  faCheckCircle,
  faXmarkCircle,
  faCancel,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

// types and constants

// styles
import {
  SLabel,
  SUploadInput,
  SImage,
  SContainerMain,
  SImageContainer,
  SButtonsContainer,
  SContainer,
} from "./styles";

const FILE_ID = "upload-file";

type Props = {
  initialUrl: string;
  userId: string;
};

function ProfileImage({ initialUrl, userId }: Props) {
  const [uploadPicture] = useUploadPictureMutation();
  const [removeProfilePicture] = useRemoveProfilePictureMutation();

  const inputRef = useRef<HTMLInputElement>(null);

  const imageState = useFileInput({ initialUrl });

  const handleClearUpload = () => {
    imageState.reset();
  };

  const handleClearFileInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
  };

  const handleUploadPicture = async () => {
    if (!imageState.isValid) return;
    const formDataTest = new FormData();
    formDataTest.append("id", userId);
    formDataTest.append("picture.ImageFile", imageState.value);
    await uploadPicture(formDataTest);
  };

  const handleRemoveProfilePicture = async () => {
    const formData = {
      id: userId,
    };

    await removeProfilePicture(formData);
  };

  return (
    <SContainerMain>
      <SImageContainer>
        <SImage
          alt={imageState.value.name ? imageState.value.name : "Profile Image"}
          src={imageState.imageUrl}
          onDragStart={imageState.onDragStart}
          onDragOver={imageState.onDragOver}
          onDrop={imageState.onDrop}
        />
      </SImageContainer>
      <SContainer>
        <SLabel htmlFor={FILE_ID}>
          <FontAwesomeIcon
            icon={faEdit}
            size="2x"
            color="var(--primary-color-green)"
            cursor="pointer"
          />
        </SLabel>
        {imageState.hasChanged ? (
          <SButtonsContainer isRemoveButton={false}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              title={imageState.isValid ? "Accept" : imageState.errorMessage}
              size="2x"
              color={
                imageState.isValid
                  ? "var(--primary-color-cyan)"
                  : "var(--primary-color-grey)"
              }
              cursor={imageState.isValid ? "pointer" : "auto"}
              onClick={handleUploadPicture}
            />
            <FontAwesomeIcon
              icon={faXmarkCircle}
              title="Remove"
              size="2x"
              color="var(--primary-color-red)"
              cursor="pointer"
              onClick={handleClearUpload}
              style={{ marginLeft: "1rem" }}
            />
          </SButtonsContainer>
        ) : (
          <SButtonsContainer isRemoveButton>
            {initialUrl !==
              process.env.REACT_APP_PLACEHOLDER_PROFILE_IMAGE_URL && (
              <FontAwesomeIcon
                icon={faCancel}
                title="Delete profile picture"
                size="2x"
                color="var(--primary-color-red)"
                cursor="pointer"
                onClick={handleRemoveProfilePicture}
              />
            )}
          </SButtonsContainer>
        )}
        <SUploadInput
          type="file"
          id={FILE_ID}
          onChange={imageState.onChange}
          accept={imageState.allowedFileExtensions.join(",")}
          ref={inputRef}
          onClick={handleClearFileInput}
        />
      </SContainer>
    </SContainerMain>
  );
}

export default ProfileImage;
