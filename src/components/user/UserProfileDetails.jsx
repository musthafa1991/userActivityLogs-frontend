import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const UserProfileDetails = ({ profile }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Avatar
          src={profile.profilePicture}
          alt={profile.name}
          sx={{ width: 64, height: 64, marginRight: 2 }}
        />
        <Typography variant="h5">{profile.name}</Typography>
      </Box>
      <Typography variant="body1">
        <strong>Email:</strong> {profile.email}
      </Typography>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Account Details:
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {profile.role}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {profile.status}
        </Typography>
        <Typography variant="body1">
          <strong>Account Created:</strong> {profile.createdAt}
        </Typography>
        <Typography variant="body1">
          <strong>Last Login:</strong> {profile.lastLogin}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information:
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {profile.phone || "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {profile.address || "N/A"}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfileDetails;
