// hooks/methods
import { useReducer } from "react";

// libraries
import { ZodSchema, z } from "zod";

export const USER_ACTIONS = {
  USER_INPUT: "USER_INPUT",
  INPUT_BLUR: "INPUT_BLUR",
} as const;

export const INPUT_ACTIONS = {
  RESET: "RESET",
  SET: "SET",
} as const;

type ReducerActions = {
  type: keyof typeof USER_ACTIONS | keyof typeof INPUT_ACTIONS;
  value?: any;
};
type State = {
  value: any;
  isTouched: boolean;
  hasChanged: boolean;
};

const inputStateReducer = (state: State, action: ReducerActions): State => {
  if (action.type === USER_ACTIONS.USER_INPUT) {
    return {
      value: action.value,
      isTouched: state.isTouched,
      hasChanged: true,
    };
  }
  if (action.type === USER_ACTIONS.INPUT_BLUR) {
    return {
      isTouched: true,
      value: state.value,
      hasChanged: state.hasChanged,
    };
  }
  if (action.type === INPUT_ACTIONS.SET) {
    return { value: action.value, isTouched: true, hasChanged: true };
  }
  if (action.type === INPUT_ACTIONS.RESET) {
    return { value: action.value, isTouched: false, hasChanged: false };
  }

  return state;
};

type InputType = {
  initialValue: any;
  zodSchema?: ZodSchema;
  onChange?: (value: any) => void;
};

export type FormInputReturnType = {
  hasError: boolean;
  errorMessage: string;
  isValid: boolean;
  hasChanged: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (newValue: any) => void;
  onBlur: () => void;
  reset: () => void;
} & State;

const useFormInput = ({
  initialValue = "",
  zodSchema = z.any(),
  onChange,
}: InputType): FormInputReturnType => {
  const initialInputState = {
    value: initialValue,
    isTouched: false,
    hasChanged: false,
  };
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const result = zodSchema.safeParse(inputState.value);
  const valueIsValid = result.success;
  const hasError = !valueIsValid && inputState.isTouched;
  const errorMessage = hasError ? result.error.errors[0].message : "";

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: USER_ACTIONS.USER_INPUT,
      value: e.target.value,
    });
    if (onChange !== undefined) onChange(e.target.value);
  };

  const inputBlurHandler = () => {
    dispatch({ type: USER_ACTIONS.INPUT_BLUR });
  };

  const setValue = (newValue: any) => {
    dispatch({ type: INPUT_ACTIONS.SET, value: newValue });
    if (onChange !== undefined) onChange(newValue);
  };

  const reset = () => {
    dispatch({ type: INPUT_ACTIONS.RESET, value: initialValue });
  };
  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    hasChanged: inputState.hasChanged,
    hasError,
    errorMessage,
    isValid: valueIsValid,
    onChange: valueChangeHandler,
    onBlur: inputBlurHandler,
    setValue,
    reset,
  };
};

export default useFormInput;
