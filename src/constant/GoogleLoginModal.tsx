import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const GoogleLoginModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  console.log("Modal open:", open); // Check if modal open state is being received properly
  const router = useRouter();

  const handleRedirectToProfile = () => {
    router.push("/user/profile");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, width: 400, margin: "auto", backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Oh! Anda login menggunakan Google ya?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Silakan perbaiki profile/biodata Anda agar lebih lengkap.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRedirectToProfile}>
          Perbaiki Profile
        </Button>
      </Box>
    </Modal>
  );
};

export default GoogleLoginModal;
