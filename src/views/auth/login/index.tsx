import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import AlertSuccess from "@/utils/AlertSuccess";
import AlertError from "@/utils/AlertError"; // Assuming you have this for error alerts
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

// MY UTILS
import Loader from "@/utils/Loader";

const LoginView: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error message state
  const router = useRouter();

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setIsLoading(true);

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      setTimeout(async () => {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl,
        });

        if (!res?.error) {
          setIsLoading(false);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false); // Hide the success alert after a timeout
            router.push(callbackUrl);
          }, 2000);
        } else {
          setIsLoading(false);
          setShowAlert(false);
          showError("Email atau password salah!"); // Show error alert with message
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showError("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const showError = (message: string) => {
    setErrorMessage(message); // Set the error message
    setShowErrorAlert(true); // Show error alert
    setTimeout(() => {
      setShowErrorAlert(false); // Hide error alert after 3 seconds
    }, 3000);
  };

  const handleGoogle = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoadingGoogle(true);

    try {
      await signIn("google", { callbackUrl });

      // Show success alert after Google login
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // Hide the success alert after 2 seconds
        router.push(callbackUrl); // Redirect after the alert is hidden
      }, 2000);
    } catch (error) {
      console.error(error);
      showError("Gagal masuk dengan Google. Silakan coba lagi.");
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleRedirect = (): void => {
    setRedirecting(true);
    setTimeout(() => {
      router.push("/auth/register");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 p-6 h-screen justify-center bg-gray-900">
      <div className="flex justify-center items-center h-full">
        <motion.div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <div className="animate-spin flex items-center">
              <Image src="/icon/react2.png" alt="Python Icon" width={50} height={50} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">My Kampus</h1>
            </div>
          </div>
          <div className="text-center mb-6">
            <Typography variant="h5" className="text-gray-800">
              Welcome to Login
            </Typography>
            <p className="text-gray-500">Hi! Please enter your details</p>
            {errorMessage && <p className="text-red-500 font-bold text-2xl">{errorMessage}</p>}
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                className="rounded-full"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "orange" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "blue" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiInputLabel-root": { color: "orange" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "green" },
                }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Button variant="contained" fullWidth className="py-2 px-4 bg-blue-600 text-white font-medium rounded-full" type="submit">
                {isLoading ? <Loader size={25} /> : "Login"}
              </Button>
            </motion.div>
          </form>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
            <Button onClick={handleGoogle} variant="outlined" className="w-full py-2 px-4 text-black font-medium flex items-center justify-center gap-2 mt-4">
              {isLoadingGoogle ? (
                <Loader size={25} />
              ) : (
                <>
                  <Image src="/icon/googleIcon.png" alt="Google Icon" width={20} height={20} /> Login with Google
                </>
              )}
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
            <Typography variant="body2" className="flex items-center gap-2 text-center justify-center text-gray-500 mt-4">
              Haven&apos;t an account?
              <Button onClick={handleRedirect} variant="outlined" className="text-blue-600">
                {redirecting ? <Loader /> : "Here"}
              </Button>
            </Typography>
          </motion.div>
          {showAlert && (
            <motion.div className="fixed top-5 left-5 z-50" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
              <AlertSuccess message="Login Success" />
            </motion.div>
          )}
          {showErrorAlert && (
            <motion.div className="fixed top-5 right-5 z-50" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4 }}>
              <AlertError message={errorMessage} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginView;
