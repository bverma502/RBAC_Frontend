import api from './api';

// Get all users
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get('users/', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single user by ID
export const getUser = async (id) => {
  try {
    const response = await api.get(`users/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const response = await api.post('users/', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`users/${id}/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`users/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Upload user profile image
export const uploadUserImage = async (id, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('profile_image', imageFile);
    
    const response = await api.post(`users/${id}/upload_image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Change user password
export const changeUserPassword = async (id, passwordData) => {
  try {
    const response = await api.post(`users/${id}/change_password/`, passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
