import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import AlertSuccess from "@/utils/AlertSuccess";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

// MY UTILS
import Loader from "@/utils/Loader";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const data = {
      fullname: event.target.fullname.value,
      email: email, // Use the state for email
      password: password, // Use the state for password
    };

    setTimeout(async () => {
      const result = await fetch("/api/ApiRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (result.status === 200) {
        event.target.reset();
        setIsLoading(false);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          router.push("/auth/login");
        }, 3000);
      } else {
        setIsLoading(false);
        setError(result.status === 400 ? "Email sudah terdaftar" : "Terjadi kesalahan");
      }
    }, 3000);
  };

  const handleRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  // Check if email and password are filled
  const isFormValid = email && password;

  return (
    <div className="grid grid-cols-1  p-6 h-screen justify-center">
      <div className="  border  flex items-center p-8 justify-center">
        <div className="relative w-full h-full">
          <Image src="/images/FotoLogin.jpg" alt="404" layout="fill" objectFit="cover" />
        </div>
        <div className="bg-slate-800 border-l-4 border-white flex flex-col justify-center items-center  h-full w-full p-10">
          <div className=" grid grid-cols-2 w-[40%] gap-2 mr-16">
            <div className=" flex items-center justify-end ">
              <Image src="/icon/python.png" alt="404" width={50} height={50} />
            </div>
            <div className=" text-center flex items-center justify-start ">
              <h1 className="text-center text-2xl font-bold ">My Kampus</h1>
            </div>
          </div>
          <div className="  h-full w-[50%] gap-5 flex flex-col justify-center">
            <div className="text-center">
              <Typography variant="h5">Welcome to Sign Up</Typography>
              <p>Hi! Please enter your details</p>
              {error && <p className="text-red-500 font-bold text-center text-2xl">{error}</p>}
            </div>
            <form className="space-y-4" onSubmit={handleRegister}>
              <TextField
                id="outlined-basic"
                label="fullname"
                name="fullname"
                variant="outlined"
                className="w-full rounded-full"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "orange",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "green",
                  },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                value={email} // Bind email state to value
                onChange={(e) => setEmail(e.target.value)} // Update email state
                className="w-full rounded-full"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "orange",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "green",
                  },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                name="password"
                variant="outlined"
                value={password} // Bind password state to value
                onChange={(e) => setPassword(e.target.value)} // Update password state
                className="w-full"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "orange",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "green",
                  },
                }}
              />
              <Stack direction="row" spacing={2}>
                {/* Disable the button if form is not valid */}
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  className="w-full py-2 px-4 text-white font-medium"
                  type="submit"
                  disabled={!isFormValid} // Disable button if form is not valid
                >
                  Register
                </LoadingButton>
              </Stack>
            </form>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Have an account?
              <Button onClick={handleRedirect} variant="outlined">
                {redirecting ? <Loader /> : "Here"}
              </Button>
            </Typography>
          </div>

          {showAlert && (
            <div className="fixed top-5 left-5 z-50">
              <AlertSuccess message="Login Success" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
