import React from "react";
import { Box, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: 2,
        }}
      >
        Welcome Back
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default Login;
