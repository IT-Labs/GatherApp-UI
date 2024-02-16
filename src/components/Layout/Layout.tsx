// components
import NavBar from "components/NavBar/NavBar";

// styles
import { SContainerMain, SFooter, SContainer } from "./styles";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => {
  return (
    <SContainerMain>
      <NavBar />
      <SContainer>{children}</SContainer>
      <SFooter>© 2023 All rights reserved</SFooter>
    </SContainerMain>
  );
};

export default Layout;
