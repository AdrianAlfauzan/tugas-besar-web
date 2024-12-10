import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

interface MenuItemsProps {
  handleNavigate: (route: string) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ handleNavigate }) => {
  const [anchorElActivity, setAnchorElActivity] = React.useState<null | HTMLElement>(null);
  const [anchorElTugas, setAnchorElTugas] = React.useState<null | HTMLElement>(null);

  const openActivity = Boolean(anchorElActivity);
  const openTugas = Boolean(anchorElTugas);

  const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
    if (type === "activity") {
      setAnchorElActivity(event.currentTarget);
    } else if (type === "tugas") {
      setAnchorElTugas(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorElActivity(null);
    setAnchorElTugas(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { md: "flex", justifyContent: "center" } }}>
        <Button
          onClick={() => handleNavigate("/")}
          sx={{
            my: 2,
            color: { xs: "black", sm: "black", md: "white" },
            display: "block",
          }}
        >
          <Typography variant="h6" className="mx-10">
            Home
          </Typography>
        </Button>

        {/* Menu Activity */}
        <Button
          id="fade-button"
          aria-controls={openActivity ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openActivity ? "true" : undefined}
          onClick={(event) => handleClick(event, "activity")}
          sx={{
            my: 2,
            color: { xs: "black", sm: "black", md: "white" },
            display: "block",
          }}
        >
          <Typography variant="h6" className="mx-10">
            Activity
          </Typography>
        </Button>
        <Menu
          id="activity-menu"
          MenuListProps={{
            "aria-labelledby": "activity-button",
          }}
          anchorEl={anchorElActivity}
          open={openActivity}
          onClose={handleClose}
          TransitionComponent={Fade}
          sx={{
            "& .MuiPaper-root": {
              width: { xs: "100%", sm: "auto", md: "200px" },
              right: { xs: 0, sm: "auto" },
              left: { xs: "auto", sm: "unset" },
              marginTop: { xs: "0", sm: "10px" },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleNavigate("user/activity/PilihDosenPembimbing");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                padding: "10px 20px",
              },
            }}
          >
            Pilih Dosen Pembimbing
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleNavigate("user/activity/StatusPembayaran");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                padding: "10px 20px",
              },
            }}
          >
            Status Pembayaran
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleNavigate("user/activity/UploadBukti");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                padding: "10px 20px",
              },
            }}
          >
            Upload Tema & Proposal
          </MenuItem>
        </Menu>

        {/* Menu Tugas Akhir */}
        <Button
          id="fade-button"
          aria-controls={openTugas ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openTugas ? "true" : undefined}
          onClick={(event) => handleClick(event, "tugas")}
          sx={{
            my: 2,
            color: { xs: "black", sm: "black", md: "white" },
            display: "block",
          }}
        >
          <Typography variant="h6" className="mx-10">
            Tugas Akhir
          </Typography>
        </Button>
        <Menu
          id="tugas-menu"
          MenuListProps={{
            "aria-labelledby": "tugas-button",
          }}
          anchorEl={anchorElTugas}
          open={openTugas}
          onClose={handleClose}
          TransitionComponent={Fade}
          sx={{
            "& .MuiPaper-root": {
              width: { xs: "100%", sm: "auto", md: "200px" },
              right: { xs: 0, sm: "auto" },
              left: { xs: "auto", sm: "unset" },
              marginTop: { xs: "0", sm: "10px" },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleNavigate("user/activity/PilihDosen");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                padding: "10px 20px",
              },
            }}
          >
            Cek Kelayakan TA
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleNavigate("user/activity/StatusPembayaran");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                padding: "10px 20px",
              },
            }}
          >
            Coming Soon!
          </MenuItem>
        </Menu>

        <Button
          onClick={() => handleNavigate("/user/seminar")}
          sx={{
            my: 2,
            color: { xs: "black", sm: "black", md: "white" },
            display: "block",
          }}
        >
          <Typography variant="h6" className="mx-10">
            Seminar
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default MenuItems;
