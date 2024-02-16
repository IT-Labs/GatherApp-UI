import styled from "styled-components";

export const SContainer = styled.div`
  position: fixed;
  bottom: 3.75rem;
  right: 6.25rem;
  z-index: 9999;
  transition: all 0.3s ease;
  border-radius: var(--primary-border-radius);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.9);
    box-shadow: none;
  }

  @media screen and (max-width: 48.75rem) {
    position: fixed;
    bottom: 3.125rem;
    right: 0.625rem;
  }
`;

export const Icon = {
  color: "var(--primary-color-green)",
  padding: "0.313rem 0.625rem",
  borderRadius: "var(--primary-border-radius)",
  backgroundColor: "var(--secondary-color-grey)",
  cursor: "pointer",
  border: "0.125rem solid var(--primary-color-green)",
} as React.StyleHTMLAttributes<string>;
