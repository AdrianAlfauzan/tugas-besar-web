import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { savePendaftaran } from "@/lib/firebase/service"; // Mengimpor fungsi savePendaftaran dari service

import AlertSuccess from "@/utils/AlertSuccess";
import AlertError from "@/utils/AlertError";
import { ValidasiXss } from "@/utils/ValidateXss";

const Pendaftaran = () => {
  const [judulProposal, setJudulProposal] = useState("");
  const [temaProposal, setTemaProposal] = useState("");
  const [statusPembayaran, setStatusPembayaran] = useState("");
  const [selectedGrid, setSelectedGrid] = useState<string | null>(null);

  // State for handling alerts
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertError, setAlertError] = useState<string | null>(null);

  // Menyimpan dan mengambil data dari localStorage saat mount
  useEffect(() => {
    const storedJudulProposal = localStorage.getItem("judulProposal");
    const storedTemaProposal = localStorage.getItem("temaProposal");
    const storedStatusPembayaran = localStorage.getItem("statusPembayaran");

    if (storedJudulProposal) setJudulProposal(storedJudulProposal);
    if (storedTemaProposal) setTemaProposal(storedTemaProposal);
    if (storedStatusPembayaran) setStatusPembayaran(storedStatusPembayaran);
  }, []);

  // Fungsi untuk mengirim data ke Firestore
  const handleSubmit = async (field: string) => {
    let data: any;
    if (field === "judulProposal") {
      data = { judulProposal };
    } else if (field === "temaProposal") {
      data = { temaProposal };
    } else if (field === "statusPembayaran") {
      data = { statusPembayaran };
    }

    // Validasi XSS
    if (!ValidasiXss(data[field])) {
      setAlertError("Input mengandung karakter yang tidak valid! XSS terdeteksi.");
      setTimeout(() => setAlertError(null), 3000);
      return; // Jangan lanjutkan pengiriman data
    }

    const response = await savePendaftaran(data);
    if (response.success) {
      console.log("Data berhasil disimpan!");
      setAlertSuccess("Data berhasil disimpan!");
      setTimeout(() => setAlertSuccess(null), 3000);

      // Menyimpan data ke localStorage
      localStorage.setItem("judulProposal", judulProposal);
      localStorage.setItem("temaProposal", temaProposal);
      localStorage.setItem("statusPembayaran", statusPembayaran);

      setSelectedGrid(null);
    } else {
      console.error("Gagal menyimpan data:", response.error);
      setAlertError("Gagal menyimpan data!");
      setTimeout(() => setAlertError(null), 3000);
    }
  };

  // Animasi grid
  const gridAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="my-24 px-6">
      {/* Hero Section */}
      <motion.div className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h1 className="text-5xl font-extrabold">Pendaftaran Tugas Akhir</h1>
        <p className="text-xl mt-4">Buat dan kelola proposal anda dengan baik</p>
      </motion.div>
      {/* Alerts */}
      {alertSuccess && <AlertSuccess message={alertSuccess} />}
      {alertError && <AlertError message={alertError} />}
      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-6">
        <motion.div className="p-6 bg-white rounded-lg shadow-md cursor-pointer" variants={gridAnimation} initial="hidden" animate="visible" onClick={() => setSelectedGrid("statusPembayaran")} layoutId="statusPembayaran">
          <h3>Status Pembayaran</h3>
          <p>{statusPembayaran || "Belum dipilih"}</p>
        </motion.div>

        <motion.div className="p-6 bg-white rounded-lg shadow-md cursor-pointer" variants={gridAnimation} initial="hidden" animate="visible" onClick={() => setSelectedGrid("temaProposal")} layoutId="temaProposal">
          <h3>Tema Proposal</h3>
          <p>{temaProposal || "Belum dipilih"}</p>
        </motion.div>

        <motion.div className="p-6 bg-white rounded-lg shadow-md cursor-pointer" variants={gridAnimation} initial="hidden" animate="visible" onClick={() => setSelectedGrid("judulProposal")} layoutId="judulProposal">
          <h3>Judul Proposal</h3>
          <p>{judulProposal || "Belum dipilih"}</p>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedGrid && (
        <motion.div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <motion.div className="modal-content bg-white p-8 rounded-lg w-96" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.3 }} layoutId={selectedGrid}>
            <h2 className="text-center text-2xl mb-4">Silahkan Input!</h2>
            {selectedGrid === "judulProposal" && <TextField label="Judul Proposal" variant="outlined" value={judulProposal} onChange={(e) => setJudulProposal(e.target.value)} fullWidth margin="normal" />}
            {selectedGrid === "temaProposal" && <TextField label="Tema Proposal" variant="outlined" value={temaProposal} onChange={(e) => setTemaProposal(e.target.value)} fullWidth margin="normal" />}
            {selectedGrid === "statusPembayaran" && (
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Status Pembayaran</InputLabel>
                <Select value={statusPembayaran} onChange={(e) => setStatusPembayaran(e.target.value)} label="Status Pembayaran">
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Not Yet">Not Yet</MenuItem>
                </Select>
              </FormControl>
            )}
            <div className="flex justify-between mt-6">
              <Button onClick={() => setSelectedGrid(null)} color="secondary" variant="contained">
                Batal
              </Button>
              <Button onClick={() => handleSubmit(selectedGrid)} color="primary" variant="contained" disabled={selectedGrid === "judulProposal" ? !judulProposal : selectedGrid === "temaProposal" ? !temaProposal : !statusPembayaran}>
                Submit
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Pendaftaran;
