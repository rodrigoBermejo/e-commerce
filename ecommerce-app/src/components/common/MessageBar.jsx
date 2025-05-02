import React from "react";
import { Snackbar, Alert } from "@mui/material";

const MessageBar = ({ snackbarOpen, handleSnackbarClose, snackbarMessage }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="success"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default MessageBar;
