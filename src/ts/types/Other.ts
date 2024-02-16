export type ModalContextType = {
  isModalVisible: boolean;
  handleModal: (
    content: JSX.Element | null,
    isVisible?: boolean | null
  ) => void;
};

export type NavBarProps = {
  isAdmin: boolean;
  toggle: boolean;
  handleClick: () => void;
};

export type CustomSelectFormat = {
  label: string;
  value: string;
};
