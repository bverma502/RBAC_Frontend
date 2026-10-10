import api from './api';

// Get all resources
export const getResources = async () => {
  try {
    const response = await api.get('resources/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all permissions
export const getPermissions = async () => {
  try {
    const response = await api.get('permissions/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get permission matrix (resources, actions, and permission mappings)
export const getPermissionMatrix = async () => {
  try {
    const response = await api.get('permissions/matrix/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
