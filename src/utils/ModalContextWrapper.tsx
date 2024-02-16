import { useMemo } from "react";

import Modal from "components/Modal/Modal";
import ModalContext from "Contexts/ModalContext";

// hooks/methods
import useModal from "hooks/useModal";
import { ModalContextType } from "ts/types/Other";

type Props = {
  children: React.ReactNode;
};

const ModalContextWrapper = ({ children }: Props) => {
  const { isModalVisible, modalContent, handleModal } = useModal();

  // using the memo hook to solve https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md - performance improvement
  const contextValue: ModalContextType = useMemo(
    () => ({ isModalVisible, handleModal }),
    [isModalVisible]
  );
  return (
    <ModalContext.Provider value={contextValue}>
      <div
        style={
          isModalVisible
            ? { pointerEvents: "none", filter: "blur(0.313rem)" }
            : {}
        }
      >
        {children}
      </div>
      <Modal>{modalContent}</Modal>
    </ModalContext.Provider>
  );
};

export default ModalContextWrapper;
