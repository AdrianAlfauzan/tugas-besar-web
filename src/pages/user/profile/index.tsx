import { Box, Grid, TextField, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";

// MY HOOKS
import useUpdateProfile from "@/hooks/useUpdateProfile"; // Sesuaikan path file

// MY UTILS
import AlertSuccess from "@/utils/AlertSuccess";
import AlertError from "@/utils/AlertError";

const ProfilePage = () => {
  const { data }: any = useSession();
  const { isLoading, error, success, handleUpdateProfile } = useUpdateProfile();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const updatedData = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      password: formData.get("password"),
      jurusan: formData.get("jurusan"),
    };

    handleUpdateProfile(updatedData);
  };

  return (
    <div className="p-6 my-24 mx-24 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 my-5">Profile User</h1>
      </div>

      <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Grid container spacing={2} className="p-4 rounded-md">
            {/* Left Section: Profile Avatar and Info */}
            <Grid item xs={3} className="bg-white border border-gray-900 p-4 rounded h-full text-center flex flex-col items-center justify-center">
              <Container className="rounded-full flex items-center justify-center">
                <Image
                  src="/images/profile.png" // Replace with actual profile image URL
                  alt="profile"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-black"
                />
              </Container>
              <Container className="mt-4 p-4 text-black font-semibold rounded-lg">
                <Typography variant="h6" className="text-center">
                  {data?.user?.fullname}
                </Typography>
                <Typography className="text-center">{data?.user?.nim}</Typography>
                <Typography className="text-center">S1 | {data?.user?.jurusan}</Typography>
              </Container>
            </Grid>

            {/* Right Section: User Info Form */}
            <Grid item xs={9} container direction="column" className="bg-white p-2 rounded">
              <Grid container spacing={2}>
                {/* Row 1 */}
                <Grid item xs={6}>
                  <TextField margin="dense" value={data?.user?.nim} name="nim" disabled type="text" fullWidth className="mb-4" />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin="dense" defaultValue={data?.user?.fullname} name="fullname" label="Full Name" type="text" fullWidth className="mb-4" />
                </Grid>

                {/* Row 2 */}
                <Grid item xs={6}>
                  <TextField margin="dense" defaultValue={data?.user?.email} name="email" label="Email" type="email" fullWidth className="mb-4" />
                </Grid>
                <Grid item xs={6}>
                  <TextField margin="dense" defaultValue={data?.user?.password} name="password" label="Password" type="text" fullWidth className="mb-4" />
                </Grid>

                {/* Row 3 */}
                <Grid item xs={6}>
                  <TextField margin="dense" defaultValue={data?.user?.jurusan} name="jurusan" label="Jurusan" type="text" fullWidth className="mb-4" />
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" variant="contained" color="primary" fullWidth className="mt-2" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Display Alerts */}
        {error && <AlertError message={error} />}
        {success && <AlertSuccess message={success} />}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
