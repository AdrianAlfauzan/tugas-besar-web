import { useState } from "react";
import { updateProfile } from "@/lib/firebase/service"; // Sesuaikan path file
import { useSession } from "next-auth/react";

const useUpdateProfile = () => {
  const { data }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdateProfile = async (updatedData: any) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateProfile(data?.user?.nim, updatedData);
      if (response.success) {
        setSuccess(response.message);

        // Set a timeout to hide the success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000); // 3 seconds timeout
      } else {
        setError(response.message || "Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, handleUpdateProfile };
};

export default useUpdateProfile;
