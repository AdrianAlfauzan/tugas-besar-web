import React from "react";
import Typography from "@mui/material/Typography";

const NavbarLogo: React.FC = () => (
  <Typography
    variant="h5"
    noWrap
    component="a"
    href="#app-bar-with-responsive-menu"
    sx={{
      mr: 2,
      display: { xs: "none", md: "flex" },
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      color: "inherit",
      textDecoration: "none",
    }}
  >
    LOGO
  </Typography>
);

export default NavbarLogo;
