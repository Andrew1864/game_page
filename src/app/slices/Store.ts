"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit"; // это функция для создания store из Redux Toolkit
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../slices/userSlice";
import quizSlice from "./quizSlice";

const persistConfig = {
  key: "root", // ключ в localStorage
  storage, // где сохранять
  whitelist: ["user", "quiz"], // какие слайсы сохранять
};

const rootReducer = combineReducers({
  user: userSlice,
  quiz: quizSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // оборачиваем редьюсеры в persistReducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>; // тип всего состояния приложения
export type AppDispatch = typeof store.dispatch; // тип dispatch, чтобы использовать его в компонентах
