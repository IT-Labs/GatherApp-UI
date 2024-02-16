import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100dvh;
  text-align: center;
`;

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  min-height: 31.25rem;
  padding: 3.125rem 2rem;
  margin: 0 2rem;
  border-radius: var(--primary-border-radius);
  background-color: var(--secondary-color-grey);
  background-image: url("/images/small-bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1.188rem 2.375rem,
    rgba(0, 0, 0, 0.22) 0 0.938rem 0.75rem;
`;

export const SLogo = styled.img`
  width: 50%;
  padding-bottom: 1rem;
`;

export const FormButtonStyle = {
  marginBottom: "1.25rem",
  width: "8rem",
};
