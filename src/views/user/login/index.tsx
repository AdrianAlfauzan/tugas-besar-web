import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import AlertSuccess from "@/utils/AlertSuccess";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Image from "next/image";
import { signIn } from "next-auth/react";

// MY UTILS
import Loader from "@/utils/Loader";

const LoginView: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      // Simulasi loading selama 2 detik
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
            setShowAlert(false);
            router.push(callbackUrl);
          }, 2000);
        } else {
          setIsLoading(false);
          setShowAlert(false);
          setError("Email atau password salah!");
        }
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const handleGoogle = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoadingGoogle(true);

    try {
      await signIn("google", { callbackUrl });
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setError("Gagal masuk dengan Google. Silakan coba lagi.");
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
    <div className="grid grid-cols-1 p-6 h-screen justify-center">
      <div className="border flex items-center p-8 justify-center">
        <div className="bg-slate-800 border-r-4 border-white flex flex-col justify-center items-center h-full w-full p-10">
          <div className="grid grid-cols-2 w-[40%] gap-2 mr-16">
            <div className="flex items-center justify-end">
              <Image src="/icon/python.png" alt="Python Icon" width={50} height={50} />
            </div>
            <div className="text-center flex items-center justify-start">
              <h1 className="text-2xl font-bold">My Kampus</h1>
            </div>
          </div>
          <div className="h-full w-[50%] gap-5 flex flex-col justify-center">
            <div className="text-center">
              <Typography variant="h5">Welcome to Login</Typography>
              <p>Hi! Please enter your details</p>
              {error && <p className="text-red-500 font-bold text-center text-2xl">{error}</p>}
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className="w-full rounded-full"
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
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                className="w-full"
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
              <Button variant="outlined" className="w-full py-2 px-4 text-white font-medium" type="submit">
                {isLoading ? <Loader size={25} /> : "Login"}
              </Button>
            </form>
            <Button onClick={handleGoogle} variant="outlined" className="w-full py-2 px-4 text-white font-medium">
              {isLoadingGoogle ? <Loader size={25} /> : "Login With Google"}
            </Button>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Haven&apos;t an account?
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
        <div className="relative w-full h-full">
          <Image src="/images/FotoLogin.jpg" alt="Login Illustration" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
