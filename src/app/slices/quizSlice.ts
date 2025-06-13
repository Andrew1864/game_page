import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface quizStateProgress {
  currentStep: number;
  selectedAnswer: number[];
  isFinished: boolean;
  result: { current: number; incurrent: number };
}

const initialState: quizStateProgress = {
  currentStep: 0, //  номер текущей карточки
  selectedAnswer: [], //   сюда будем пушить выбранные индексы
  isFinished: false, // флаг завершения
  result: { current: 0, incurrent: 0 }, //  для подсчёта результата
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      state.selectedAnswer[state.currentStep] = action.payload; // сохранить ответ по индексу
    },
    nextQuestion: (state) => {
      state.currentStep++; // перейти к следующему вопросу
    },
   finishQuiz: (state, action: PayloadAction<{ current: number; incurrent: number }>) => {
      state.isFinished = true; // ставим флаг завершения
      state.result = action.payload; // сохранить результат
    },
    resetQuiz: () => {
      return initialState;
    },
  },
});

export const { setAnswer, nextQuestion, finishQuiz, resetQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
