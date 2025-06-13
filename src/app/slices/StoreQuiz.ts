import quizSlice from "./quizSlice";
import { configureStore } from "@reduxjs/toolkit";

const storeQuiz = configureStore({
  reducer: {
    quiz: quizSlice, //  редьюсер
  },
});

export default storeQuiz;
export type RootState = ReturnType<typeof storeQuiz.getState>; // тип всего состояния приложения
export type AppDispatch = typeof storeQuiz.dispatch; // тип dispatch, чтобы использовать его в компонентах
