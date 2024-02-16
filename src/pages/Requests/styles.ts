import styled from "styled-components";
import Button from "components/Reusable/Button/Button";
import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";
import { ButtonContainer } from "components/Reusable/GeneralStyles/ButtonContainer";

type SelectedOptiоn = {
  isSelected: boolean;
};

export const SMainContainer = styled(MainContainer)`
  max-width: 50dvw;
  flex-direction: column;

  @media screen and (max-width: 55rem) {
    max-width: 80dvw;
  }
`;

export const SButtonContainer = styled(ButtonContainer)`
  column-gap: 3rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 48.75rem) {
    row-gap: 1rem;
  }
`;

export const SButton = styled(Button)<SelectedOptiоn>`
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--primary-color-green)" : ""};
  color: white;

  :hover {
    background-color: var(--primary-color-green);
    opacity: ${({ isSelected }) => (isSelected ? "1" : "0.5")};
  }
`;

export const styledIcon = {
  position: "fixed",
  right: 0,
  bottom: "4rem",
  float: "right",
  marginTop: "2rem",
  marginLeft: "auto",
  marginRight: "4rem",
  color: "var(--secondary-color-grey)",
  backgroundColor: "var(--primary-color-green)",
  padding: "0.1em 0.8rem",
  borderRadius: "var(--primary-border-radius)",
  cursor: "pointer",
} as React.StyleHTMLAttributes<string>;
