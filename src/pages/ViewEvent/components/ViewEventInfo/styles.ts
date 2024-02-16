import styled from "styled-components";

export const SCardContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: space-around;

  @media screen and (max-width: 25rem) {
    flex-direction: column;
    align-items: start;
  }
`;
