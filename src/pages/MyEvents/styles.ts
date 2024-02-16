import styled from "styled-components";
import { LoadMore } from "components/Reusable/GeneralStyles/LoadMore";
import Button from "components/Reusable/Button/Button";
import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";

type SelectedOption = {
  isSelected?: boolean;
  isMobileView?: boolean;
};

type IsAdmin = {
  isAdmin: boolean;
};

export const SMainContainer = styled(MainContainer)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s all;
`;

export const SLeftContainer = styled.div<IsAdmin>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: ${({ isAdmin }) => (isAdmin ? "100%" : "60%")};
  ${({ isAdmin }) => isAdmin && "max-width: 50rem;"}

  @media screen and (max-width: 60rem) {
    width: 100%;
  }
`;

export const SRightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  transition: 0.3s linear all;
  @media screen and (max-width: 55rem) {
    display: contents;
  }
`;

export const SLRContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  column-gap: 2rem;

  @media screen and (max-width: 55rem) {
    flex-direction: column-reverse;
  }
`;

export const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
`;

export const STabContainer = styled.div<IsAdmin>`
  display: flex;
  column-gap: ${({ isAdmin }) => (isAdmin ? "3rem" : "2rem")};

  @media screen and (max-width: 55rem) {
    flex-direction: column;
  }
`;

export const SButton = styled(Button)<SelectedOption>`
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--primary-color-green)" : ""};
  width: 100%;
  color: white;
  margin-bottom: 1rem;
  :hover {
    background-color: var(--primary-color-green);
    opacity: ${({ isSelected }) => (isSelected ? "1" : "0.5")};
  }
`;

export const MobileTabStyles = {
  display: "none",
  alignItems: "center",
  justifyContent: "center",

  "@media screen and (max-width: 55rem)": {
    display: "flex",
  },
};

export const LoadMoreButtonStyles = {
  ...LoadMore,
  width: "8rem",
};
