import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCart, clearCart } from "../services/cartService";
import MainLayout from "../layout/MainLayout";
import {
  getShippingAddressesByUserId,
  createShippingAddress,
} from "../services/shippingAddressService";
import { getUserIdFromToken } from "../utils/getDecodedToken";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    _id: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    type: "Credit Card",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const userId = getUserIdFromToken();

    const loadData = async () => {
      try {
        const cartData = await fetchCart();
        const addresses = await getShippingAddressesByUserId(userId);

        setCart(cartData);
        setShippingAddresses(addresses || []);

        if (addresses?.length > 0) {
          setSelectedAddressId(addresses[0]._id);
        }

        setAuthChecked(true);

        // Agregar opción simulada de PayPal
        setPaymentMethods((prev) => {
          const alreadyHasPaypal = prev.some(
            (method) => method._id === "paypal"
          );
          if (alreadyHasPaypal) return prev;

          return [
            ...prev,
            {
              _id: "paypal",
              type: "PayPal",
              cardHolder: "PayPal Account",
              cardNumber: "N/A",
              expiry: "N/A",
            },
          ];
        });
      } catch (err) {
        console.error("Failed to load data:", err);
        setAuthChecked(true);
      }
    };

    loadData();
  }, [navigate, token]);

  const handleAddAddress = async () => {
    const requiredFields = [
      "address",
      "city",
      "state",
      "postalCode",
      "country",
    ];
    const emptyFields = requiredFields.filter((f) => !newAddress[f].trim());

    if (emptyFields.length > 0) {
      setErrors({ form: "All address fields are required." });
      return;
    }

    const userId = getUserIdFromToken();
    const created = await createShippingAddress(
      { userId, ...newAddress },
      token
    );

    setShippingAddresses((prev) => [...prev, created]);
    setSelectedAddressId(created._id);
    setNewAddress({
      _id: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    setShowAddressForm(false);
    setErrors({});
  };

  const handleAddPaymentMethod = () => {
    if (
      !newPayment.cardHolder ||
      !newPayment.cardNumber ||
      !newPayment.expiry
    ) {
      setErrors({ payment: "All payment fields are required." });
      return;
    }

    const fakeId = Math.random().toString(36).substr(2, 9); // Simula un _id
    const newMethod = { ...newPayment, _id: fakeId };

    setPaymentMethods((prev) => [...prev, newMethod]);
    setSelectedPaymentId(newMethod._id);
    setNewPayment({
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      type: "Credit Card",
    });
    setShowPaymentForm(false);
    setErrors({});
  };

  const handleCheckout = async () => {
    const newErrors = {};
    if (!selectedAddressId)
      newErrors.address = "Please select a shipping address.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!selectedPaymentId)
      newErrors.payment = "Please select a payment method.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Aquí simulamos la compra y redirigimos sin enviar datos a una API.
    await clearCart();
    // Esta es la parte que simula el proceso y redirige al "thank-you" directamente.
    setTimeout(() => {
      setLoading(false); // Detenemos el loading
      navigate("/thank-you"); // Redirige a la página de agradecimiento
    }, 1000); // Simulamos un pequeño retraso de 1 segundo
  };

  if (!authChecked || cart === null) {
    return (
      <MainLayout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          {/* Cart */}
          <Card>
            <CardHeader title="Your Cart" />
            <CardContent>
              {cart.products.map((item, index) => {
                const product = item.productId;
                return (
                  <Box key={item._id}>
                    <Typography>
                      {product.name} x {item.quantity} = $
                      {(product.price * item.quantity).toFixed(2)}
                    </Typography>
                    {index < cart.products.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                );
              })}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Shipping Address" />
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Select a shipping address
                </FormLabel>
                <RadioGroup
                  value={selectedAddressId}
                  onChange={(e) => setSelectedAddressId(e.target.value)}
                >
                  {shippingAddresses
                    .filter((addr) => addr && addr._id)
                    .map((addr) => (
                      <FormControlLabel
                        key={addr._id}
                        value={addr._id}
                        control={<Radio />}
                        label={`${addr.address}, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}`}
                      />
                    ))}
                </RadioGroup>
                <br />
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => setShowAddressForm(true)}
                >
                  Add New Address
                </Button>
              </FormControl>
              {errors.address && (
                <Typography color="error" variant="body2">
                  {errors.address}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          {/* Payment */}
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Payment Method" />
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Select a payment method
                </FormLabel>
                <RadioGroup
                  value={selectedPaymentId}
                  onChange={(e) => setSelectedPaymentId(e.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <FormControlLabel
                      key={method._id}
                      value={method._id}
                      control={<Radio />}
                      label={
                        method.type === "PayPal"
                          ? "PayPal"
                          : `${method.type} ending in ${method.cardNumber.slice(
                              -4
                            )} - ${method.cardHolder}`
                      }
                    />
                  ))}
                </RadioGroup>
                <br />
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => setShowPaymentForm(true)}
                >
                  Add New Payment Method
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedPaymentId("paypal")}
                >
                  Pay with PayPal
                </Button>
              </FormControl>
              {errors.payment && (
                <Typography color="error" variant="body2">
                  {errors.payment}
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Order Summary" />
            <CardContent>
              <Typography variant="h6">
                Total: ${cart?.totalPrice?.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog to add new address */}
      <Dialog open={showAddressForm} onClose={() => setShowAddressForm(false)}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          {["address", "city", "state", "postalCode", "country"].map(
            (field) => (
              <TextField
                key={field}
                label={field[0].toUpperCase() + field.slice(1)}
                value={newAddress[field]}
                fullWidth
                margin="dense"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, [field]: e.target.value })
                }
              />
            )
          )}
          {errors.form && <Typography color="error">{errors.form}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddressForm(false)}>Cancel</Button>
          <Button onClick={handleAddAddress}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to add new payment method */}
      <Dialog open={showPaymentForm} onClose={() => setShowPaymentForm(false)}>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Holder"
            value={newPayment.cardHolder}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewPayment({ ...newPayment, cardHolder: e.target.value })
            }
          />
          <TextField
            label="Card Number"
            value={newPayment.cardNumber}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewPayment({ ...newPayment, cardNumber: e.target.value })
            }
          />
          <TextField
            label="Expiry Date"
            placeholder="MM/YY"
            value={newPayment.expiry}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setNewPayment({ ...newPayment, expiry: e.target.value })
            }
          />
          {errors.payment && (
            <Typography color="error">{errors.payment}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentForm(false)}>Cancel</Button>
          <Button onClick={handleAddPaymentMethod}>Save</Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default CheckoutPage;
