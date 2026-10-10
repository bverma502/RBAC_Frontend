import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    fetchMenuStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMenuSuccess: (state, action) => {
      state.loading = false;
      state.menus = action.payload;
      state.error = null;
    },
    fetchMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMenu: (state) => {
      state.menus = [];
      state.error = null;
    },
  },
});

export const {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  clearMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
