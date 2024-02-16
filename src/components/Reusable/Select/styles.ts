import styled from "styled-components";
import Select from "react-select";

export const SCustomSelect = styled<any>(Select)`
  outline: none;
  padding: 0.625rem;
  min-height: 3.125rem;
  color: var(--secondary-font-color);
  margin: auto;
  & * {
    cursor: pointer;
  }
`;

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
