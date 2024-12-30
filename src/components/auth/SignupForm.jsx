import React from "react";
import { useNavigate } from "react-router-dom";
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

import axiosInstance from "../../config/axiosConfig";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/auth/signup", values);
        if (response.data.success) {
          toast.success(response.data.message || "Registration successful!");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed!");
      }
    },
  });

  return (
    <>
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
            Signup
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
              size="small"
            />
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
              Signup
            </Button>
          </Box>
          <Box textAlign="center" marginTop={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover" sx={{ fontWeight: "bold" }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SignupForm;
