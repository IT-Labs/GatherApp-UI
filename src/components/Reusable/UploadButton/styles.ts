import styled from "styled-components";

type StyledType = {
  direction?: "row" | "column";
};

export const SUploadInput = styled.input`
  display: none;
`;

export const SContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SLabel = styled.label`
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  color: var(--primary-color-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  font-size: 1.25rem;

  @media screen and (max-width: 48.75rem) {
    padding: 0.625rem 0.313rem;
    font-size: 0.938rem;
  }
`;

export const SDiv = styled.div<StyledType>`
  display: flex;
  flex-direction: ${(props): any => props.direction};
  justify-content: center;
`;

export const SImage = styled.img`
  width: 100%;
  border-radius: 0.625rem;

  object-fit: cover;
  object-position: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  position: relative;
  gap: 1em;
`;

export const SResetIcon = styled.div`
  position: absolute;
  top: 50%;
  right: -10%;
  transform: translateY(-50%);
`;
