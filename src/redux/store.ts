import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import sourcesReducer from "./datasources/slice";
import analysisReducer from "./data/slice";
import dataFiltersReducer from "./datafilters/slice";
import houghReducer from "./houghdata/slice";
import houghTrajectoryReducer from "./houghTrajectory/slice";
import sideBarReducer from "./sidebar/slice";
import loaderReducer from "./loader/slice";
import { AuthState } from "../redux/auth/types";

import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig: PersistConfig<AuthState> = {
  key: "authAnalysis",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer<AuthState>(
  authPersistConfig,
  authReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    sources: sourcesReducer,
    analysis: analysisReducer,
    datafilters: dataFiltersReducer,
    hough: houghReducer,
    houghtrack: houghTrajectoryReducer,
    sidebar: sideBarReducer,
    loader: loaderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
