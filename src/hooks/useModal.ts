// hooks/methods
import { useState } from "react";

type IModal = (content: JSX.Element | null, isVisible?: boolean | null) => void;

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const handleModal: IModal = (
    content,
    // we use isVisible argument to differentiate clicking outside the modal (and closing it that way) when it's visible and not
    isVisible = true
  ) => {
    if (!isVisible) {
      setIsModalVisible(false);
    } else {
      setIsModalVisible(!isModalVisible);
    }

    if (content) {
      setModalContent(content);
    }
  };

  return { isModalVisible, handleModal, modalContent };
};

export default useModal;
