import { ROLES } from "../constants/roles";
import { PERMISSION_ACTIONS, PERMISSION_RESOURCES } from "../constants/permissions";

export const MOCK_AUTH_RESPONSE = {
  user: {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    first_name: "Admin",
    last_name: "User",
    roles: [ROLES.MANAGER],
  },
  access: "mock_access_token_12345",
  refresh: "mock_refresh_token_67890",
  permissions: {
    [PERMISSION_RESOURCES.DASHBOARD]: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: false,
      [PERMISSION_ACTIONS.UPDATE]: false,
      [PERMISSION_ACTIONS.DELETE]: false,
    },
    [PERMISSION_RESOURCES.USERS]: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: true,
      [PERMISSION_ACTIONS.UPDATE]: true,
      [PERMISSION_ACTIONS.DELETE]: false,
    },
    [PERMISSION_RESOURCES.ROLES]: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: true,
      [PERMISSION_ACTIONS.UPDATE]: true,
      [PERMISSION_ACTIONS.DELETE]: true,
    },
    [PERMISSION_RESOURCES.PERMISSIONS]: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: false,
      [PERMISSION_ACTIONS.UPDATE]: false,
      [PERMISSION_ACTIONS.DELETE]: false,
    },
  },
};

export const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    first_name: "Admin",
    last_name: "User",
    roles: [ROLES.MANAGER],
  },
  {
    id: 2,
    username: "reviewer",
    email: "reviewer@example.com",
    first_name: "Review",
    last_name: "User",
    roles: [ROLES.REVIEWER],
  },
  {
    id: 3,
    username: "approver",
    email: "approver@example.com",
    first_name: "Approval",
    last_name: "User",
    roles: [ROLES.APPROVER],
  },
  {
    id: 4,
    username: "auditor",
    email: "auditor@example.com",
    first_name: "Audit",
    last_name: "User",
    roles: [ROLES.AUDITOR],
  },
];

export const MOCK_MENU = [
  {
    id: 1,
    name: "Dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "grid",
    parent_id: null,
    resource: PERMISSION_RESOURCES.DASHBOARD,
    permissions: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: false,
      [PERMISSION_ACTIONS.UPDATE]: false,
      [PERMISSION_ACTIONS.DELETE]: false,
    },
  },
  {
    id: 2,
    name: "Administration",
    label: "Administration",
    path: null,
    icon: "gear",
    parent_id: null,
    resource: null,
    permissions: {},
    children: [3, 4, 5],
  },
  {
    id: 3,
    name: "Users",
    label: "Users",
    path: "/users",
    icon: "people",
    parent_id: 2,
    resource: PERMISSION_RESOURCES.USERS,
    permissions: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: true,
      [PERMISSION_ACTIONS.UPDATE]: true,
      [PERMISSION_ACTIONS.DELETE]: false,
    },
  },
  {
    id: 4,
    name: "Roles",
    label: "Roles",
    path: "/roles",
    icon: "person-badge",
    parent_id: 2,
    resource: PERMISSION_RESOURCES.ROLES,
    permissions: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: true,
      [PERMISSION_ACTIONS.UPDATE]: true,
      [PERMISSION_ACTIONS.DELETE]: true,
    },
  },
  {
    id: 5,
    name: "Permissions",
    label: "Permissions",
    path: "/permissions",
    icon: "lock",
    parent_id: 2,
    resource: PERMISSION_RESOURCES.PERMISSIONS,
    permissions: {
      [PERMISSION_ACTIONS.VIEW]: true,
      [PERMISSION_ACTIONS.ADD]: false,
      [PERMISSION_ACTIONS.UPDATE]: false,
      [PERMISSION_ACTIONS.DELETE]: false,
    },
  },
];
