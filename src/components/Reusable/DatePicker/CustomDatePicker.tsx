/* eslint-disable react/require-default-props */
// hooks/methods
import { FormInputReturnType } from "hooks/useFormInput";

import { DateInputProps } from "components/Reusable/Input/inputTypes";

// styles
import { SCustomDatePicker } from "./styles";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  state: FormInputReturnType;
} & DateInputProps;

function CustomDatePicker({ state, ...dateInputProps }: Props) {
  const {
    showTimeSelect = true,
    timeIntervals = 1,
    timeFormat = "HH:mm",
    timeCaption = "Time",
    ...props
  } = dateInputProps;

  const timeProps = showTimeSelect
    ? {
        timeIntervals,
        timeFormat,
        timeCaption,
      }
    : {};

  return (
    <SCustomDatePicker
      showTimeSelect={showTimeSelect}
      {...timeProps}
      dateFormat={`MMMM d, yyyy${showTimeSelect ? " h:mm aa" : ""}`}
      {...props}
      selected={new Date(state.value)}
      value={state.value}
      onBlur={state.onBlur}
      onChange={(value) => {
        state.setValue(value);
      }}
    />
  );
}

export default CustomDatePicker;
