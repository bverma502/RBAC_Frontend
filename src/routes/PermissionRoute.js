import React from "react";
import { Navigate } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
import { ROUTE_PATHS } from "../constants/routes";

export const PermissionRoute = ({ resource, action = "VIEW", children }) => {
  const { can } = usePermission();

  if (!can(resource, action)) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} replace />;
  }

  return children;
};

export default PermissionRoute;
