// hooks/methods
import { useState } from "react";

export type CheckboxInputReturnType = {
  checked: boolean;
  label: string;
  value: string;
  hasChanged: boolean;
  reset: () => void;
  isValid: boolean;
  onChange: () => void;
};

const IS_VALID = true;

type ValueMap = {
  true: string;
  false: string;
};

type Props = {
  initialChecked: boolean;
  label?: string;
  valueMap?: ValueMap;
  onChange?: (prevChecked: boolean, value: string) => void;
};

const useCheckbox = ({
  initialChecked = true,
  label = "",
  valueMap,
  onChange,
}: Props): CheckboxInputReturnType => {
  const [checked, setChecked] = useState(initialChecked);
  const value = valueMap ? valueMap[`${checked}`] : "";
  const mappedLabel = `${label}: ${value}`;

  const hasChanged = checked !== initialChecked;

  const reset = () => {
    setChecked(initialChecked);
  };
  const handleChange = () => {
    setChecked((prevChecked) => {
      if (onChange !== undefined)
        onChange(!prevChecked, valueMap ? valueMap[`${!prevChecked}`] : "");
      return !prevChecked;
    });
  };

  return {
    checked,
    value,
    label: mappedLabel,
    hasChanged,
    reset,
    isValid: IS_VALID,
    onChange: handleChange,
  };
};

export default useCheckbox;
