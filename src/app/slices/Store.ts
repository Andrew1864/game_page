"use client";

import { configureStore } from "@reduxjs/toolkit"; // это функция для создания store из Redux Toolkit
import userSlice from "../slices/userSlice";
import quizSlice from "./quizSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    quiz: quizSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // тип всего состояния приложения
export type AppDispatch = typeof store.dispatch; // тип dispatch, чтобы использовать его в компонентах
