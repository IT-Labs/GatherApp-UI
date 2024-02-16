import { ButtonType } from "ts/enums/ButtonType";
import styled, { css } from "styled-components";
import type { ButtonProps } from "./Button";

export const SButton = styled.button<ButtonProps>`
  padding: 0.625rem 0.938rem;
  border-radius: var(--primary-border-radius);
  height: 2.5rem;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
  color: white;

  ${({ buttonType }) =>
    buttonType === ButtonType.SOLID
      ? css`
          ${{
            backgroundColor: "var(--primary-color-green)",
            border: 0,
          }}
        `
      : css`
          ${{
            backgroundColor: "transparent",
            color: "var(--primary-color-grey)",
            border: "0.063rem solid var(--primary-color-grey)",
          }}
        `}
  ${({ customStyles }) =>
    customStyles
      ? css`
          ${{
            ...customStyles,
          }}
        `
      : ""}
  ${({ customStyles }) =>
    customStyles?.hoverStyles
      ? css`
          &:hover:enabled {
            ${{
              ...customStyles?.hoverStyles,
            }}
          }
        `
      : ""}
       ${({ customStyles }) =>
    customStyles?.disabledStyles
      ? css`
          &:disabled {
            ${{
              ...customStyles?.disabledStyles,
            }}
          }
        `
      : css`
          &:disabled {
            background-color: var(--disabled-button-color);
            opacity: 0.55 !important;
            cursor: auto !important;
          }
        `}
`;
