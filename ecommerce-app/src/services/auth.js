import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data.token;
};

export const register = async (userName, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    userName,
    email,
    password,
  });
  return response.data.newUser;
};
