import styled from "styled-components";

type ContainerProps = {
  width?: string;
};

export const SContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  min-width: ${({ width }) => width || "0"};
  column-gap: 0.625rem;
  font-size: 1rem;

  @media screen and (max-width: 65.625rem) {
    font-size: 0.8rem;
  }
`;
