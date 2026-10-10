import { PERMISSION_ACTIONS } from "../constants/permissions";

export const hasPermission = (permissions, resource, action) => {
  if (!permissions || !resource || !action) {
    return false;
  }

  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) {
    return false;
  }

  return resourcePermissions[action] === true;
};

export const hasAnyPermission = (permissions, resource, actions) => {
  if (!Array.isArray(actions)) {
    return false;
  }

  return actions.some((action) => hasPermission(permissions, resource, action));
};

export const hasAllPermissions = (permissions, resource, actions) => {
  if (!Array.isArray(actions)) {
    return false;
  }

  return actions.every((action) =>
    hasPermission(permissions, resource, action)
  );
};

export const canView = (permissions, resource) => {
  return hasPermission(permissions, resource, PERMISSION_ACTIONS.VIEW);
};

export const canAdd = (permissions, resource) => {
  return hasPermission(permissions, resource, PERMISSION_ACTIONS.ADD);
};

export const canUpdate = (permissions, resource) => {
  return hasPermission(permissions, resource, PERMISSION_ACTIONS.UPDATE);
};

export const canDelete = (permissions, resource) => {
  return hasPermission(permissions, resource, PERMISSION_ACTIONS.DELETE);
};
