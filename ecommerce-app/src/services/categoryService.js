import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Get all categories from API.
 * @returns {Promise<Array>} Category list.
 */
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
