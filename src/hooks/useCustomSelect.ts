// hooks/methods
import { useState } from "react";

// libraries
import { ActionMeta, GroupBase, Props } from "react-select";
import { splitCamelCase } from "utils/helpers";

export type CustomSelectProps = {
  reset: () => void;
  getSelectValue: () => any;
  getSelectLabel: () => any;
  errorMessage: string;
  isValid: boolean;
  hasChanged: boolean;
};

export type CustomSelectHookReturnType<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  props: Props<Option, IsMulti, Group>;
} & CustomSelectProps;

export type OptionType = {
  label: string;
  value: string;
  [key: string]: any;
};
export const mapToOptions = (
  options: (string | OptionType)[]
): OptionType[] => {
  return options.map((option) => {
    if (typeof option === "string") {
      return { label: splitCamelCase(option), value: option };
    }
    return option;
  });
};

export const useCustomSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: Props<Option, IsMulti, Group>
): CustomSelectHookReturnType<Option, IsMulti, Group> => {
  const { defaultValue = null, required, isMulti } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<
    Option | null | readonly Option[]
  >(defaultValue);
  const [error, setError] = useState<string>("");

  const hasError = required && !selectedValue;
  const hasChanged = selectedValue !== defaultValue;

  const handleChange = (
    newValue: Option | null | readonly Option[],
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectedValue(newValue);
    if (!newValue) return;
    setError("");
  };

  const handleInputValueChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleBlur = () => {
    if (!selectedValue && required) {
      setError("This field is required");
    }
  };
  const getSelectValue = (): any => {
    if (Array.isArray(selectedValue)) {
      // @ts-ignore
      return selectedValue.map((value: Option) => value.value);
    }
    if (!selectedValue) {
      if (isMulti) return [];
      return "";
    }
    // @ts-ignore
    return selectedValue.value as string;
  };

  const getSelectLabel = (): any => {
    if (Array.isArray(selectedValue)) {
      // @ts-ignore
      return selectedValue.map((value: Option) => value.label);
    }
    if (!selectedValue) {
      if (isMulti) return [];
      return "";
    }
    // @ts-ignore
    return selectedValue.label as string;
  };
  const reset = () => {
    setSelectedValue(defaultValue);
    setError("");
  };

  return {
    props: {
      ...props,
      value: selectedValue,
      inputValue,
      onChange: handleChange,
      onInputChange: handleInputValueChange,
      onBlur: handleBlur,
    },
    reset,
    getSelectValue,
    getSelectLabel,
    errorMessage: error,
    isValid: !hasError,
    hasChanged,
  };
};
