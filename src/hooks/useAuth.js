import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  clearError,
} from "../redux/slices/authSlice";
import {
  setUserRoles,
  setUserPermissions,
  clearPermissions,
} from "../redux/slices/permissionSlice";
import {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  clearMenu,
} from "../redux/slices/menuSlice";
import authService from "../services/authService";
import menuService from "../services/menuService";
import {
  setAccessToken,
  setRefreshToken,
  setStoredUser,
  setIsSuperuser,
  setIsStaff,
  setStoredPermissions,
  setStoredRoles,
  clearAuthStorage,
} from "../utils/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const fetchMenu = useCallback(async () => {
    try {
      dispatch(fetchMenuStart());
      const response = await menuService.getMenu();
      dispatch(fetchMenuSuccess(response.data));
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Failed to fetch menu";
      dispatch(fetchMenuFailure(errorMessage));
    }
  }, [dispatch]);

  const signin = useCallback(
    async (email, password) => {
      try {
        dispatch(loginStart());
        const response = await authService.signin(email, password);
        const { user, access, refresh, permissions, roles, is_superuser, is_staff } = response.data;

        // Store in localStorage
        setAccessToken(access);
        setRefreshToken(refresh);
        setStoredUser(user);
        setIsSuperuser(is_superuser || false);
        setIsStaff(is_staff || false);
        setStoredPermissions(permissions || {});
        setStoredRoles(roles || []);

        // Update Redux state
        dispatch(loginSuccess({
          user,
          accessToken: access,
          refreshToken: refresh,
          is_superuser: is_superuser || false,
          is_staff: is_staff || false,
          permissions: permissions || {},
          roles: roles || [],
        }));

        dispatch(setUserRoles(roles || []));
        dispatch(setUserPermissions(permissions || {}));

        // Fetch menu after login
        await fetchMenu();

        return { success: true };
      } catch (error) {
        const errorMessage = error.response?.data?.detail 
          || error.response?.data?.message 
          || "Sign in failed";
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch, fetchMenu]
  );

  const logout = useCallback(async () => {
    try {
      dispatch(logoutStart());
      const refreshToken = auth.refreshToken;
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      clearAuthStorage();
      dispatch(logoutSuccess());
      dispatch(clearPermissions());
      dispatch(clearMenu());
    } catch (error) {
      // Even if logout API fails, clear local storage
      clearAuthStorage();
      dispatch(logoutSuccess());
      dispatch(clearPermissions());
      dispatch(clearMenu());
      const errorMessage = error.response?.data?.detail || "Logout failed";
      console.error(errorMessage);
    }
  }, [dispatch, auth.refreshToken]);

  const clearErrorMessage = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...auth,
    signin,
    logout,
    fetchMenu,
    clearErrorMessage,
  };
};
