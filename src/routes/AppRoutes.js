import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import PermissionRoute from "./PermissionRoute";
import { PERMISSION_RESOURCES } from "../constants/permissions";

import SigninSignup from "../pages/auth/SigninSignup";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/users/UserManagement";
import RoleManagement from "../pages/roles/RoleManagement";
import Unauthorized from "../pages/errors/Unauthorized";
import NotFound from "../pages/errors/NotFound";

export const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path={ROUTE_PATHS.SIGNIN} element={<SigninSignup />} />

      <Route
        path={ROUTE_PATHS.DASHBOARD}
        element={
          <ProtectedRoute>
            <PermissionRoute
              resource={PERMISSION_RESOURCES.DASHBOARD}
              action="VIEW"
            >
              <Dashboard />
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTE_PATHS.USERS}
        element={
          <ProtectedRoute>
            <PermissionRoute
              resource={PERMISSION_RESOURCES.USERS}
              action="VIEW"
            >
              <UserManagement />
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTE_PATHS.ROLES}
        element={
          <ProtectedRoute>
            <PermissionRoute
              resource={PERMISSION_RESOURCES.ROLES}
              action="VIEW"
            >
              <RoleManagement />
            </PermissionRoute>
          </ProtectedRoute>
        }
      />

      <Route path={ROUTE_PATHS.UNAUTHORIZED} element={<Unauthorized />} />

      <Route path="/not-found" element={<NotFound />} />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={ROUTE_PATHS.DASHBOARD} replace />
          ) : (
            <Navigate to={ROUTE_PATHS.SIGNIN} replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRoutes;
