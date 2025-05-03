import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип для достижения
interface Achievement {
  title: string;
  description: string;
  completed: boolean;
}

// Определяем тип для состояния пользователя
interface UserState {
  name: string;
  userId: number | null;
  progress: number;
  achievements: Achievement[];
  isModalOpen: boolean;
}

// Начальное состояние с явными типами
const initialState: UserState = {
  name: "",
  userId: null,
  progress: 0,
  achievements: [],
  isModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", action.payload);
      }
    },
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setAchievements: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    updateAchievements: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const index = state.achievements.findIndex((a) => a.title === title);
      if (index !== -1) {
        state.achievements[index].completed = true;
      }
    },
    initializeFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
          state.name = storedName;
        }
      }
    },
    clearUserData: (state) => {
      state.name = "";
      state.userId = null;
      state.progress = 0;
      state.achievements = [];
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    },
  },
});

export const {
  setName,
  setUserId,
  setProgress,
  setAchievements,
  toggleModal,
  initializeFromLocalStorage,
  clearUserData,
  updateAchievements,
} = userSlice.actions;

export default userSlice.reducer;
