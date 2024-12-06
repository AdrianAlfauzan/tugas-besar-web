import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
interface UserMenuProps {
  toggleUserMenu: null | HTMLElement;
  setToggleUserMenu: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  userSession: any;
  signIn: () => void;
  signOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ toggleUserMenu, setToggleUserMenu, userSession, signIn, signOut }) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  return (
    <Menu
      sx={{ mt: "45px" }}
      anchorEl={toggleUserMenu}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(toggleUserMenu)}
      onClose={() => setToggleUserMenu(null)}
    >
      {userSession ? (
        <div>
          <MenuItem
            onClick={() => {
              navigateTo("/user/profile");
              setToggleUserMenu(null);
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  padding: "10px 20px",
                },
              }}
            >
              Profile
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => setToggleUserMenu(null)}>
            <Typography
              sx={{
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  padding: "10px 20px",
                },
              }}
            >
              Account
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => setToggleUserMenu(null)}>
            <Typography
              sx={{
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  padding: "10px 20px",
                },
              }}
            >
              Dashboard
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>
            <Typography
              sx={{
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  padding: "10px 20px",
                },
              }}
            >
              Logout
            </Typography>
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => signIn()}>
          <Typography
            sx={{
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                padding: "10px 20px",
              },
            }}
          >
            Login
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default UserMenu;
