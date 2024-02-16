import styled from "styled-components";
import DatePicker from "react-datepicker";

export const SCustomDatePicker = styled(DatePicker)`
  outline: none;
  text-align: center;
  box-shadow: 0 0 0.188rem var(--primary-color-grey);
  border: 0.063rem solid var(--primary-color-cyan);
  width: 100%;
  padding: 0.625rem;
  border-radius: var(--primary-border-radius);
  font-weight: bold;
  cursor: pointer;

  :focus {
    box-shadow: var(--input-box-shadow);
  }
`;
