import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  permissions: {},
  loading: false,
  error: null,
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setUserRoles: (state, action) => {
      state.roles = action.payload;
    },
    setUserPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    fetchPermissionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPermissionsSuccess: (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
      state.error = null;
    },
    fetchPermissionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPermissions: (state) => {
      state.roles = [];
      state.permissions = {};
      state.error = null;
    },
  },
});

export const {
  setUserRoles,
  setUserPermissions,
  fetchPermissionsStart,
  fetchPermissionsSuccess,
  fetchPermissionsFailure,
  clearPermissions,
} = permissionSlice.actions;

export default permissionSlice.reducer;
