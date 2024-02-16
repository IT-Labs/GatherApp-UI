import styled from "styled-components";
import Button from "components/Reusable/Button/Button";

export const SModal = styled.div`
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  background-color: gray;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;

  border-radius: 1.4rem;
  border: 0.7rem solid transparent;
  background: linear-gradient(
        var(--primary-color-grey),
        var(--primary-color-grey)
      )
      padding-box,
    linear-gradient(var(--primary-color-green), var(--primary-color-cyan))
      border-box;

  @media (max-width: 48rem) {
    width: 80dvw;
  }

  @media (max-width: 48rem) {
    width: 90dvw;
  }
`;

export const ConfirmButtonStyles = {
  width: "5rem",
};
