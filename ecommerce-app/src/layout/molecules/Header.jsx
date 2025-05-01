import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../atoms/Logo";
import SearchBar from "../atoms/SearchBar";
import Icons from "../atoms/Icons";
import theme from "../../styles/theme";

const Header = ({ onMenuClick, onProfileClick }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.colors.headerBackground }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and Menu */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={onMenuClick}>
            <MenuIcon sx={{ color: theme.colors.primaryText }} />
          </IconButton>
          <Logo />
        </Box>

        {/* Search Bar */}
        <SearchBar />

        {/* Icons */}
        <Icons onProfileClick={onProfileClick} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
