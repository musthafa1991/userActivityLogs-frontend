import React from "react";
import SignupForm from "../../components/auth/SignupForm";
import { Box, Typography } from "@mui/material";

const Signup = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: "#f5f5f5", padding: 2 }}
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
        Create an Account
      </Typography>
      <SignupForm />
    </Box>
  );
};

export default Signup;
