import Button from "components/Reusable/Button/Button";
import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";
import styled from "styled-components";

type SelectedOptiоn = {
  isSelected: boolean;
};

export const SMainContainer = styled(MainContainer)`
  gap: 3rem;

  @media only screen and (max-width: 1500px) {
    max-width: 70dvw;
  }

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LeftContainer = styled.div`
  flex: 0 2 30%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 6rem;
  align-items: center;
  @media screen and (max-width: 48.75rem) {
    padding: 1rem 0;
  }
`;

export const SButton = styled(Button)<SelectedOptiоn>`
  border-radius: ${({ isSelected }) =>
    isSelected ? "0.938rem 0.938rem 0 0" : "var(--primary-border-radius)"};
  min-width: 20rem;
  margin-top: 1rem;
  @media screen and (max-width: 48.75rem) {
    min-width: 100%;
  }
`;

export const SInfoContainer = styled.div`
  border: 0.063rem solid var(--primary-color-green);
  border-radius: 0 0 0.938rem 0.938rem;
  padding: 0.8rem;
  width: 100%;
`;

export const SLocationButtonStyles = {
  width: "fit-content",
  padding: "0.5rem 1 rem",
  backgroundColor: "var(--primary-color-green)",
  borderRadius: "var(--primary-border-radius)",
};
