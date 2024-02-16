import styled from "styled-components";
import { ButtonContainer } from "components/Reusable/GeneralStyles/ButtonContainer";

type Props = {
  isRequestDecline?: boolean;
};

export const SModalContainer = styled.div`
  width: 25rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SButtonContainer = styled(ButtonContainer)<Props>`
  margin-top: ${({ isRequestDecline }) => (isRequestDecline ? "0" : "3rem")};
  align-items: center;
  column-gap: 1.25rem;

  @media screen and (max-width: 48.75rem) {
    row-gap: 1rem;
  }
`;

export const DeclineModal = {
  backgroundColor: "var(--primary-color-red)",
};
