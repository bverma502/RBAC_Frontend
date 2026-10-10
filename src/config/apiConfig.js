const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://10.46.218.245:8000/api/v1/";

const API_ENDPOINTS = {
  // Authentication
  LOGIN: "auth/login/",
  REGISTER: "auth/register/",
  FORGOT_PASSWORD: "auth/forgot-password/",
  REFRESH_TOKEN: "auth/refresh/",
  LOGOUT: "auth/logout/",
  ME: "auth/me/",

  // Users
  USERS: "users/",
  USER_DETAIL: "users/{id}/",

  // Roles
  ROLES: "roles/",
  ROLE_DETAIL: "roles/{id}/",

  // Permissions
  PERMISSIONS: "permissions/",

  // Menu/Navigation
  MENU: "navigation/",
};

export { API_BASE_URL, API_ENDPOINTS };
