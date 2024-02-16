import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// components
import ModalContextWrapper from "utils/ModalContextWrapper";
import { mockReduxStore } from "./mockReduxStore";

type Props = {
  children: React.ReactNode;
};
const MockProviders = ({ children }: Props) => {
  return (
    <Provider store={mockReduxStore}>
      <BrowserRouter>
        <ModalContextWrapper>{children}</ModalContextWrapper>
      </BrowserRouter>
    </Provider>
  );
};

export default MockProviders;
