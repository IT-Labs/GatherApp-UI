import styled from "styled-components";

type ContainerProps = {
  hasRoleChanged: boolean;
};

export const SRoleBody = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  column-gap: 1rem;

  @media (max-width: 64rem) {
    flex-direction: column;
    width: 100%;
  }
`;

export const SConfirmRoleChange = styled.div<ContainerProps>`
  visibility: ${({ hasRoleChanged }) =>
    hasRoleChanged ? "hidden" : "visible"};
  min-width: 5rem;

  @media (max-width: 64rem) {
    display: ${({ hasRoleChanged }) => (hasRoleChanged ? "none" : "block")};
    margin-top: 0.313rem;
  }
`;
