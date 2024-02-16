import styled from "styled-components";

type IconContainerProps = {
  toggle?: boolean;
};

export const SLogoContainer = styled.div`
  height: 5rem;
  width: 12.5rem;
  margin-right: auto;
`;

export const SUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.25rem;

  @media (max-width: 62rem) {
    width: 100%;
    gap: 0;
    justify-content: space-evenly;
    font-size: 1rem;
  }

  @media (max-width: 35rem) {
    font-size: 0.8rem;
  }
`;

export const SLi = styled.li<IconContainerProps>`
  min-width: 9rem;
  text-align: center;
  position: relative;
  padding: 1.25rem 0.5rem;
  color: white;
  display: block;

  border-radius: ${({ toggle }) =>
    toggle ? "0.625rem 0.625rem 0 0" : "var(--primary-border-radius)"};

  transition: 0.2s background-color linear;

  background-color: ${({ toggle }) =>
    toggle ? "var(--primary-color-green)" : ""};

  :hover {
    background-color: var(--primary-color-green);
    cursor: pointer;
  }

  @media (max-width: 75rem) {
    padding: 0.5rem;
  }

  @media (max-width: 48rem) {
    min-width: auto;
  }
`;

export const SIconContainer = styled.div<IconContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;

  pointer-events: ${({ toggle }) => (toggle ? "none" : "all")};
`;
