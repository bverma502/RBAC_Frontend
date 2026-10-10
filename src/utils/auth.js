const STORAGE_KEYS = {
  ACCESS_TOKEN: "rbac_access_token",
  REFRESH_TOKEN: "rbac_refresh_token",
  USER: "rbac_user",
  IS_SUPERUSER: "rbac_is_superuser",
  IS_STAFF: "rbac_is_staff",
  PERMISSIONS: "rbac_permissions",
  ROLES: "rbac_roles",
};

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
};

export const getRefreshToken = () => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
};

export const getStoredUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export const getIsSuperuser = () => {
  const value = localStorage.getItem(STORAGE_KEYS.IS_SUPERUSER);
  return value === 'true';
};

export const setIsSuperuser = (value) => {
  localStorage.setItem(STORAGE_KEYS.IS_SUPERUSER, String(value));
};

export const getIsStaff = () => {
  const value = localStorage.getItem(STORAGE_KEYS.IS_STAFF);
  return value === 'true';
};

export const setIsStaff = (value) => {
  localStorage.setItem(STORAGE_KEYS.IS_STAFF, String(value));
};

export const getStoredPermissions = () => {
  const permissions = localStorage.getItem(STORAGE_KEYS.PERMISSIONS);
  return permissions ? JSON.parse(permissions) : {};
};

export const setStoredPermissions = (permissions) => {
  if (permissions) {
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions));
  } else {
    localStorage.removeItem(STORAGE_KEYS.PERMISSIONS);
  }
};

export const getStoredRoles = () => {
  const roles = localStorage.getItem(STORAGE_KEYS.ROLES);
  return roles ? JSON.parse(roles) : [];
};

export const setStoredRoles = (roles) => {
  if (roles) {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
  } else {
    localStorage.removeItem(STORAGE_KEYS.ROLES);
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.IS_SUPERUSER);
  localStorage.removeItem(STORAGE_KEYS.IS_STAFF);
  localStorage.removeItem(STORAGE_KEYS.PERMISSIONS);
  localStorage.removeItem(STORAGE_KEYS.ROLES);
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};
