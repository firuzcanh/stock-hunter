import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, type PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { ErrorMiddleware } from "@/store/middlewares/error.middleware";

import { configsSlice } from "./features/configs.slice";
import { contentSlice } from "./features/content.slice";
import { customContentSlice } from "./features/custom-content";
import { folderSlice } from "./features/folder.slice";
import { mediaSlice } from "./features/media.slice";

const rootReducer = combineReducers({
  [configsSlice.reducerPath]: configsSlice.reducer,
  [contentSlice.reducerPath]: contentSlice.reducer,
  [mediaSlice.reducerPath]: mediaSlice.reducer,
  [customContentSlice.reducerPath]: customContentSlice.reducer,
  [folderSlice.reducerPath]: folderSlice.reducer,
});

type RootReducerState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerState> = {
  key: "sh",
  storage,
  whitelist: [
    configsSlice.reducerPath,
    contentSlice.reducerPath,
    customContentSlice.reducerPath,
    folderSlice.reducerPath,
  ],
  stateReconciler: autoMergeLevel2,
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(ErrorMiddleware),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const getAppState = (): ReturnType<typeof store.getState> =>
  store.getState();
