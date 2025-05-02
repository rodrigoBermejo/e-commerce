import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../atoms/Logo";
import SearchBar from "../atoms/SearchBar";
import Icons from "../atoms/Icons";
import theme from "../../styles/theme";
import CategoryDrawer from "../molecules/CategoryDrawer";

const Header = ({ onProfileClick, cartCount }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.colors.headerBackground }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: theme.colors.primaryText }} />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo sx={{ marginLeft: 2 }} />
            </Link>
          </Box>
          <SearchBar />
          <Icons onProfileClick={onProfileClick} cartCount={cartCount} />
        </Toolbar>
      </AppBar>
      <CategoryDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
    </>
  );
};

export default Header;
