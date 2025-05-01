import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
        <Button
          component={Link}
          to={`/product/${product._id}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          Full details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
