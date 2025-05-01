import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Menu, MenuItem } from "@mui/material";
import Header from "./molecules/Header";
import Footer from "./molecules/Footer";
import { fetchCategories } from "../services/categoryService";
import theme from "../styles/theme";

const MainLayout = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

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
    <Box sx={{ backgroundColor: theme.colors.background, minHeight: "100vh" }}>
      <Header
        onMenuClick={handleMenuOpen}
        onProfileClick={handleProfileMenuOpen}
      />

      {/* Categories Menu */}
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

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>Login</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Main Content */}
      <Container sx={{ mt: 4 }}>{children}</Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
