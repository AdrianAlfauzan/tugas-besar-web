import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

// MY UTILS
import Loader from "@/utils/Loader";

// MY HOOKS
import useScroll from "@/hooks/frontend/useScroll";

// Import Subcomponents
import NavbarLogo from "@/components/layout/user/Navbar/components/NavbarLogo";
import MenuItems from "@/components/layout/user/Navbar/components/MenuItems";
import UserMenu from "@/components/layout/user/Navbar/components/UserMenu";

function Navbar() {
  const [toggleNavMenu, setToggleNavMenu] = useState<null | HTMLElement>(null);
  const [toggleUserMenu, setToggleUserMenu] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data }: any = useSession();
  const scrolled = useScroll();
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setToggleNavMenu(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setToggleUserMenu(event.currentTarget);
  };
  const handleNavigate = (route: string) => {
    router.push(route);
    setToggleNavMenu(null);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <main>
      <motion.nav
        initial={{ opacity: 0, y: -500, x: -200 }}
        animate={{ opacity: 1, y: -90, x: 0 }}
        transition={{ duration: 1.5 }}
        className={` fixed z-50  w-full border border-white rounded-lg shadow-2xl shadow-cyan-800 transition-colors duration-500 ${scrolled ? "bg-gray-900" : "bg-transparent"} ${scrolled ? "shadow-blink" : "shadow-cyan-900"}`}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <NavbarLogo />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="toggle-menu-responsive"
                anchorEl={toggleNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(toggleNavMenu)}
                onClose={() => setToggleNavMenu(null)}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuItems handleNavigate={handleNavigate} />
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              RESPONSIVE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", justifyContent: "center" } }}>
              <MenuItems handleNavigate={handleNavigate} />
            </Box>

            <Box>
              {isLoading ? (
                // Jika masih loading, tampilkan Loader
                <Loader size={30} />
              ) : data ? (
                // Jika `data` tersedia, tampilkan avatar pengguna
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt="User Avatar" src={data.user?.image || "/static/images/avatar/2.jpg"} />
                  </IconButton>
                </Tooltip>
              ) : (
                // Jika `data` tidak tersedia, tampilkan tombol Login
                <Tooltip title="Login">
                  <Button onClick={() => signIn()} sx={{ color: "white", display: "block" }}>
                    <Typography variant="h6" className="mx-10">
                      Login
                    </Typography>
                  </Button>
                </Tooltip>
              )}

              <UserMenu
                toggleUserMenu={toggleUserMenu}
                setToggleUserMenu={setToggleUserMenu}
                userSession={data} // Pass data session ke UserMenu
                signIn={signIn}
                signOut={signOut}
              />
            </Box>
            {isLoading ? <Loader size={1} /> : data ? <Typography>{data.user?.fullname}</Typography> : null}
          </Toolbar>
        </Container>
      </motion.nav>
    </main>
  );
}

export default Navbar;
