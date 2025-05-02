import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data.token;
};

export const register = async (userName, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    userName,
    email,
    password,
  });
  return response.data.newUser;
};
