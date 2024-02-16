import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FormInputReturnType } from "hooks/useFormInput";

import { SInput, SEye, InputStyleProps } from "./styles";

import { IntrinsicInputProps } from "./inputTypes";

type PasswordInputProps = {
  intrinsicInputProps: IntrinsicInputProps;
  styles: InputStyleProps;
  state: FormInputReturnType;
};

export const PasswordInput = ({
  intrinsicInputProps,
  styles,
  state,
}: PasswordInputProps) => {
  const { type, ...inputProps } = intrinsicInputProps;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordType = isPasswordVisible ? "text" : type;
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <SInput
        value={state.value}
        onChange={state.onChange}
        onBlur={state.onBlur}
        padding="0.625rem 3rem 0.625rem 0.625rem"
        {...styles}
        type={passwordType}
        {...inputProps}
      />
      <SEye onClick={handleShowPassword}>
        <FontAwesomeIcon
          icon={isPasswordVisible ? faEye : faEyeSlash}
          color="var(--primary-color-grey)"
        />
      </SEye>
    </div>
  );
};
