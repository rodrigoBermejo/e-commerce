import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CardMedia, Button } from "@mui/material";
import { fetchProductById } from "../services/productService";
import MainLayout from "../layout/MainLayout";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <MainLayout>
        <Typography variant="h5" align="center">
          Loading product...
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          mt: 4,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={product.imageUrl}
          alt={product.name}
          sx={{ maxWidth: 600 }}
        />
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="body1" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h5" color="primary">
          ${product.price}
        </Typography>
        <Button variant="contained" color="secondary">
          Add to cart
        </Button>
      </Box>
    </MainLayout>
  );
};

export default ProductDetail;
