import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AlertKelayakanInfo from "@/utils/AlertKelayakanInfo";
import AlertKelayakanSuccess from "@/utils/AlertKelayakanSuccess";
import { useSession, getSession } from "next-auth/react";

import { saveCekKelayakanTA } from "@/lib/firebase/service";

const CekKelayakanTA = () => {
  const { data }: any = useSession();
  const [kartuBimbingan, setKartuBimbingan] = useState("");
  const [surat, setSurat] = useState("");
  const [proposalTA, setProposalTA] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isKelayakanValid, setIsKelayakanValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Tambahkan state untuk successMessage

  const handleSubmit = async () => {
    if (kartuBimbingan && surat && proposalTA) {
      setIsLoading(true);
      try {
        const session: any = await getSession();

        if (!session || !session.user || !session.user.nim) {
          setErrorMessage("User ID tidak ditemukan. Pastikan Anda sudah login.");
          setIsLoading(false);
          return;
        }

        const nim = session.user.nim;

        const result = await saveCekKelayakanTA({
          kartuBimbingan,
          surat,
          proposalTA,
          nim,
        });

        if (result.success) {
          setIsKelayakanValid(true);
          setSuccessMessage("Data cek kelayakan TA berhasil dikirim!"); // Menyimpan success message
          setErrorMessage(""); // Reset error message
        } else {
          setIsKelayakanValid(false);
          setSuccessMessage(""); // Reset success message jika gagal
          setErrorMessage(result.error || "Gagal mengirimkan data ke Firebase.");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Gagal mengirimkan data ke Firebase.");
        setSuccessMessage(""); // Reset success message saat ada error
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsKelayakanValid(false);
      setSuccessMessage(""); // Reset success message saat input tidak lengkap
      setErrorMessage("Harap lengkapi semua input.");
    }
  };

  return (
    <main className="my-24 p-4">
      <Grid container spacing={2} className="bg-slate-500 p-4 rounded-md">
        <Grid size={3} className="bg-white p-4 rounded h-full text-center flex flex-col items-center justify-center">
          <Container className="rounded-full flex items-center justify-center">
            <Image src="/images/profile.png" alt="profile" width={200} height={200} className="rounded-full border-4 border-black" />
          </Container>
          <Container className="mt-4 p-4 text-black font-semibold bg-gray-100 rounded-lg">
            <Typography variant="h6" className="text-center">
              {data?.user?.fullname}
            </Typography>
            <Typography className="text-center">{data?.user?.nim}</Typography>
            <Typography className="text-center">{data?.user?.jurusan} | S1</Typography>
          </Container>
          <AlertKelayakanInfo message="Silahkan klik button cek kelayakan untuk melakukan pengecekan kelayakan TA" />
          <Container className="p-4 text-black font-semibold bg-gray-100 rounded-lg">
            <AlertKelayakanSuccess />
          </Container>
        </Grid>

        <Grid size={9} container direction="column" spacing={2} className="bg-white p-4 rounded">
          {/* Error Message */}
          {errorMessage && <Container className="mb-4 p-4 bg-red-100 rounded-md text-red-800">{errorMessage}</Container>}

          {/* Success Message */}
          {successMessage && <Container className="mb-4 p-4 bg-green-100 rounded-md text-green-800">{successMessage}</Container>}

          {/* Kelayakan Valid */}
          {isKelayakanValid && <Container className="mb-4 p-4 bg-blue-100 rounded-md text-blue-800">Kelayakan TA Anda sudah valid.</Container>}

          {/* Input Sections */}
          <Grid size={12} className="bg-gray-100 p-4 rounded">
            <Typography variant="h6" className="mb-2">
              Input Kartu Bimbingan
            </Typography>
            <input type="text" value={kartuBimbingan} onChange={(e) => setKartuBimbingan(e.target.value)} className="w-full bg-white p-4 rounded" />
          </Grid>

          <Grid size={12} className="bg-gray-100 p-4 rounded">
            <Typography variant="h6" className="mb-2">
              Input Surat
            </Typography>
            <input type="text" value={surat} onChange={(e) => setSurat(e.target.value)} className="w-full bg-white p-4 rounded" />
          </Grid>

          <Grid size={12} className="bg-gray-100 p-4 rounded">
            <Typography variant="h6" className="mb-2">
              Input Proposal TA
            </Typography>
            <input type="text" value={proposalTA} onChange={(e) => setProposalTA(e.target.value)} className="w-full bg-white p-4 rounded" />
          </Grid>

          {/* Submit Button */}
          <Grid size={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default CekKelayakanTA;
