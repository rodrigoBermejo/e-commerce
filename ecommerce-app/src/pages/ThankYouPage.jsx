import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box sx={{ textAlign: "center", padding: 1 }}>
        <Typography variant="h4" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your order has been successfully processed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </Box>
    </MainLayout>
  );
};

export default ThankYouPage;
