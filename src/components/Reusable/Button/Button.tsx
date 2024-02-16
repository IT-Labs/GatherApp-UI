// types and constants
import { ButtonType } from "ts/enums/ButtonType";

// styles
import { SButton } from "components/Reusable/Button/styles";

type CustomStyles = {
  hoverStyles?: {};
  disabledStyles?: {};
  [key: string]: any;
};

export type ButtonProps = {
  children: React.ReactNode;
  buttonType?: ButtonType;
  customStyles?: CustomStyles;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  buttonType = ButtonType.SOLID,
  customStyles,
  ...props
}: ButtonProps) {
  return (
    <SButton {...props} customStyles={customStyles} buttonType={buttonType}>
      {children}
    </SButton>
  );
}
