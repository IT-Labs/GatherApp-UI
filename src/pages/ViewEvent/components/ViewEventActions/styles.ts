import { ButtonContainer } from "components/Reusable/GeneralStyles/ButtonContainer";
import styled from "styled-components";

export const SInvitesButton = styled.div`
  position: relative;
  transition: all 0.5s;

  :hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

export const SCounter = styled.p`
  color: var(--primary-font-color);
  font-size: 2rem;
  position: absolute;
  bottom: -0.625rem;
  right: -0.625rem;
`;

export const SButtonContainer = styled(ButtonContainer)`
  column-gap: 1rem;
  align-items: center;

  @media screen and (max-width: 48.75rem) {
    row-gap: 0.7rem;
    justify-content: center;
    align-items: center;

    button {
      font-size: 0.8rem;
    }
  }
`;
