import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePermission } from "../../hooks/usePermission";
import { ROUTE_PATHS } from "../../constants/routes";
import { PERMISSION_RESOURCES } from "../../constants/permissions";
import "../../styles/sidebar.css";

const FlyoutMenu = () => {
  const menus = useSelector((state) => state.menu.menus);
  const [expandedMenus, setExpandedMenus] = useState({});
  const { canViewResource } = usePermission();

  // Static menu items (fallback if backend menus are empty)
  const staticMenus = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: ROUTE_PATHS.DASHBOARD,
      resource: PERMISSION_RESOURCES.DASHBOARD,
      parent_id: null,
    },
    {
      id: 'users',
      label: 'User Management',
      path: ROUTE_PATHS.USERS,
      resource: PERMISSION_RESOURCES.USERS,
      parent_id: null,
    },
    {
      id: 'roles',
      label: 'Role Management',
      path: ROUTE_PATHS.ROLES,
      resource: PERMISSION_RESOURCES.ROLES,
      parent_id: null,
    },
  ];

  // Use backend menus if available, otherwise use static menus
  const activeMenus = menus.length > 0 ? menus : staticMenus;

  const toggleMenuExpand = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const renderMenuItem = (menuItem) => {
    const resource = menuItem.resource;
    const hasViewPermission = !resource || canViewResource(resource);

    if (!hasViewPermission) {
      return null;
    }

    const hasChildren = menuItem.children && menuItem.children.length > 0;
    const isExpanded = expandedMenus[menuItem.id];

    if (menuItem.path) {
      return (
        <li key={menuItem.id} className="menu-item">
          <NavLink
            to={menuItem.path}
            className={({ isActive }) =>
              `menu-link ${isActive ? "active" : ""}`
            }
          >
            {menuItem.icon && <span className="menu-icon">{menuItem.icon}</span>}
            <span className="menu-label">{menuItem.label}</span>
          </NavLink>
        </li>
      );
    }

    if (hasChildren) {
      return (
        <li key={menuItem.id} className="menu-item">
          <button
            className="menu-link parent-menu"
            onClick={() => toggleMenuExpand(menuItem.id)}
          >
            {menuItem.icon && <span className="menu-icon">{menuItem.icon}</span>}
            <span className="menu-label">{menuItem.label}</span>
            <span className={`menu-arrow ${isExpanded ? "expanded" : ""}`}>
              ▶
            </span>
          </button>
          {isExpanded && (
            <ul className="submenu">
              {activeMenus
                .filter((m) => m.parent_id === menuItem.id)
                .map((child) => renderMenuItem(child))}
            </ul>
          )}
        </li>
      );
    }

    return null;
  };

  const rootMenus = activeMenus.filter((m) => !m.parent_id);

  return (
    <div className="flyout-menu">
      <ul className="menu-list">
        {rootMenus.map((menu) => renderMenuItem(menu))}
      </ul>
    </div>
  );
};

export default FlyoutMenu;
