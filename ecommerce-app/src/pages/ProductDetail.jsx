import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Rating,
  Stack,
} from "@mui/material";
import { fetchProductById } from "../services/productService";
import {
  fetchReviewsByProductId,
  createReview,
} from "../services/reviewService";
import MainLayout from "../layout/MainLayout";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProductAndReviews = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);

        const reviewsData = await fetchReviewsByProductId(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading product or reviews:", error);
      }
    };

    loadProductAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];

      const existingIndex = cart.findIndex(
        (item) => item.productId === product._id
      );

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({ productId: product._id, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.log("Authenticated add to cart - implement API call");
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ comment, rating, productId: id }, token);
      setComment("");
      setRating(0);
      const updatedReviews = await fetchReviewsByProductId(id);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <Typography variant="h5" align="center" mt={4}>
          Loading product...
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.name}
              sx={{
                width: "100%",
                maxHeight: 500,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>

              <Chip
                label={product.category?.name || "Uncategorized"}
                color="primary"
                sx={{ mb: 2 }}
              />

              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>

              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                Stock: {product.stock > 0 ? product.stock : "Out of stock"}
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
              >
                {product.stock <= 0
                  ? "Out of stock"
                  : addedToCart
                  ? "Added!"
                  : "Add to cart"}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box mt={6}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>

          {reviews.length === 0 ? (
            <Typography>No reviews yet.</Typography>
          ) : (
            reviews.map((review) => (
              <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2">{review.comment}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Paper>
            ))
          )}

          <Box mt={4}>
            <Typography variant="h6">Leave a review</Typography>
            {!token ? (
              <Typography variant="body2" color="text.secondary">
                You need to be logged in to submit a review.
              </Typography>
            ) : null}

            <form onSubmit={handleReviewSubmit}>
              <TextField
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                disabled={!token}
              />
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                disabled={!token}
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!token || rating === 0 || !comment.trim()}
                >
                  Submit Review
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default ProductDetail;
