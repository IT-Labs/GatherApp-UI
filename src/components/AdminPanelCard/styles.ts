import { LoadMore } from "components/Reusable/GeneralStyles/LoadMore";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import styled from "styled-components";

export const STableContainer = styled.div`
  overflow-x: auto;
  padding: 0.5rem 2rem;
`;

export const STable = styled.table`
  width: 100%;
  color: #292929;
  text-align: left;
  border-collapse: collapse;
`;

export const STableHeaderRow = styled.tr`
  border-bottom: 0.063rem solid #d9d9d9;

  @media (max-width: 48rem) {
    display: none;
  }
`;

export const STableRow = styled.tr<{ isLoadMoreButton?: boolean }>`
  border-bottom: 0.063rem solid #d9d9d9;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 48rem) {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    align-items: ${({ isLoadMoreButton }) =>
      isLoadMoreButton ? "center" : "flex-start"};
  }
`;

export const STableHeaderData = styled.th`
  text-align: left;
  font-size: 1.125rem;
  padding: 1rem 0;

  &:first-child {
    @media (max-width: 48rem) {
      display: block;
    }
  }
`;

export const STableData = styled.td<{ isLoadMoreButton?: boolean }>`
  text-align: left;
  padding: 0.5rem 0;
  max-width: 12.5rem;
  width: 12.5rem;
  word-wrap: break-word;

  &:first-child {
    text-align: center;
    max-width: 6.25rem;
    width: 25rem;

    @media (max-width: 48rem) {
      display: ${({ isLoadMoreButton }) =>
        isLoadMoreButton ? "block" : "none"};
    }
  }

  &:nth-child(3) {
    @media (min-width: 64rem) {
      max-width: 15.625rem;
      width: 15.625rem;
    }
  }
`;

export const STableFlex = styled.div`
  @media (max-width: 48rem) {
    display: flex;
    flex-direction: row;
  }
`;

export const STableFlexLabel = styled.div`
  font-weight: bold;
  display: none;

  @media (max-width: 48rem) {
    display: flex;
    flex: 0 0 5rem;
    max-width: 5rem;
  }
`;

export const STableFlexData = styled.div`
  max-width: 100%;
  padding-left: 0;

  @media (max-width: 48rem) {
    flex: 0 0 100%;
    max-width: 100%;
    padding-left: 0.625rem;
  }
`;

export const SUserProfilePicture: React.CSSProperties = {
  width: "3.125rem",
  height: "3.125rem",
  borderRadius: "50%",
};

export const SNotificationMessage = styled(NotificationMessage)`
  color: black;
`;

export const LoadMoreButtonStyles = {
  ...LoadMore,
  fontSize: "0.75rem",
  borderRadius: "0.313rem",
  padding: "0.5rem 1rem",
  marginTop: "0.625rem",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
};
