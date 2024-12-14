import React, { useState, ChangeEvent } from "react";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import AlertKelayakanSuccess from "@/utils/AlertKelayakanSuccess";
import AlertKelayakanInfo from "@/utils/AlertKelayakanInfo";
import AlertFilledInfo from "@/utils/AlertFilledInfo";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CekKelayakanTA = () => {
  const [kartuBimbinganFiles, setKartuBimbinganFiles] = useState<File[]>([]);
  const [suratFiles, setSuratFiles] = useState<File[]>([]);
  const [proposalTAFiles, setProposalTAFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, uploadType: "kartuBimbingan" | "surat" | "proposalTA") => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      switch (uploadType) {
        case "kartuBimbingan":
          setKartuBimbinganFiles((prev) => [...prev, ...files]);
          break;
        case "surat":
          setSuratFiles((prev) => [...prev, ...files]);
          break;
        case "proposalTA":
          setProposalTAFiles((prev) => [...prev, ...files]);
          break;
        default:
          break;
      }
    }
  };

  const handleFileClick = (file: File) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  // Fungsi untuk mengirimkan file
  const handleSubmit = () => {
    const formData = new FormData();

    // Menambahkan file ke FormData
    kartuBimbinganFiles.forEach((file) => formData.append("kartuBimbinganFiles[]", file));
    suratFiles.forEach((file) => formData.append("suratFiles[]", file));
    proposalTAFiles.forEach((file) => formData.append("proposalTAFiles[]", file));

    // Mengirimkan data (misalnya menggunakan fetch ke API)
    // Contoh: POST request menggunakan fetch
    fetch("/upload-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload berhasil:", data);
        // Anda bisa menambahkan notifikasi atau mengarahkan pengguna setelah upload berhasil
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengirim data:", error);
      });
  };

  return (
    <main className="my-24 p-4">
      <Grid container spacing={2} className="bg-slate-500 p-4 rounded-md">
        <Grid size={3} className="bg-white p-4 rounded h-full text-center flex flex-col items-center justify-center">
          <Container className=" rounded-full flex items-center justify-center">
            <Image src="/images/profile.png" alt="profile" width={200} height={200} className="rounded-full border-4 border-black" />
          </Container>
          <Container className="mt-4 p-4 text-black font-semibold bg-gray-100 rounded-lg">
            <Typography variant="h6" className="text-center">
              Adrian Musa Alfauzan
            </Typography>
            <Typography className="text-center">2250081020</Typography>
            <Typography className="text-center">Teknik Informatika | S1</Typography>
          </Container>
          <AlertKelayakanInfo message="Silahkan klik button cek kelayakan untuk melakukan pengecekan kelayakan TA" />
          <Container className="p-4 text-black font-semibold bg-gray-100 rounded-lg">
            <AlertKelayakanSuccess />
          </Container>
        </Grid>
        <Grid size={9} container direction="column" spacing={2} className="bg-white p-4 rounded">
          <AlertFilledInfo message="Harap lengkapi data dengan benar dan upload sesuai kebutuhan. Silahkan cek kembali ketika melakukan upload agar tidak terjadi kesalahan!" />
          {/* Upload Sections */}
          {/* Upload Kartu Bimbingan */}
          <Grid size={12} className="bg-gray-100 p-4 rounded ">
            <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
              Upload Kartu Bimbingan
              <VisuallyHiddenInput type="file" onChange={(e) => handleFileUpload(e, "kartuBimbingan")} multiple accept=".pdf,.png,.jpg,.jpeg" />
            </Button>
            <Grid container spacing={2} className="rounded my-4">
              <Grid size={4} className="bg-red-200 p-4 rounded">
                <Typography variant="h6" className="rounded-sm">
                  Uploaded Files Kartu Bimbingan :
                </Typography>
              </Grid>
              <Grid size={8} className="bg-red-200 rounded flex items-center justify-center">
                <Typography variant="h6" className="p-2">
                  {kartuBimbinganFiles.map((file, index) => (
                    <Typography key={`kartu-${index}`} variant="subtitle1" className="cursor-pointer underline text-blue-500 " onClick={() => handleFileClick(file)}>
                      {file.name}
                    </Typography>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Upload Surat */}
          <Grid size={12} className="bg-gray-100 p-4 rounded ">
            <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
              Upload Surat
              <VisuallyHiddenInput type="file" onChange={(e) => handleFileUpload(e, "surat")} multiple accept=".pdf,.png,.jpg,.jpeg" />
            </Button>
            <Grid container spacing={2} className="rounded my-4">
              <Grid size={4} className="bg-red-200 p-4 rounded">
                <Typography variant="h6" className="rounded-sm">
                  Uploaded Surat :
                </Typography>
              </Grid>
              <Grid size={8} className="bg-red-200 rounded flex items-center justify-center">
                <Typography variant="h6" className="p-2">
                  {suratFiles.map((file, index) => (
                    <Typography key={`surat-${index}`} variant="subtitle1" className="cursor-pointer underline text-blue-500 " onClick={() => handleFileClick(file)}>
                      {file.name}
                    </Typography>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Upload Proposal TA */}
          <Grid size={12} className="bg-gray-100 p-4 rounded ">
            <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
              Upload Proposal
              <VisuallyHiddenInput type="file" onChange={(e) => handleFileUpload(e, "proposalTA")} multiple accept=".pdf,.png,.jpg,.jpeg" />
            </Button>
            <Grid container spacing={2} className="rounded my-4">
              <Grid size={4} className="bg-red-200 p-4 rounded">
                <Typography variant="h6" className="rounded-sm">
                  Uploaded Proposal :
                </Typography>
              </Grid>
              <Grid size={8} className="bg-red-200 rounded flex items-center justify-center">
                <Typography variant="h6" className="p-2">
                  {proposalTAFiles.map((file, index) => (
                    <Typography key={`proposal-${index}`} variant="subtitle1" className="cursor-pointer underline text-blue-500 " onClick={() => handleFileClick(file)}>
                      {file.name}
                    </Typography>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid size={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Submit All Files
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Preview Dialog */}
      <Dialog open={!!previewFile} onClose={handleClosePreview} maxWidth="lg" fullWidth>
        <DialogContent className="flex items-center justify-center">
          {previewFile?.type.startsWith("image/") ? (
            <Image src={URL.createObjectURL(previewFile)} alt={previewFile.name} width={10} height={10} className="w-[50%] h-[50%]" />
          ) : previewFile?.type === "application/pdf" ? (
            <iframe src={URL.createObjectURL(previewFile)} title={previewFile.name} className="w-full h-[80vh]" frameBorder="0" />
          ) : (
            <Typography variant="body1">Unsupported file format.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CekKelayakanTA;
