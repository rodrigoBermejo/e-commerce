import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Icons = ({ onProfileClick, cartCount }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton color="inherit" onClick={() => navigate("/cart")}>
        <Badge badgeContent={cartCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit" onClick={onProfileClick}>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
};

export default Icons;
