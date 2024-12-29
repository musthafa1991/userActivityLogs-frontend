import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import * as Yup from "yup";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../config/axiosConfig";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/auth/login", values);

        if (response.data.success) {
          const { token } = response.data;

          const decodedToken = jwtDecode(token);
          const userData = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.isAdmin ? "admin" : "user",
          };

          login(userData);
          localStorage.setItem("token", token);

          toast.success("Login Successful!", {
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            toastId: "login-success",
          });
          setTimeout(() => navigate("/"), 1500);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed!", {
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      }
    },
  });

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover={false}
        style={{ zIndex: 9999 }}
      />
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
            Login
          </Typography>
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
              size="small"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
              Login
            </Button>
          </Box>
          <Box textAlign="center" marginTop={2}>
            <Link
              href="/forgot-password"
              underline="hover"
              sx={{ fontSize: "0.875rem" }}
            >
              Forgot Password?
            </Link>
          </Box>
          <Box textAlign="center" marginTop={1}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                underline="hover"
                sx={{ fontWeight: "bold" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
