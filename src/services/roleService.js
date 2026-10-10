import api from './api';

// Get all roles
export const getRoles = async (params = {}) => {
  try {
    const response = await api.get('roles/', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single role by ID
export const getRole = async (id) => {
  try {
    const response = await api.get(`roles/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new role
export const createRole = async (roleData) => {
  try {
    const response = await api.post('roles/', roleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update role
export const updateRole = async (id, roleData) => {
  try {
    const response = await api.patch(`roles/${id}/`, roleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete role
export const deleteRole = async (id) => {
  try {
    const response = await api.delete(`roles/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get role permissions
export const getRolePermissions = async (id) => {
  try {
    const response = await api.get(`roles/${id}/permissions/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Assign permissions to role
export const assignRolePermissions = async (id, permissionIds) => {
  try {
    const response = await api.post(`roles/${id}/assign_permissions/`, {
      permission_ids: permissionIds,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
