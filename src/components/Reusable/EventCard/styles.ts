import styled from "styled-components";

type Props = {
  isGridView: boolean;
};

export const SCard = styled.div<Props>`
  background-color: white;
  box-shadow: 0.188rem 0.188rem 0.5rem 0 rgba(0, 0, 0, 0.75);
  border-radius: 0.313rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: var(--secondary-font-color);
  transition: 0.4s;
  :hover {
    scale: 1.05;
  }

  & > a {
    display: flex;
    flex-direction: ${({ isGridView }) => (isGridView ? "column" : "row")};
    width: 100%;
  }
`;

export const BannerSection = styled.div<Props>`
  position: relative;
  margin: ${({ isGridView }) => (isGridView ? "" : "0.6rem")};
  flex-basis: ${({ isGridView }) => (isGridView ? "100%" : "25%")};

  @media screen and (max-width: 50rem) {
    display: none;
  }
`;

export const TextSection = styled.div`
  padding: 0.75rem 0.625rem;
  flex: 0 1 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: space-between;
`;

export const BannerImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: var(--secondary-border-radius);
`;

export const DateDiv = styled.div`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  padding: 0.5rem;
  text-align: center;
  background-color: white;
  box-shadow: 0.188rem 0.188rem 0.5rem 0 rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0.188rem 0.188rem 0.5rem 0 rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0.188rem 0.188rem 0.5rem 0 rgba(0, 0, 0, 0.75);
  border-radius: 0.313rem;
  text-transform: uppercase;
`;

export const SDateParagraph = styled.p`
  font-size: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SCardTitle = styled.h1`
  font-size: 1.125rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
`;

export const SDescription = styled.p`
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--secondary-color-grey);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 0.031rem;
`;

export const SCategoryTag = styled.div`
  background-color: #eeeeee;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const ActionsContainer = styled.div<Props>`
  display: flex;
  justify-content: ${({ isGridView }) =>
    isGridView ? "space-between" : "left"};
  ${({ isGridView }) => !isGridView && "column-gap: 1rem;"}
  align-items: bottom;
`;

export const SpanDate = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const CategoriesAndButtons = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: ${({ isGridView }) => (isGridView ? "0" : "0 1rem 0 0")};
`;
