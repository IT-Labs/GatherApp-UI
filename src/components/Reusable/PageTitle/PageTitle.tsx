import React from "react";
import { STitle } from "./styles";

type Props = {
  children: React.ReactNode;
};

const PageTitle = ({ children }: Props) => {
  return <STitle>{children}</STitle>;
};

export default PageTitle;
