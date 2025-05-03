import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCart, clearCart } from "../services/cartService";
import MainLayout from "../layout/MainLayout";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadCart = async () => {
      const cartData = await fetchCart();
      setCart(cartData.products || []);
      calculateTotal(cartData.products || []);
      setAuthChecked(true);
    };

    loadCart();
  }, [navigate]);

  const calculateTotal = (products) => {
    const totalAmount = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    setLoading(true);
    await clearCart();
    setLoading(false);
    navigate("/thank-you");
  };

  if (!authChecked) {
    return (
      <MainLayout>
        <Typography>Loading...</Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty. Please add products to your cart before
          proceeding.
        </Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Your Cart
              </Typography>
              {cart.map((product) => (
                <Box key={product._id} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    {product.name} x {product.quantity} - $
                    {product.price * product.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ padding: 1, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="body1">
                <strong>Total: </strong>${total.toFixed(2)}
              </Typography>

              <TextField
                label="Shipping Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={address}
                onChange={handleAddressChange}
                required
              />

              <TextField
                label="Payment Method (Credit Card)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                required
              />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ marginTop: 1 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={(loading || !address || !paymentMethod) && !token}
                >
                  {loading ? "Processing..." : "Confirm Order"}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}
    </MainLayout>
  );
};

export default CheckoutPage;
