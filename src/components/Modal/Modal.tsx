// hooks/methods
import { ReactNode, CSSProperties, useEffect, useContext, useRef } from "react";
import ModalContext from "Contexts/ModalContext";

// types and constants
import { ModalContextType } from "ts/types/Other";

// styles
import { SModal } from "./styles";

type ModalType = {
  children?: ReactNode | JSX.Element;
  customCss?: CSSProperties | undefined;
};

const Modal = ({ children, customCss }: ModalType) => {
  const { isModalVisible, handleModal }: ModalContextType =
    useContext(ModalContext);
  const modalRef: React.MutableRefObject<string | any> = useRef();

  // handles closing modal
  useEffect(() => {
    if (!isModalVisible) return () => {};

    const handleNavigationButtonClick = () => {
      handleModal(null, false);
    };

    // close modal when you click outside of it
    const handleUserClick = (e: MouseEvent) => {
      if (!modalRef.current.contains(e.target)) {
        handleModal(null, false);
      }
    };

    document.addEventListener("mousedown", handleUserClick);
    window.addEventListener("popstate", handleNavigationButtonClick);
    return () => {
      document.removeEventListener("mousedown", handleUserClick);
      window.removeEventListener("popstate", handleNavigationButtonClick);
    };
  }, [isModalVisible]);

  return isModalVisible ? (
    <SModal ref={modalRef} customCss={customCss ?? {}} data-testid="modal">
      {children}
    </SModal>
  ) : null;
};
export default Modal;
