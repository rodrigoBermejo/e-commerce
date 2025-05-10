import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../styles/theme";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 1,
        width: "50%",
        px: 2,
        border: `1px solid ${theme.colors.primary}`,
      }}
    >
      <InputBase
        placeholder="Search products..."
        sx={{ flex: 1, color: theme.colors.primaryText }}
      />
      <IconButton type="submit" sx={{ p: 1 }}>
        <SearchIcon sx={{ color: theme.colors.primary }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
