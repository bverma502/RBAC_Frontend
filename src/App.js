import React from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import AuthInitializer from "./components/common/AuthInitializer";
import { ROUTE_PATHS } from "./constants/routes";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  const isAuthPage =
    location.pathname === ROUTE_PATHS.SIGNIN ||
    location.pathname === ROUTE_PATHS.UNAUTHORIZED ||
    location.pathname === "/not-found";

  const LayoutWrapper = isAuthenticated && !isAuthPage ? DashboardLayout : AuthLayout;

  return (
    <AuthInitializer>
      <LayoutWrapper>
        <AppRoutes />
      </LayoutWrapper>
    </AuthInitializer>
  );
}

export default App;
