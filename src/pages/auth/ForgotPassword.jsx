import React from "react";
import { Box, Typography } from "@mui/material";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <Box
        sx={{
          width: 400,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <ForgotPasswordForm />
      </Box>
    </Box>
  );
};

export default ForgotPassword;
