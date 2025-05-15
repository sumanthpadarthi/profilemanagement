import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: JSON.parse(localStorage.getItem("profile")) || null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    deleteProfile: (state) => {
      state.profile = null;
      localStorage.removeItem("profile");
    },
  },
});

export const { saveProfile, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer;
