import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/api/products/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (categoryId) => {
  const response = await axios.get(
    `${API_URL}/api/products/category/${categoryId}`
  );
  return response.data;
};
