import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../styles/theme";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.colors.primaryText,
        color: "white",
        textAlign: "center",
        py: 2,
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} TecHub. Copyright, all rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
