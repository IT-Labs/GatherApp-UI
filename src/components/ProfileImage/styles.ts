import styled from "styled-components";

type RemoveButton = {
  isRemoveButton: boolean;
};

export const SUploadInput = styled.input`
  display: none;
`;

export const SContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const SButtonsContainer = styled.div<RemoveButton>`
  display: flex;
  align-items: end;
`;

export const SContainer = styled.div`
  display: flex;
  margin-top: 0.2rem;
  justify-content: space-between;
`;

export const SLabel = styled.label``;

export const SImage = styled.img`
  width: 11.875rem;
  height: 11.875rem;
  border-radius: 50%;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.6);
  object-fit: cover;
`;
