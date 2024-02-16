import styled from "styled-components";

export const SContainerMain = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SContainer = styled.div`
  min-height: 80dvh;
  margin: 0 0 1.25rem 0;

  @media screen and (max-width: 48.25rem) {
    padding-top: 7.75rem;
  }
`;

export const SFooter = styled.footer`
  width: 98%;
  text-align: left;
  padding: 1rem;
  border-top: 0.125rem solid white;
  margin: auto;
  transition: all 0.5s;
`;
