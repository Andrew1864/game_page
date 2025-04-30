import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setName: (state, action) => {
      state.name = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", action.payload);
      }
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setAchievements: (state, action) => {
      state.achievements = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    initializeFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
          state.name = storedName;
        }
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
} = userSlice.actions;

export default userSlice.reducer;
