import styled, { css } from "styled-components";

type ImageProps = {
  customStyles?: React.CSSProperties | {};
};

export const SProfilePicture = styled.img<ImageProps>`
  justify-self: center;

  ${({ customStyles }) =>
    customStyles
      ? css`
          ${{
            ...customStyles,
          }}
        `
      : ""}
`;
