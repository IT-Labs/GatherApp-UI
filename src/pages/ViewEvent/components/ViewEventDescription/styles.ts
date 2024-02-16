import styled from "styled-components";

export const SCornerBorder = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  position: relative;
  border: solid 0.3rem var(--primary-color-green);
  border-radius: var(--primary-border-radius);
  height: 18rem;
  text-align: justify;
  white-space: pre-line;
  overflow: auto;
  width: 100%;
  ul {
    list-style: disc;
    list-style-position: inside;
  }

  ol {
    list-style: decimal;
  }
`;
