import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Menu, MenuItem } from "@mui/material";
import Header from "./molecules/Header";
import Footer from "./molecules/Footer";
import { fetchCategories } from "../services/categoryService";
import { fetchCart } from "../services/cartService";
import theme from "../styles/theme";
import { useCart } from "../context/CartContext";

const MainLayout = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  //const [cartCount, setCartCount] = useState(0);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    const loadCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const apiCart = await fetchCart();
          setCart(apiCart.products);
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      } else {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
      }
    };

    loadCategories();
    loadCart();
  }, [setCart]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <Box sx={{ backgroundColor: theme.colors.background }}>
      <Header
        onMenuClick={handleMenuOpen}
        onProfileClick={handleProfileMenuOpen}
        cartCount={cart.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        )}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            component={Link}
            to={`/category/${category._id}`}
            onClick={handleMenuClose}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem
          onClick={handleProfileMenuClose}
          component={Link}
          to={`/login`}
        >
          Login
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
        <MenuItem
          onClick={handleProfileMenuClose}
          component={Link}
          to={`/login`}
        >
          Logout
        </MenuItem>
      </Menu>
      <Container sx={{ mt: 4, minHeight: "100vh" }}>{children}</Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
