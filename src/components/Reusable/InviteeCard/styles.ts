import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

type Props = {
  isViewInvitee?: boolean;
};

export const SContainer = styled.div<Props>`
  ${({ isViewInvitee }) =>
    isViewInvitee
      ? css`
          display: flex;
          align-items: start;
          width: 100%;
          text-align: start;
          font-size: 1.3rem;
          border-bottom: 0.05rem solid white;
          padding: 0.5rem 1rem;

          @media screen and (max-width: 48.75rem) {
            flex-direction: column;
            row-gap: 0.3rem;
            align-items: center;
          }
        `
      : css`
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: start;
          position: relative;
          gap: 1em;
        `}
`;

export const SImg = styled.img<Props>`
  ${({ isViewInvitee }) =>
    isViewInvitee
      ? css`
          width: 3.3rem;
          height: 3.3rem;
        `
      : css`
          width: 2.2rem;
          height: 2.2rem;
          margin-right: 0.9rem;
        `}

  border-radius: 50%;

  @media screen and (max-width: 48.75rem) {
    height: "2rem";
    width: "2rem";
  }
`;

export const SFontAwesomeIcon = styled(FontAwesomeIcon)<Props>`
  ${({ isViewInvitee }) =>
    isViewInvitee
      ? css`
          font-size: 3.3rem;
        `
      : css`
          font-size: 2.2rem;
          margin-right: 0.9rem;
        `}
`;

export const SName = styled.p`
  font-size: 1rem;
`;

export const SEmail = styled.p`
  font-size: 0.8rem;
`;

export const SText = styled.div<Props>`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
  margin-left: ${({ isViewInvitee }) => (isViewInvitee ? "1rem" : "0")};

  @media screen and (max-width: 48.75rem) {
    text-align: ${({ isViewInvitee }) => (isViewInvitee ? "center" : "")};
    margin-left: 0;
  }
`;
