import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <Container className="my-24" maxWidth="lg">
      {/* Sidebar */}
      <Box className="flex">
        <Box className="w-1/4 bg-gray-800 text-white p-4">
          <Typography variant="h6" className="mb-4">
            Admin Dashboard
          </Typography>
          <Button onClick={() => handleTabChange("announcements")} fullWidth variant="outlined" className="mb-2">
            Pengumuman
          </Button>
          <Button onClick={() => handleTabChange("schedules")} fullWidth variant="outlined" className="mb-2">
            Jadwal
          </Button>
          <Button onClick={() => handleTabChange("evaluations")} fullWidth variant="outlined">
            Nilai
          </Button>
        </Box>
        {/* Content Area */}
        <Box className="w-3/4 p-6">
          {/* Pengumuman Section */}
          {activeTab === "announcements" && (
            <motion.div className="p-4 bg-white shadow-md rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Typography variant="h5" className="font-semibold mb-4">
                Manage Pengumuman
              </Typography>
              <TextField label="Judul Pengumuman" fullWidth variant="outlined" className="mb-4" /> <TextField label="Deskripsi Pengumuman" fullWidth variant="outlined" multiline rows={4} className="mb-4" />
              <Button variant="contained" color="primary" className="mb-4">
                Simpan Pengumuman
              </Button>
            </motion.div>
          )}
          {/* Jadwal Section */}
          {activeTab === "schedules" && (
            <motion.div className="p-4 bg-white shadow-md rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Typography variant="h5" className="font-semibold mb-4">
                Manage Jadwal
              </Typography>
              <TextField label="Tanggal Seminar" fullWidth variant="outlined" className="mb-4" type="date" /> <TextField label="Waktu Seminar" fullWidth variant="outlined" className="mb-4" type="time" />
              <Button variant="contained" color="primary" className="mb-4">
                Simpan Jadwal
              </Button>
            </motion.div>
          )}
          {/* Nilai Section */}
          {activeTab === "evaluations" && (
            <motion.div className="p-4 bg-white shadow-md rounded-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Typography variant="h5" className="font-semibold mb-4">
                Manage Nilai
              </Typography>
              <TextField label="Nama Peserta" fullWidth variant="outlined" className="mb-4" /> <TextField label="Nilai" fullWidth variant="outlined" className="mb-4" />
              <TextField label="Komentar" fullWidth variant="outlined" multiline rows={4} className="mb-4" />
              <Button variant="contained" color="primary" className="mb-4">
                Simpan Nilai
              </Button>
            </motion.div>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default DashboardAdmin;
