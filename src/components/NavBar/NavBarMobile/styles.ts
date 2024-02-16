import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";
import styled from "styled-components";

type ActivePageProps = {
  isActive?: boolean;
};

export const SMainContainer = styled(MainContainer)`
  flex-direction: column;
  margin: 0;
  width: 100%;
  justify-content: start;
  align-items: center;
  z-index: 100;
`;

export const SLogoAndHamburger = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const SLogoContainer = styled.div`
  max-width: 12rem;
  margin-right: auto;
  padding: 0.3rem 0 0 1rem;
`;

export const SHamburgerContainer = styled.div`
  padding: 2rem 1rem 2rem 2rem;
`;

export const SUl = styled.ul`
  position: fixed;
  top: 7rem;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 2rem;

  background-color: var(--secondary-color-grey);

  overflow-y: scroll;
  z-index: 3900;
`;

export const SLi = styled.li<ActivePageProps>`
  ${({ isActive }) =>
    isActive
      ? "background-color: var(--primary-color-green); border-radius: var(--primary-border-radius)"
      : ""};

  & > a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2rem;
    text-align: center;
    font-size: 2rem;

    @media screen and (max-width: 60rem) {
      padding: 4dvw;
      font-size: 6dvw;
    }
  }
`;
