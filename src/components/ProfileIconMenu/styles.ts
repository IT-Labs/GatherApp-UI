import styled from "styled-components";

export const SMenu = styled.div`
  width: 10.625rem;
  display: flex;
  background-color: var(--primary-color-green);
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 3rem;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1.188rem 2.375rem,
    rgba(0, 0, 0, 0.22) 0 0.938rem 0.75rem;
  padding: 0.625rem;
  border-radius: 0.625rem 0 0.625rem 0.625rem;
  z-index: 100;
`;

export const SDiv = styled.div`
  width: 100%;
  background-color: var(--primary-color-green);
  border: 0;
  border-bottom: 0.125rem solid gray;
  text-align: center;
  transition: 0.2s all linear;

  :hover {
    border-radius: var(--primary-border-radius);
    background-color: var(--secondary-color-grey);
  }
  & > a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 1.25rem 0.5rem;
  }
`;
