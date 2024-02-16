import { ReactDatePickerProps } from "react-datepicker";
import { InputStyleProps } from "./styles";

type BaseInputProps = {
  type: Exclude<string, "date">;
  id: string;
  name: string;
  required: boolean;
  placeholder?: string;
} & JSX.IntrinsicElements["input"];

export type DateInputProps = {
  type: "date";
  id: string;
  name: string;
  required: boolean;
  placeholder?: string;
} & ReactDatePickerProps;

// Creating a Discriminated Union to handle different props being sent down depending on the input type.

export type IntrinsicInputProps = BaseInputProps | DateInputProps;

export type OptionalInputProps = {
  label?: string;
  styles?: InputStyleProps;
  maxLen?: number;
  isTextarea?: boolean;
};
