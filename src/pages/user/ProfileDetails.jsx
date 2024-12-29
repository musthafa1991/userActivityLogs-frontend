import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../config/axiosConfig";

import UserProfileDetails from "../../components/user/UserProfileDetails";
import UpdateUserProfileForm from "../../components/user/UpdateUserProfileForm";
import { toast } from "react-toastify";

const ProfileDetail = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/user/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleUpdate = async (updatedProfile) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.put(`/user/profile/${user.id}`, updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axiosInstance.get(`/user/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
      toast.success("Profile updated successfully!");
      setOpenPopup(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenPopup(true)}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 14,
        }}
      >
        Update Profile
      </Button>
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <UserProfileDetails profile={profile} />
      </Box>

      <UpdateUserProfileForm
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        onUpdate={handleUpdate}
        currentProfile={profile}
      />
    </Box>
  );
};

export default ProfileDetail;
