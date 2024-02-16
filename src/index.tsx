// hooks/methods
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "store/store";
import { gatherAppApi } from "services/api/gatherapp";

// libraries
import { Provider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

// components
import App from "App";

import { msalInstance } from "./utils/msalInstance"; // must be after App

// styles
import "index.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <ApiProvider api={gatherAppApi}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApiProvider>
    </MsalProvider>
  </React.StrictMode>
);
