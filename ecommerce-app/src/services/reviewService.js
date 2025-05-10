import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/reviews`;

export const fetchReviewsByProductId = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

export const createReview = async (review) => {
  const response = await axios.post(API_URL, review);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  await axios.delete(`${API_URL}/${reviewId}`);
};
