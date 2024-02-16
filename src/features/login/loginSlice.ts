// libraries
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// types and constants
import { LoginResponse, UserDetails } from "ts/types/User";
import LocalStorageItems from "ts/enums/LocalStorageItems";

const localStorageUser = localStorage.getItem(LocalStorageItems.User);
const user = localStorageUser ? JSON.parse(localStorageUser) : null;
const token = localStorage.getItem(LocalStorageItems.Token);
const expirationDate = localStorage.getItem(LocalStorageItems.ExpirationDate);

const initialState: LoginResponse = {
  user,
  token: token || "",
  expirationDate: expirationDate || "",
};

export const createLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        user: UserDetails;
        token: string;
        expirationDate: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expirationDate = action.payload.expirationDate;
    },
    updateUser: (state, action: PayloadAction<UserDetails>) => {
      state.user = action.payload;
    },
  },
});

export const getToken = (state: LoginResponse) => state.token;
export const { setToken, updateUser } = createLoginSlice.actions;
export default createLoginSlice.reducer;
