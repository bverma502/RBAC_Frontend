export const hasRole = (roles, role) => {
  if (!Array.isArray(roles)) {
    return false;
  }
  return roles.includes(role);
};

export const hasAnyRole = (roles, requiredRoles) => {
  if (!Array.isArray(roles) || !Array.isArray(requiredRoles)) {
    return false;
  }
  return requiredRoles.some((role) => roles.includes(role));
};

export const hasAllRoles = (roles, requiredRoles) => {
  if (!Array.isArray(roles) || !Array.isArray(requiredRoles)) {
    return false;
  }
  return requiredRoles.every((role) => roles.includes(role));
};
