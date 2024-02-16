import { ButtonContainer } from "components/Reusable/GeneralStyles/ButtonContainer";
import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";
import styled from "styled-components";

type CancelModalContainerProps = {
  isActive: boolean;
};

export const SMainContainer = styled(MainContainer)`
  column-gap: 3.125rem;
  align-items: start;
  justify-content: center;

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
    align-items: normal;
  }
`;

export const SButtonContainer = styled(ButtonContainer)`
  column-gap: 1.25rem;

  @media screen and (max-width: 48.75rem) {
    button {
      margin: 0.313rem;
    }
  }
`;

export const SToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  column-gap: 5.625rem;
  margin: 1.8rem 0 2rem 0;
  width: 100%;

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
    row-gap: 1.875rem;
    align-items: center;
  }
`;

export const SSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1.25rem;
  margin-top: 0.938rem;
  width: 100%;
  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
  }
`;

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  justify-content: center;
  align-items: center;
  flex: 1 0;
  margin: 0.313rem auto;
  width: "100%";
  text-align: center;

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
    margin: 0;
    align-items: normal;
  }
`;

export const ModalContainer = styled.div<CancelModalContainerProps>`
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

export const Modal = styled.div`
  background: white;
  width: 21.875rem;
  height: 9.375rem;
  z-index: 1001;
  border-radius: 0.625rem;
  padding: 1.25rem;
  @media screen and (max-width: 48.75rem) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const ModalTitle = styled.h2`
  color: var(--secondary-font-color);
  font-size: 1.25rem;
  @media screen and (max-width: 48.75rem) {
    padding: 1rem;
  }
`;

export const ModalButtonStyles = {
  color: "var(--primary-font-color)",
  backgroundColor: "var(--primary-color-green)",
  minWidth: "7rem",
  marginTop: "1rem",
};
