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
  userId: number | string | null;
  progress: number;
  achievements: Achievement[];
  clickedTechs: string[];
  isModalOpen: boolean;
  alert: AlertState;
}

interface AlertState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  variant: "success" | "error" | "warning" | "info";
}

// Начальное состояние с явными типами
const initialState: UserState = {
  name: "",
  userId: null,
  progress: 0,
  achievements: [],
  clickedTechs: [],
  isModalOpen: false,
  alert: {
    isOpen: false,
    title: "",
    subtitle: "",
    variant: "success",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
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
    addClickedTech: (state, action: PayloadAction<string>) => {
      if (!state.clickedTechs.includes(action.payload)) {
        state.clickedTechs.push(action.payload);
      }
    },
    removeClickedTech: (state, action) => {
      state.clickedTechs = state.clickedTechs.filter(
        (tech) => tech !== action.payload
      );
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
    showAlert: (state, action) => {
      const { title, subtitle, variant } = action.payload;
      state.alert = {
        isOpen: true,
        title,
        subtitle,
        variant,
      };
    },
    hideAlert: (state) => {
      state.alert.isOpen = false;
    },
    clearUserData: (state) => {
      state.name = "";
      state.userId = null;
      state.progress = 0;
      state.achievements = [];
      state.clickedTechs = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("progress");
        localStorage.removeItem("achievements");
        localStorage.removeItem("clickedTechs");
      }
    },
  },
});

export const {
  setName,
  setUserId,
  setProgress,
  setAchievements,
  addClickedTech,
  removeClickedTech,
  toggleModal,
  initializeFromLocalStorage,
  clearUserData,
  updateAchievements,
  showAlert,
  hideAlert,
} = userSlice.actions;

export default userSlice.reducer;
