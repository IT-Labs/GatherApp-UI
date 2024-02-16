import styled from "styled-components";

export type InputStyleProps = {
  width?: string;
  height?: string;
  borderRadius?: string;
  padding?: string;
};

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SInput = styled.input<any>`
  outline: none;
  box-shadow: 0 0 0.188rem var(--primary-color-grey);
  border: 0.063rem solid var(--primary-color-cyan);
  padding: ${({ padding }) => padding || "0.625rem"};
  border-radius: ${({ borderRadius }) =>
    borderRadius || "var(--primary-border-radius)"};
  align-items: baseline;
  overflow: auto;
  font-size: 0.85em;
  height: 0.85em;

  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};

  place-items: center;

  ::placeholder {
    vertical-align: middle;
    color: gray;
  }

  ::-ms-reveal,
  ::-ms-clear {
    display: none;
  }

  ::-webkit-calendar-picker-indicator {
    width: 1.3rem;
    height: 1.3rem;
    filter: invert(69%) sepia(63%) saturate(318%) hue-rotate(39deg)
      brightness(89%) contrast(90%);
    cursor: pointer;
  }

  :focus {
    box-shadow: var(--input-box-shadow);
  }

  @media screen and (max-width: 48.75rem) {
    padding: 0.625rem 4.5rem 0.625rem 0.625rem;
  }
`;

export const SEye = styled.div`
  position: absolute;
  padding-right: 0.625rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    padding-left: 0.5rem;
    border-left: 0.063rem solid var(--primary-color-grey);
  }
  & > svg:hover {
    cursor: pointer;
  }
`;

export const SCounter = styled.div`
  position: absolute;
  top: auto;
  left: auto;
  right: 0;
  bottom: 0;

  background: var(--primary-color-green);
  display: grid;
  place-items: center;
  border-radius: var(--primary-border-radius);
  padding: 0.6rem;
`;
