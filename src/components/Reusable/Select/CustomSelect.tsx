// hooks/methods
import { CustomSelectHookReturnType } from "hooks/useCustomSelect";

// libraries
import {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
  StylesConfig,
} from "react-select";

// components
import Label from "components/Reusable/Label/Label";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

// styles
import { SCustomSelect, SContainer } from "./styles";

function CustomSelect(
  props: CustomSelectHookReturnType<any, any> & { hasMessage?: boolean }
) {
  const {
    isValid,
    errorMessage,
    hasMessage = true,
    props: { id, width, required, label, ...baseProps },
  } = props;
  /* this is an object for custom styles of select component border */
  const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
    control: (baseStyles: CSSObjectWithLabel, state: ControlProps) => ({
      ...baseStyles,
      borderColor: "var(--primary-color-cyan)",
      width: width ?? "100%",
      borderRadius: "var(--primary-border-radius)",
      textAlign: "left",
      fontSize: "0.9rem",
      cursor: "pointer",
      boxShadow: state.isFocused ? "var(--input-box-shadow)" : "none",
      "&:hover": {
        borderColor: "var(--primary-color-cyan)",
      },
    }),
    container: (provided: CSSObjectWithLabel) => ({
      ...provided,
      padding: "0",
      minHeight: "2.188rem",
      width: width ?? "100%",
      minWidth: "8rem",
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: width ?? "100%",
    }),
    option: (provided: CSSObjectWithLabel) => ({
      ...provided,
      textAlign: "left",
      fontSize: "0.9rem",
      cursor: "pointer",
    }),
  };

  return (
    <SContainer>
      {label && id && (
        <Label required={required || false} content={label} id={id} />
      )}
      <SCustomSelect {...baseProps} styles={customStyles} />
      {hasMessage && (
        <NotificationMessage
          type="error"
          isShowing={!isValid}
          message={errorMessage}
        />
      )}
    </SContainer>
  );
}
export default CustomSelect;
