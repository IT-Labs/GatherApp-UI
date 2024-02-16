import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
  }
`;
