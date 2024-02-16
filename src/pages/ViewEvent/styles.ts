import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";
import styled, { css } from "styled-components";

type Props = {
  isLeftContainer?: boolean;
};

export const SMainContainer = styled(MainContainer)`
  flex-direction: row;
  align-items: start;
  justify-content: start;
  transition: all 0.5s;
  column-gap: 5rem;

  img {
    row-gap: 3rem;
    max-height: 20rem;
    aspect-ratio: 1 / 1;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: var(--secondary-border-radius);
  }

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
    align-items: center;
    row-gap: 3rem;
  }
`;

export const SContainer = styled.div<Props>`
  display: flex;
  position: relative;
  align-items: start;
  width: 100%;
  height: 100%;
  flex-basis: 50%;
  flex: 1 0;

  ${({ isLeftContainer }) =>
    isLeftContainer
      ? css`
          ${{
            flexDirection: "column",
            justifyContent: "start",
            rowGap: "3rem",
          }}
        `
      : css`
          ${{
            flexDirection: "column",
            justifyContent: "space-between",
            rowGap: "1rem",
          }}
        `}

  @media screen and (max-width: 67.5rem) {
    row-gap: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start; */
  }
`;
