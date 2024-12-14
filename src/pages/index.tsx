import React, { useState } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

export default function Home() {
  const [value, setValue] = useState(0);

  return (
    <main className="gap-10  p-5 my-24 ">
      <div className="flex gap-10">
        <Box className="">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className="flex-col h-full gap-10 rounded-xl py-10 bg-transparent border-2 border-slate-300"
          >
            {/* Ikon dengan animasi */}
            <motion.div whileHover={{ scale: 1.3 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <IconButton href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className=" text-white rounded-full" />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.3 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <IconButton>
                <FavoriteIcon className=" text-white rounded-full" />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.3 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <IconButton href="https://github.com/AdrianAlfauzan" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className=" text-white rounded-full" />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.3 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <IconButton>
                <LocationOnIcon className=" text-white rounded-full" />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.3 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <IconButton>
                <LocationOnIcon className=" text-white rounded-full" />
              </IconButton>
            </motion.div>
          </BottomNavigation>
        </Box>
        <motion.div className="bg-red-500" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-white text-5xl font-extrabold text-center">Tugas Akhir - Universitas</h1>
          <p className="text-white text-xl text-center mt-4">Mengembangkan aplikasi untuk mengelola tugas akhir mahasiswa</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="mt-8 bg-red-500">
          <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg transition-all duration-300">Mulai Pengembangan</button>
        </motion.div>
        <motion.button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 200 }}>
          Explore Now
        </motion.button>
      </div>
    </main>
  );
}
