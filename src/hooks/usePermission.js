import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canView,
  canAdd,
  canUpdate,
  canDelete,
} from "../utils/permissions";

export const usePermission = () => {
  const { isSuperuser, permissions } = useSelector((state) => state.auth);

  const can = useCallback(
    (resource, action) => {
      // Superusers have all permissions
      if (isSuperuser) return true;
      return hasPermission(permissions, resource, action);
    },
    [isSuperuser, permissions]
  );

  const canViewResource = useCallback(
    (resource) => {
      if (isSuperuser) return true;
      return canView(permissions, resource);
    },
    [isSuperuser, permissions]
  );

  const canAddToResource = useCallback(
    (resource) => {
      if (isSuperuser) return true;
      return canAdd(permissions, resource);
    },
    [isSuperuser, permissions]
  );

  const canUpdateResource = useCallback(
    (resource) => {
      if (isSuperuser) return true;
      return canUpdate(permissions, resource);
    },
    [isSuperuser, permissions]
  );

  const canDeleteResource = useCallback(
    (resource) => {
      if (isSuperuser) return true;
      return canDelete(permissions, resource);
    },
    [isSuperuser, permissions]
  );

  const canPerformAny = useCallback(
    (resource, actions) => {
      if (isSuperuser) return true;
      return hasAnyPermission(permissions, resource, actions);
    },
    [isSuperuser, permissions]
  );

  const canPerformAll = useCallback(
    (resource, actions) => {
      if (isSuperuser) return true;
      return hasAllPermissions(permissions, resource, actions);
    },
    [isSuperuser, permissions]
  );

  return {
    can,
    canViewResource,
    canAddToResource,
    canUpdateResource,
    canDeleteResource,
    canPerformAny,
    canPerformAll,
  };
};
