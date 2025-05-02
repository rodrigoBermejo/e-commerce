import React, { useState, useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import { fetchProducts } from "../services/productService";
import { addProductToCart, fetchCart } from "../services/cartService";
import MainLayout from "../layout/MainLayout";
import MessageBar from "../components/common/MessageBar";
import BannerCarousel from "../components/common/BannerCarousel";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const banners = [
    "./assets/img/placeholder.png",
    "https://placehold.co/1500x300/orange/white?text=Banner",
    "https://placehold.co/1500x300/green/white?text=Banner",
    "https://placehold.co/1500x300/blue/white?text=Banner",
    "https://placehold.co/1500x300/black/white?text=Banner",
    "https://placehold.co/1500x300/gray/white?text=Banner",
    "https://placehold.co/1500x300/purple/white?text=Banner",
    "https://placehold.co/1500x300/pink/white?text=Banner",
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadCart = async () => {
      const cartData = await fetchCart();
      setCart(cartData.products || []);
    };

    loadProducts();
    loadCart();
  }, []);

  const handleAddToCart = async (product) => {
    await addProductToCart(product, cart, setCart, setSnackbarMessage);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainLayout>
      <BannerCarousel banners={banners} />
      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}

      <MessageBar
        {...{ snackbarOpen, handleSnackbarClose, snackbarMessage }}
      ></MessageBar>
    </MainLayout>
  );
};

export default Home;
