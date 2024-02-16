import styled from "styled-components";

export const SEventDropDown = styled.div`
  padding: 0.5rem;
  position: relative;
`;

export const SDiv = styled.div`
  display: flex;
  background-color: var(--primary-color-green);
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 8rem;
  padding: 0.8em 0;
  border-radius: var(--primary-border-radius);
  background-color: var(--primary-color-green);
  box-shadow: rgba(0, 0, 0, 0.3) 0 1.188rem 2.375rem,
    rgba(0, 0, 0, 0.22) 0 0.938rem 0.75rem;

  &:before {
    position: absolute;
    content: "";
    top: -0.4rem;
    right: 6rem;
    width: 1em;
    height: 1em;
    transform: rotate(45deg);
    background-color: var(--primary-color-green);
  }

  @media screen and (max-width: 55.25rem) {
    right: 0;

    &:before {
      right: 1rem;
    }
  }
`;

export const SUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SLi = styled.li`
  & {
    display: flex;
    flex-direction: row;
    border-bottom: 0.125rem solid gray;
    font-size: 1.5em;
    color: white;
    cursor: pointer;
    transition: 0.2s all linear;
    align-items: center;
    padding: 0.2rem 0.4rem;
    gap: 0.313rem;
  }

  :hover {
    border-radius: var(--primary-border-radius);
    background-color: var(--secondary-color-grey);
  }
`;
