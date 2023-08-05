import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchGuests = async () => {
  try {
    const response = await axios.get(`${API_BASE}/guests`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createGuest = async (firstName, lastName, age, email) => {
  try {
    const response = await axios.post(`${API_BASE}/register-user`, {
      firstName,
      lastName,
      age,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGuest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/guests/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGuest = async (id, firstName, lastName, age, email) => {
  try {
    const response = await axios.put(`${API_BASE}/guests/${id}`, {
      firstName,
      lastName,
      age,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
