import api from './api';

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

let allUsersPromise;
let allUsersData;
let allUsersError;

// Obtener todos los usuarios
export const performFetchAllUsers = async () => {
  console.log("Fetching ALL users from API (axios)");
  try {
    const response = await api.get('/users');
    await simulateDelay(1000);
    allUsersData = response.data;
    return allUsersData;
  } catch (error) {
    allUsersError = error;
    throw error;
  }
};

export const readAllUsers = () => {
  if (allUsersData !== undefined) return allUsersData;
  if (allUsersError !== undefined) throw allUsersError;
  if (allUsersPromise === undefined) allUsersPromise = performFetchAllUsers();
  throw allUsersPromise;
};

export const createUser = async (userData) => {
  try {
    console.log("Datos que se envían al POST:", JSON.stringify(userData, null, 2));
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error("Error completo al crear usuario:", error.response?.data || error.message);
    throw new Error(`Error al crear usuario: ${error.response?.data || error.message}`);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error.message}`);
  }
};

export const isEmailDuplicate = async (email, excludeId = null) => {
  try {
    const response = await api.get(`/users?email=${encodeURIComponent(email)}`);
    const users = response.data;
    return users.some(user => user.email === email && user.id !== excludeId);
  } catch (error) {
    throw new Error(`Error al validar email: ${error.message}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error.response?.data || error.message);
    throw new Error(`Error al eliminar usuario: ${error.response?.data || error.message}`);
  }
};