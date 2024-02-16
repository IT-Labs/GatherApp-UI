// hooks/methods
import { setToken } from "features/login/loginSlice";
import { RootState } from "store/store";

// libraries
import { z } from "zod";
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { Mutex } from "async-mutex";
import { toast } from "react-toastify";

// types and constants
import { RefreshTokenResponse } from "ts/types/User";
import LocalStorageItems from "ts/enums/LocalStorageItems";
import { STATIC_ROUTES } from "utils/constants";

const mutex = new Mutex();

const logoutFunction = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = STATIC_ROUTES.login;
  }, 2000);
};

const genericDataSchema = z.object({
  status: z.number(),
  data: z.any(),
  messages: z.array(z.string()),
});

const genericDataResponseSchema = z.object({
  data: genericDataSchema,
});

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    let token: string;
    if (localStorage?.length) {
      token = localStorage.getItem(LocalStorageItems.Token) as string;
    }

    token = (getState() as RootState).login.token;

    if (
      endpoint !== "createEvent" &&
      endpoint !== "editEvent" &&
      endpoint !== "createEvent" &&
      endpoint !== "editEvent" &&
      endpoint !== "uploadPicture"
    ) {
      headers.set("Content-type", "application/json; charset=UTF-8");
    }

    if (
      token &&
      endpoint !== "signup" &&
      endpoint !== "login" &&
      endpoint !== "forgot-password" &&
      !endpoint.startsWith("reset-password")
    ) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

// refresh token function
const handleExpiredToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const refreshResult = (await baseQuery(
    { method: "POST", credentials: "include", url: "/refresh-access" },
    api,
    extraOptions
  )) as { data: RefreshTokenResponse };

  let result = null;

  if (refreshResult.data) {
    const response = refreshResult.data.data;

    // store new data in the local storage and redux store
    localStorage.setItem(LocalStorageItems.Token, response.token);
    localStorage.setItem(
      LocalStorageItems.ExpirationDate,
      response.expires.toString()
    );
    api.dispatch(
      setToken({
        user: JSON.parse(
          localStorage.getItem(LocalStorageItems.User) as string
        ),
        expirationDate: response.expires.toString(),
        token: response.token,
      })
    );

    // Retry the initial query
    result = await baseQuery(args, api, extraOptions);
  } else {
    result = refreshResult as QueryReturnValue<
      unknown,
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >;
  }
  return result;
};

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const currentExp = localStorage.getItem(
    LocalStorageItems.ExpirationDate
  ) as string;
  const currentExpiration = new Date(currentExp);
  let result;

  // we use mutex to lock repeating requests; we only want refresh-access to be called once
  // and wait for the response
  await mutex.waitForUnlock();
  const release = await mutex.acquire();

  // check if we're calling the Invalidate refresh token endpoint;
  // we don't want to call the refresh token function in that case
  const checkArgs =
    typeof args !== "string" &&
    (args as FetchArgs).url === `/refresh-access` &&
    (args as FetchArgs).method === "DELETE";

  try {
    if (currentExp && currentExpiration < new Date() && !checkArgs) {
      result = await handleExpiredToken(args, api, extraOptions);
    } else {
      result = await baseQuery(args, api, extraOptions);
    }
  } catch (err) {
    console.log(err);
  } finally {
    release();
  }
  if (result && result.error !== undefined) {
    const isLoginRequest =
      (args as FetchArgs).url === "/login" &&
      (args as FetchArgs).method === "POST";
    if (result.error.status === 401 && !isLoginRequest) {
      if (!mutex.isLocked()) {
        try {
          result = await handleExpiredToken(args, api, extraOptions);
          if (result.error) logoutFunction();
        } catch (error) {
          logoutFunction();
        } finally {
          // release must be called once the mutex should be released again
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    const parsedResult = genericDataResponseSchema.safeParse(result.error);

    if (parsedResult.success) {
      if (parsedResult.data.data.messages[0].length) {
        toast.error(parsedResult.data.data.messages[0]);
      }
      result.error = parsedResult.data.data;
    }
  }

  if (result && result.data) {
    const parsedResult = genericDataResponseSchema.safeParse(result);

    if (parsedResult.success) {
      if (parsedResult.data.data.messages[0].length) {
        toast.success(parsedResult.data.data.messages[0]);
      }

      result.data = parsedResult.data.data.data;
    }
  }
  return result as QueryReturnValue<
    unknown,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  >;
};

export default customFetchBase;
