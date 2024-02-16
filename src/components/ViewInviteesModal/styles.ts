import Button from "components/Reusable/Button/Button";
import { ButtonContainer } from "components/Reusable/GeneralStyles/ButtonContainer";
import styled from "styled-components";

type Props = {
  isActive?: boolean;
};

export const SModal = styled.div`
  width: 30dvw;
  height: 70dvh;

  @media screen and (max-width: 48.75rem) {
    overflow-y: scroll;
  }
`;

export const SButtonContainer = styled(ButtonContainer)`
  border-bottom: 0.063rem solid white;
  padding-bottom: 0.5rem;
  @media screen and (max-width: 48.75rem) {
    border-bottom: 0;
  }
`;

export const SButton = styled(Button)<Props>`
  font-size: 1rem;
  background-color: transparent;
  padding: 0;
  margin-right: 0.5rem;
  border-radius: 0;
  border-right: 0.063rem solid white;
  color: ${({ isActive }) =>
    isActive ? "var(--primary-color-green)" : "white"};

  @media screen and (max-width: 48.75rem) {
    font-size: 0.8rem;
    border-right: 0;
    border-bottom: 0.063rem solid white;
  }
`;

export const InviteeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  text-align: center;
`;
