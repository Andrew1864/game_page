import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  progress: 0,
  isModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { setName, setProgress, toggleModal } = userSlice.actions;
export default userSlice.reducer;
