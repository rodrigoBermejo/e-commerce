import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Paper,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchCart } from "../services/cartService";
import { fetchProductById } from "../services/productService";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("token");
      let cartItems = [];

      if (token) {
        try {
          const userId = "USER_ID";
          const cartData = await fetchCart(userId);
          cartItems = cartData.products;
        } catch (error) {
          console.error("Error loading cart from API:", error);
        }
      } else {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          cartItems = JSON.parse(storedCart);
        }
      }

      const detailedCart = await Promise.all(
        cartItems.map(async (item) => {
          const product = await fetchProductById(item.productId);
          return {
            ...product,
            quantity: item.quantity,
          };
        })
      );

      setCart(detailedCart);
      calculateTotalPrice(detailedCart);
    };

    loadCart();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = (productId, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === productId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);
    calculateTotalPrice(updatedCart);

    const token = localStorage.getItem("token");
    if (!token) {
      const localCart = updatedCart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(localCart));
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);

    const token = localStorage.getItem("token");
    if (!token) {
      const localCart = updatedCart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(localCart));
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <MainLayout>
      <Box sx={{ padding: 1 }}>
        <Typography variant="h4" sx={{ marginBottom: 1, padding: 1 }}>
          Shopping Cart
        </Typography>
        {cart.length > 0 ? (
          <Grid container spacing={1} sx={{ width: "100%" }}>
            <Grid item size={8}>
              {cart.map((item) => (
                <Paper
                  key={item._id}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl || "https://via.placeholder.com/100"}
                      alt={item.name}
                      sx={{ width: 100, height: 100, marginRight: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography variant="h6">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{ marginX: 1, minWidth: 20, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Grid>
            <Grid size={4}>
              <Paper
                sx={{
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 200,
                  position: "sticky",
                  top: 80,
                }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ marginBottom: 2 }}
                >
                  Total: ${totalPrice.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" align="center">
            Your cart is empty.
          </Typography>
        )}
      </Box>
    </MainLayout>
  );
};

export default CartPage;
