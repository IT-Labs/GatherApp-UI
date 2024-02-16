import styled from "styled-components";

const SNav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--secondary-color-grey);
  padding: 0.625rem;
  font-size: 1.25rem;

  transition: all 0.5s;

  @media (max-width: 48.25rem) {
    position: fixed;
    margin: 0;

    z-index: 2220;
  }
`;

export { SNav };
