import { LoadMore } from "components/Reusable/GeneralStyles/LoadMore";
import styled from "styled-components";

export type StyledProps = {
  isMobileView: boolean;
  isToggledOn: boolean;
};

const SFilterContainer = styled.div<StyledProps>`
  display: ${({ isMobileView, isToggledOn }) =>
    isMobileView && !isToggledOn ? "none" : "block"};
  align-items: center;

  @media screen and (min-width: 62.5rem) {
    margin-top: 3.2rem;
  }

  @media screen and (max-width: 48rem) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2rem 2rem;
    background-color: var(--secondary-color-grey);
    overflow: scroll;
    z-index: 5000;
  }
`;

const SXIconContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  padding-bottom: 1rem;
`;

const LoadMoreButtonStyles = {
  ...LoadMore,
  display: "block",
  margin: "0 auto",
};

export { SFilterContainer, LoadMoreButtonStyles, SXIconContainer };
