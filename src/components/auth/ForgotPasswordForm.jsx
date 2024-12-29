import React from "react";
import { useFormik } from "formik";

import axiosInstance from "../../config/axiosConfig";

import { TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          "/auth/forgot-password",
          values
        );
        console.log("Password Reset Request:", response.data);
        toast.success("Password reset link sent to your email!");
      } catch (error) {
        console.error(
          "Forgot Password Error:",
          error.response?.data || error.message
        );
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <TextField
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
