import api from "./api";
import { API_ENDPOINTS } from "../config/apiConfig";
import { MOCK_AUTH_RESPONSE } from "./mockData";

const isUseMockData = process.env.REACT_APP_USE_MOCK_DATA === "true";

const authService = {
  signin: async (email, password) => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: MOCK_AUTH_RESPONSE });
        }, 1000);
      });
    }

    const response = await api.post(API_ENDPOINTS.LOGIN, {
      username: email, // Backend expects 'username' field
      password,
    });
    return response;
  },

  register: async (firstName, lastName, email, username, password, confirmPassword) => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              success: true,
              message: "Registration successful. Please sign in.",
            },
          });
        }, 1000);
      });
    }

    const response = await api.post(API_ENDPOINTS.REGISTER, {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      confirm_password: confirmPassword,
    });
    return response;
  },

  forgotPassword: async (email) => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              success: true,
              message: "If this email exists, a password reset link has been sent.",
            },
          });
        }, 1000);
      });
    }

    const response = await api.post(API_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });
    return response;
  },

  refreshToken: async (refreshToken) => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              access: "mock_new_access_token",
            },
          });
        }, 500);
      });
    }

    const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
      refresh: refreshToken,
    });
    return response;
  },

  logout: async (refreshToken) => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { success: true, message: "Logged out successfully" } });
        }, 500);
      });
    }

    const response = await api.post(API_ENDPOINTS.LOGOUT, {
      refresh: refreshToken,
    });
    return response;
  },

  me: async () => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: MOCK_AUTH_RESPONSE.user });
        }, 500);
      });
    }

    const response = await api.get(API_ENDPOINTS.ME);
    return response;
  },
};

export default authService;
