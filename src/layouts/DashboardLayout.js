import React from "react";
import DashboardNavbar from "../components/navigation/DashboardNavbar";
import FlyoutMenu from "../components/navigation/FlyoutMenu";
import "../styles/dashboard-layout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <DashboardNavbar />
      <div className="layout-container">
        <aside className="sidebar">
          <FlyoutMenu />
        </aside>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
