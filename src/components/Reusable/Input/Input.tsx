/* eslint-disable react/require-default-props */
// hooks/methods
import { FormInputReturnType } from "hooks/useFormInput";
import { stripHtmlTagsAndEntities } from "utils/helpers";

// components
import Description from "components/Description/Description";
import Label from "components/Reusable/Label/Label";
import CustomDatePicker from "components/Reusable/DatePicker/CustomDatePicker";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import { PasswordInput } from "./PasswordInput";

// types and constants
import {
  DateInputProps,
  IntrinsicInputProps,
  OptionalInputProps,
} from "./inputTypes";

// styles
import "quill/dist/quill.snow.css";
import { SInput, SContainer, SCounter } from "./styles";

// interface for the main Input component

export type InputProps = {
  state: FormInputReturnType;
} & IntrinsicInputProps &
  OptionalInputProps;

// our main Input component
function Input({
  required,
  id,
  name,
  type,
  placeholder = "",
  label,
  state,
  maxLen,
  styles = {},
  ...inputProps
}: InputProps) {
  const intrinsicInputProps = {
    id,
    name,
    type,
    placeholder,
    required,
    ...inputProps,
  };

  let input: JSX.Element | null = null;

  switch (type) {
    case "password":
      input = (
        <PasswordInput
          intrinsicInputProps={intrinsicInputProps as IntrinsicInputProps}
          state={state}
          styles={styles}
        />
      );
      break;
    case "description":
      input = <Description state={state} />;
      break;
    case "date":
      input = (
        <CustomDatePicker
          state={state}
          {...(intrinsicInputProps as DateInputProps)}
        />
      );
      break;
    default:
      input = (
        <SInput
          value={state.value}
          onChange={state.onChange}
          onBlur={state.onBlur}
          {...styles}
          {...intrinsicInputProps}
        />
      );
      break;
  }

  const counter = maxLen ? (
    <SCounter>
      <p>
        {type === "description"
          ? stripHtmlTagsAndEntities(state.value).length
          : state.value.length}
        / {maxLen}
      </p>
    </SCounter>
  ) : null;

  return (
    <SContainer>
      <div style={{ position: "relative", width: "100%" }}>
        {label && <Label required={required} content={label} id={id} />}
        <div style={{ position: "relative", width: "100%" }}>
          {input}
          {counter}
        </div>
        <NotificationMessage
          type="error"
          isShowing={state.hasError}
          message={state.errorMessage}
        />
      </div>
    </SContainer>
  );
}
export default Input;
