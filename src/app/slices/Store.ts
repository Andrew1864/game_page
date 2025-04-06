import { configureStore } from "@reduxjs/toolkit"; // это функция для создания store из Redux Toolkit
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // тип всего состояния приложения
export type AppDispatch = typeof store.dispatch; // тип dispatch, чтобы использовать его в компонентах
