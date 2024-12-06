import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const AlertSuccess = ({ message }: { message: string }) => {
  return (
    <div className="fixed top-5 left-5 z-50">
      <Stack
        sx={{
          width: "100%",
          animation: "slideInFromTopLeft 0.8s ease-out",
        }}
        spacing={2}
      >
        <Alert severity="error">
          <AlertTitle>{message}</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>
      </Stack>
    </div>
  );
};

export default AlertSuccess;
