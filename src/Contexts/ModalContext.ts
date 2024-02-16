// hooks/methods
import { createContext } from "react";

// types and constants
import { ModalContextType } from "ts/types/Other";

const ModalContext = createContext<ModalContextType>({
  handleModal: () => null,
  isModalVisible: false,
});

export default ModalContext;
