import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";
import { getAccessToken } from "../utils/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could implement token refresh logic here
      // For now, just reject
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
