import { useCallback } from "react";
import { useSelector } from "react-redux";
import { hasRole, hasAnyRole, hasAllRoles } from "../utils/roleUtils";

export const useRBAC = () => {
  const roles = useSelector((state) => state.permission.roles);
  const permissions = useSelector((state) => state.permission.permissions);

  const userHasRole = useCallback(
    (role) => {
      return hasRole(roles, role);
    },
    [roles]
  );

  const userHasAnyRole = useCallback(
    (requiredRoles) => {
      return hasAnyRole(roles, requiredRoles);
    },
    [roles]
  );

  const userHasAllRoles = useCallback(
    (requiredRoles) => {
      return hasAllRoles(roles, requiredRoles);
    },
    [roles]
  );

  const getUserRoles = useCallback(() => {
    return roles || [];
  }, [roles]);

  const getUserPermissions = useCallback(() => {
    return permissions || {};
  }, [permissions]);

  return {
    userHasRole,
    userHasAnyRole,
    userHasAllRoles,
    getUserRoles,
    getUserPermissions,
  };
};
