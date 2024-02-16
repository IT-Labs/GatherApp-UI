// libraries
import {
  EventMessage,
  EventType,
  PublicClientApplication,
  LogLevel,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

// types and constants

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_AUTHORITY,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      LogLevel: LogLevel.Error,
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event: EventMessage) => {
  if (
    event.eventType ===
    (EventType.LOGIN_SUCCESS || EventType.SSO_SILENT_SUCCESS)
  ) {
    // @ts-ignore
    msalInstance.setActiveAccount(event.payload!.account);
  }
});

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphEventsEndpoint: "https://graph.microsoft.com/v1.0/me/events",
};
// eslint-disable-next-line consistent-return
export const loginMsalSSO = async () => {
  try {
    const response = await msalInstance.loginPopup(loginRequest);

    msalInstance.setActiveAccount(response.account);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// eslint-disable-next-line consistent-return
export const getAccessToken = async (scopes: string[]) => {
  let currentAccount = msalInstance.getActiveAccount();

  if (!currentAccount) {
    const response = await loginMsalSSO();
    if (!response) return currentAccount;
    currentAccount = response.account;
  }

  const tokenAuthRequest = {
    scopes,
    account: currentAccount !== null ? currentAccount : undefined,
  };
  try {
    const response = await msalInstance.acquireTokenSilent(tokenAuthRequest);
    msalInstance.setActiveAccount(response.account);
    return response.accessToken;
  } catch (error) {
    console.log("error", error);
    if (error instanceof InteractionRequiredAuthError) {
      msalInstance.acquireTokenRedirect({ scopes });
    }
  }
};
