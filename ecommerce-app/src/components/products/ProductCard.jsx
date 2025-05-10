import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const ProductCard = ({ product }) => {
  const hasStock = product.stock > 0;
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", height: "100%" }}>
      <CardMedia
        component="img"
        height="180"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {truncateText(product.description || "", 100)}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6" color="primary">
            ${product.price?.toFixed(2) || "0.00"}
          </Typography>
          <Chip
            label={hasStock ? `Stock: ${product.stock}` : "Out of Stock"}
            color={hasStock ? "success" : "default"}
            size="small"
          />
        </Stack>

        <Stack spacing={1}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => addToCart(product)}
            disabled={!hasStock}
          >
            {hasStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button
            component={Link}
            to={`/product/${product._id}`}
            variant="outlined"
            color="primary"
            fullWidth
          >
            View Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
