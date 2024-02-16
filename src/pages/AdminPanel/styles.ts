import styled from "styled-components";
import { LoadMore } from "components/Reusable/GeneralStyles/LoadMore";
import { MainContainer } from "components/Reusable/GeneralStyles/MainContainer";

export const SMainContainer = styled(MainContainer)`
  background-color: white;
  border-radius: 1.25rem;
  flex-direction: column;

  @media only screen and (min-width: 1200px) {
    max-width: 70vw;
  }
`;

export const SAdminCardHeader = styled.div`
  background-color: #99bb58;
  padding: 2rem 2rem 0;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  width: 100%;
  display: flex;
  column-gap: 1rem;

  @media (max-width: 50rem) {
    flex-direction: column;
    padding-bottom: 2rem;
  }
`;

export const SFirstChild = styled.div`
  flex: 0 0 45%;
`;

export const SSecondChild = styled.div`
  flex: 0 0 30%;
`;

export const STable = styled.table`
  width: 100%;
  color: #292929;
  text-align: left;
`;

export const STableHeaderRow = styled.tr`
  border-bottom: 0.063rem solid #d9d9d9;
`;

export const STableRow = styled.tr`
  border-bottom: 0.063rem solid #d9d9d9;

  &:last-child {
    border-bottom: none;
  }
`;

export const STableHeaderData = styled.th`
  text-align: left;
  font-size: 1.125rem;
  padding: 1rem 0;
`;

export const STableData = styled.td`
  text-align: left;
  padding: 0.5rem 0;

  &:first-child {
    text-align: center;
  }
`;

export const SUserProfilePicture: React.CSSProperties = {
  width: "3.125rem",
  height: "3.125rem",
  borderRadius: "50%",
};

export const LoadMoreButtonStyles = {
  ...LoadMore,
  fontSize: "0.75rem",
  borderRadius: "0.313rem",
  padding: "0.5rem 1rem",
  backgroundColor: "var(--primary-color-grey)",
  marginTop: "0.625rem",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
};
