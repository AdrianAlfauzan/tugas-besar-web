import React, { useState } from "react";
import { motion } from "framer-motion";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import AlertSuccess from "@/utils/AlertSuccess";
import AlertError from "@/utils/AlertError";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

// MY UTILS
import Loader from "@/utils/Loader";
import { validateNumber } from "@/utils/ValidateNumber";
import validateEmail from "@/utils/ValidateEmail";
import { validateString } from "@/utils/ValidateString";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (event: any) => {
    event.preventDefault();
    setShowErrorAlert(false);
    setIsLoading(true);

    if (!validateNumber(nim)) {
      setIsLoading(false);
      showError("NIM tidak valid.");
      return;
    }

    if (!validateEmail(email)) {
      setIsLoading(false);
      showError("Email tidak valid.");
      return;
    }

    if (!validateString(jurusan)) {
      setIsLoading(false);
      showError("Jurusan hanya boleh berisi huruf.");
      return;
    }

    const data = { fullname, nim, jurusan, email, password };

    setTimeout(async () => {
      try {
        const result = await fetch("/api/ApiRegister", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (result.status === 200) {
          setShowAlert(true);
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        } else {
          const responseData = await result.json();
          if (responseData.message === "NIM sudah terdaftar") {
            showError("NIM sudah terdaftar.");
          } else if (responseData.message === "Email sudah terdaftar") {
            showError("Email sudah terdaftar.");
          } else {
            showError("Terjadi kesalahan.");
          }
        }
      } catch (error) {
        console.error("Kesalahan Selama Registrasi:", error);
        showError("Terjadi kesalahan koneksi.");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setShowErrorAlert(true);
    setTimeout(() => {
      setShowErrorAlert(false);
    }, 3000);
  };

  const handleRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  const isFormValid = fullname && email && password && nim && jurusan;

  return (
    <motion.div className="grid grid-cols-1 p-6 h-screen justify-center bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-900" initial="hidden" animate="visible" exit="hidden" variants={fadeInVariants}>
      <div className="max-w-full  flex items-center p-8 justify-center bg-white rounded-lg shadow-lg">
        <motion.div className="border-r border-b  w-full lg:w-1/2 h-full hidden lg:block">
          <motion.div
            className="w-full h-full "
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 5,
              repeatType: "reverse",
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image src="/images/students.png" alt="Students" layout="fill" objectFit="cover" className="rounded-l-lg" />
          </motion.div>
        </motion.div>

        <motion.div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-10" initial="hidden" animate="visible" variants={fadeInVariants}>
          <div className="text-center mb-8">
            <Typography variant="h5" className="text-blue-900 font-bold">
              Welcome to My Kampus
            </Typography>
            <p className="text-gray-500">Hi Buddy! Welcome to My Kampus.</p>
          </div>

          <form className="space-y-4 w-full" onSubmit={handleRegister}>
            <TextField id="fullname" label="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} fullWidth />
            <TextField id="nim" label="NIM" value={nim} onChange={(e) => setNim(e.target.value)} fullWidth />
            <TextField id="jurusan" label="Jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} fullWidth />
            <TextField id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />

            <Stack direction="row" spacing={2}>
              <LoadingButton loading={isLoading} variant="contained" className="w-full bg-blue-700 hover:bg-blue-800 text-white" type="submit" disabled={!isFormValid}>
                Register
              </LoadingButton>
            </Stack>
          </form>

          <Typography variant="body2" className="text-center mt-4">
            Have an account?{" "}
            <Button onClick={handleRedirect} variant="outlined" className="text-blue-700">
              {redirecting ? <Loader /> : "Login Here"}
            </Button>
          </Typography>

          {showAlert && (
            <motion.div className="fixed top-5 left-5 z-50" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
              <AlertSuccess message="Registration Successful!" />
            </motion.div>
          )}

          {showErrorAlert && (
            <motion.div className="fixed top-5 right-5 z-50" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
              <AlertError message={errorMessage} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterView;
