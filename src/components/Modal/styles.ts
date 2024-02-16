import styled, { css } from "styled-components";
import { CSSProperties } from "react";

type CustomCSS = { customCss: CSSProperties };

export const SModal = styled.div<CustomCSS>`
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  background-color: gray;
  padding: 1rem 1rem;

  border-radius: 1.4rem;
  border: 0.7rem solid transparent;
  background: linear-gradient(
        var(--primary-color-grey),
        var(--primary-color-grey)
      )
      padding-box,
    linear-gradient(var(--primary-color-green), var(--primary-color-cyan))
      border-box;

  ${({ customCss }) =>
    customCss
      ? css`
          ${{ ...customCss }}
        `
      : ``}
`;
