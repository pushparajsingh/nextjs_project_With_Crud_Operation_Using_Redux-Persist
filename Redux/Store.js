import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import RoleSlice from "./Slice/RoleSlice";
import TokenSlice from "./Slice/TokenSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  users: UserSlice,
  roles: RoleSlice,
  token: TokenSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
