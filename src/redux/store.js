import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "../redux/auth/slice";
import sourcesReducer from "../redux/datasources/slice";
import analysisReducer from "../redux/data/slice";
import dataFiltersReducer from "../redux/datafilters/slice";
import houghReducer from "../redux/houghdata/slice";
import houghTrajectoryReducer from "../redux/houghTrajectory/slice";
import sideBarReducer from "../redux/sidebar/slice";
import loaderReducer from "../redux/loader/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "authAnalysis",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
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

const persistor = persistStore(store);

export { store, persistor };
