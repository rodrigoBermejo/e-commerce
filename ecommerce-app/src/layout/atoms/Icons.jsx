import React from "react";
import { Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Icons = ({ onProfileClick }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton color="inherit">
        <ShoppingCartIcon />
      </IconButton>
      <IconButton color="inherit" onClick={onProfileClick}>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
};

export default Icons;
