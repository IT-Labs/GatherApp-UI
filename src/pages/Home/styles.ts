import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";
import styled from "styled-components";

type ContainerProps = {
  isGridView: boolean;
};

export const SEventsContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: start;
  ${({ isGridView }) => (isGridView ? "" : "align-items: left;")}
  flex-direction: ${({ isGridView }) => (isGridView ? "row" : "column")};
  flex-wrap: ${({ isGridView }) => (isGridView ? "wrap" : "nowrap")};
  ${({ isGridView }) => (isGridView ? "gap: 0.938rem;" : "")}
  width: 100%;
  margin: 0 auto;
  padding: ${({ isGridView }) => (isGridView ? "0 0" : "0 3.125rem 0 0")};
  border-radius: 0.313rem;
  color: var(--secondary-font-color);

  @media screen and (max-width: 59.375rem) {
    gap: 0.313rem;
  }

  @media screen and (max-width: 48.75rem) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SMainContainer = styled(MainContainer)`
  gap: 2rem;
  justify-content: center;
  align-items: start;

  @media screen and (max-width: 48.75rem) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const SContainer = styled.div`
  width: 100%;
  max-width: 50rem;
`;

export const SelectViewContainer = styled.div`
  display: inline-block;
  margin-bottom: -0.915rem;

  @media screen and (max-width: 62.5rem) {
    display: none;
  }
`;

export const SFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 62.5rem) {
    margin-top: 3.2rem;
  }

  @media screen and (max-width: 48.75rem) {
    width: 100%;
    padding-top: 0;
  }
`;

export const SLabel = styled.label`
  height: 1.25rem;
  padding: 0.313rem;
  align-self: center;
  color: white;
`;

export const SLabelDiv = styled.label`
  align-self: center;
`;
