// hooks/methods
import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// importing different slices from features/services
import { gatherAppApi } from "services/api/gatherapp";

const initialState = {
  user: {
    id: "1",
    email: "john.doe@doesntexist.com",
    fullName: "John Doe",
    firstName: "John",
    lastName: "Doe",
    location: "Serbia",
    roleName: "Admin",
  },
};

export const createLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUserRole: (state: any, action: PayloadAction<string>) => {
      state.user.roleName = action.payload;
    },
  },
});

export const { updateUserRole } = createLoginSlice.actions;

export const mockReduxStore = configureStore({
  reducer: {
    [gatherAppApi.reducerPath]: gatherAppApi.reducer,
    login: createLoginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gatherAppApi.middleware),
});
