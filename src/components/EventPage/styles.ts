import { LoadMore } from "components/Reusable/GeneralStyles/LoadMore";
import styled from "styled-components";

type ContainerProps = {
  isGridView: boolean;
};

export const EventContainer = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 100%;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  padding: ${({ isGridView }) =>
    isGridView ? "0 0 1rem 0" : "0 3.125rem 1rem 0"};
  border-radius: 0.313rem;
  color: var(--secondary-font-color);

  ${({ isGridView }) =>
    isGridView &&
    `
    @media (min-width: 48rem) {
      grid-template-columns: repeat(2, 1fr); /* Two columns on tablet */
    }

    @media (min-width: 62rem) {
      grid-template-columns: repeat(3, 1fr); /* Three columns on laptop */
    }
  `}
`;

export const ButtonsContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${({ isGridView }) => (isGridView ? "center" : "right")};
  gap: 0.375rem;
`;

export const LoadMoreButtonStyles = {
  ...LoadMore,
  width: "8rem",
};

export const SContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
