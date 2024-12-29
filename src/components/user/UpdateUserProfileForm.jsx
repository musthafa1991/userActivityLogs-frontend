import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const UpdateUserProfileForm = ({ open, onClose, onUpdate, currentProfile }) => {
  const initialValues = {
    name: currentProfile.name || "",
    phone: currentProfile.phone || "",
    address: currentProfile.address || "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(
        /^\d{1,10}$/,
        "Phone number must be a number and at most 10 digits"
      )
      .max(10, "Phone number should not exceed 10 digits")
      .nullable(),
    address: Yup.string()
      .max(50, "Address should not exceed 50 characters")
      .nullable(),
  });

  const handleSubmit = (values) => {
    onUpdate(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                margin="normal"
                required
              />
              <Field
                name="email"
                as={TextField}
                label="Email"
                value={currentProfile.email}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="normal"
              />
              <Field
                name="phone"
                as={TextField}
                label="Phone"
                fullWidth
                margin="normal"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <Field
                name="address"
                as={TextField}
                label="Address"
                fullWidth
                margin="normal"
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />

              <Field
                name="status"
                as={TextField}
                label="Status"
                value={currentProfile.status}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="normal"
              />

              <Field
                name="role"
                as={TextField}
                label="Role"
                value={currentProfile.role}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="normal"
              />

              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserProfileForm;
