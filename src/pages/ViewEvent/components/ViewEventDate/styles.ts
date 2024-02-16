import styled from "styled-components";

export const SDateTimeContainer = styled.div`
  background-color: var(--primary-color-green);
  border-radius: var(--primary-border-radius);
  position: absolute;
  bottom: -9%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  width: 18.75rem;
  padding: 1rem;
  color: var(--primary-font-color);
  font-weight: 600;

  @media screen and (max-width: 32.5rem) {
    width: 12.5rem;
    font-size: 0.8rem;

    bottom: -13%;
  }

  @media screen and (max-width: 25rem) {
    width: 9.375rem;
    font-size: 0.6rem;

    bottom: -13%;
  }
`;
