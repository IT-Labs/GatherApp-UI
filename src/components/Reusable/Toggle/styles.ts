import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-direction: row;

  @media screen and (max-width: 68.75rem) {
    flex-direction: column;
  }

  @media screen and (max-width: 48.125rem) {
    flex-direction: row;
  }
`;

export const SContainer = styled.div`
  margin: 0 0;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const SSpan = styled.span`
  width: 50%;

  @media screen and (max-width: 68.75rem) {
    width: 100%;
  }

  @media screen and (max-width: 48.125rem) {
    width: 50%;
  }
`;

export const Switch = styled.div`
  position: relative;
  width: 3.75rem;
  height: 2.25rem;
  background: ${(props) =>
    props.color ? props.color : "var(--primary-color-cyan)"};
  border-radius: 2rem;
  padding: 0.25rem;
  cursor: pointer;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 2.188rem;
    top: 50%;
    left: 0.25rem;
    background: white;
    transform: translate(0, -50%);
  }
`;

export const Input = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
  display: none;

  &:checked + ${Switch} {
    background: ${(props) =>
      props.color ? props.color : "var(--primary-color-green)"};

    &:before {
      transform: translate(1.438rem, -50%);
    }
  }
`;
