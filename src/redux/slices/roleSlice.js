import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    fetchRolesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
      state.error = null;
    },
    fetchRolesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRoleDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoleDetailSuccess: (state, action) => {
      state.loading = false;
      state.selectedRole = action.payload;
      state.error = null;
    },
    fetchRoleDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRoleSuccess: (state, action) => {
      state.loading = false;
      state.roles.push(action.payload);
      state.error = null;
    },
    createRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRoleSuccess: (state, action) => {
      state.loading = false;
      const index = state.roles.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
      state.selectedRole = action.payload;
      state.error = null;
    },
    updateRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRoleSuccess: (state, action) => {
      state.loading = false;
      state.roles = state.roles.filter((r) => r.id !== action.payload);
      if (state.selectedRole?.id === action.payload) {
        state.selectedRole = null;
      }
      state.error = null;
    },
    deleteRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
  fetchRoleDetailStart,
  fetchRoleDetailSuccess,
  fetchRoleDetailFailure,
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  deleteRoleFailure,
} = roleSlice.actions;

export default roleSlice.reducer;
