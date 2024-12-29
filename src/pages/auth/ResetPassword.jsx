import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          `/auth/reset-password/${token}`,
          { password: values.newPassword }
        );

        if (response.data.success) {
          toast.success("Password reset successful!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(response.data.message || "Password reset failed!");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Card
        elevation={4}
        sx={{
          width: { xs: "90%", sm: "400px" },
          padding: 2,
          margin: "auto",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Reset Password
          </Typography>
          {error && (
            <Box textAlign="center" sx={{ marginBottom: 2 }}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              fullWidth
              margin="normal"
              size="small"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              fullWidth
              margin="normal"
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Reset Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
