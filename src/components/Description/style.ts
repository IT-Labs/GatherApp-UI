import ReactQuill from "react-quill";
import styled from "styled-components";

type DescProps = {
  isFocused: boolean;
};

export const SDescription = styled(ReactQuill)<DescProps>`
  border: 0.063rem solid var(--primary-color-cyan);
  border-radius: 0.68rem;

  box-shadow: ${({ isFocused }) =>
    isFocused ? "var(--input-box-shadow)" : "none"};

  .ql-container.ql-snow {
    border: none;
    background-color: white;
    border-radius: 0 0 0.625rem 0.625rem;
    height: 18.75rem;
    width: 100%;
    color: black;
    padding-bottom: 2.25rem;
  }

  .ql-toolbar.ql-snow {
    border: none;
    background-color: white;
    border-radius: 0.625rem 0.625rem 0 0;
  }

  @media screen and (max-width: 48.75rem) {
    .ql-container.ql-snow {
      border: none;
      background-color: white;
      border-radius: 0 0 0.625rem 0.625rem;
      height: 12.5rem;
      width: 100%;
      color: black;
    }

    .ql-toolbar.ql-snow {
      border: none;
      background-color: white;
      border-radius: 0.625rem 0.625rem 0 0;
      height: 6.25rem;
    }
  }
`;
