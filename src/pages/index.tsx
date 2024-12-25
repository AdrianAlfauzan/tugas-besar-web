import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { Link } from "react-scroll";

const images = ["/images/university1.jpg", "/images/university2.jpg", "/images/university3.jpg", "/images/university4.jpg", "/images/university5.jpg", "/images/university6.jpg"];
const promoTexts = [
  { title: "Selamat Datang", description: "Explore Informasi Kampus Kami" },
  { title: "Fasilitas Modern", description: "Kami menawarkan fasilitas terbaik untuk mendukung belajar" },
  { title: "Bergabunglah Bersama Kami", description: "Jadilah bagian dari komunitas kampus yang luar biasa" },
  { title: "Raih Impian Anda", description: "Kami membantu Anda mencapai tujuan akademik Anda" },
  { title: "Belajar dengan Praktis", description: "Nikmati pengalaman belajar dengan metode inovatif" },
  { title: "Kolaborasi dan Kreativitas", description: "Kembangkan ide-ide Anda dalam lingkungan kolaboratif" },
  { title: "Koneksi Global", description: "Jaringan luas untuk kesempatan internasional" },
  { title: "Prestasi Mahasiswa", description: "Dukung perjalanan Anda menuju kesuksesan" },
  { title: "Beragam Pilihan Program", description: "Pilih program studi yang sesuai dengan minat Anda" },
  { title: "Dosen Berpengalaman", description: "Belajar dari para ahli di bidangnya" },
  { title: "Lingkungan Kampus Hijau", description: "Nikmati suasana kampus yang asri dan nyaman" },
  { title: "Kesempatan Magang", description: "Gabungkan teori dengan praktik di dunia kerja" },
  { title: "Teknologi Terkini", description: "Akses teknologi canggih untuk mendukung studi Anda" },
  { title: "Beasiswa Tersedia", description: "Dapatkan peluang beasiswa untuk meringankan biaya studi" },
  { title: "Kegiatan Ekstrakurikuler", description: "Ikuti beragam kegiatan untuk mengembangkan bakat Anda" },
  { title: "Karir Cemerlang", description: "Persiapkan masa depan Anda dengan pelatihan profesional" },
];

export default function Home() {
  const [value, setValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % promoTexts.length);
    }, 4000); // Ganti teks setiap 4 detik
    return () => clearInterval(interval); // Bersihkan interval saat komponen tidak lagi digunakan
  }, []);

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
            <motion.div
              whileHover={{ scale: 1.3 }} // lurus
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
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
        <div className="carousel-container  p-5">
          <div className="carousel-wrapper relative w-full h-[700px]">
            <AnimatePresence>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="carousel-image "
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transform: "scale(1.1)" }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <AnimatePresence mode="wait">
                <motion.div key={currentTextIndex} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 1, ease: "easeInOut" }} className="text-center">
                  <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} className="text-4xl font-bold">
                    {promoTexts[currentTextIndex].title}
                  </motion.h2>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-xl mt-2">
                    {promoTexts[currentTextIndex].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <IconButton onClick={prevSlide} className="control-button-left">
              <ArrowCircleLeftTwoToneIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={nextSlide} className="control-button-right">
              <ArrowCircleRightTwoToneIcon fontSize="medium" />
            </IconButton>
          </div>
        </div>
        <motion.div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-10 rounded-lg shadow-lg overflow-hidden" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          {/* Badge */}
          <div className="absolute top-5 left-5 bg-white text-red-500 font-bold px-4 py-1 rounded-full shadow-lg">2024 Edition</div>

          {/* Judul */}
          <motion.h1 className="text-white text-5xl font-extrabold text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255,255,255,0.8)" }}>
            Tugas Akhir - Universitas
          </motion.h1>

          {/* Deskripsi */}
          <motion.p className="text-white text-xl text-center mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} whileHover={{ scale: 1.05, color: "#fff5f5" }}>
            Mengembangkan aplikasi untuk mengelola tugas akhir mahasiswa
          </motion.p>

          {/* Tombol CTA */}
          <motion.div className="flex justify-center mt-6" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <Link to="info-lanjutan" smooth={true} duration={800}>
              <span className="bg-white text-red-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition">Pelajari Lebih Lanjut</span>
            </Link>
          </motion.div>

          {/* Statistik atau Indikator */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center text-white">
            <div>
              <h3 className="text-4xl font-bold">300+</h3>
              <p className="text-lg">Mahasiswa Lulus</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">20+</h3>
              <p className="text-lg">Program Studi</p>
            </div>
          </div>
          <div className="mt-2 bg-gray-100 text-gray-800 rounded-lg py-5  shadow-md">
            <h3 className="text-2xl font-bold text-center mb-3">Favorite student</h3>
            <div className="flex items-center justify-center">
              <motion.div className="mx-4 w-80 text-center p-6 bg-white rounded-lg shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                <p className="text-lg italic">&quot;Kampus ini memberi saya kesempatan untuk berkembang dan mengeksplorasi ide-ide inovatif!&quot;</p>
                <p className="mt-4 font-semibold">Adrian Musa Alfauzan</p>
                <p>Mahasiswa Teknik Informatika</p>
              </motion.div>
            </div>
          </div>

          {/* Animasi Partikel */}
          <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}>
            <div className="absolute w-20 h-20 bg-white rounded-full opacity-30 blur-lg top-10 left-10"></div>
            <div className="absolute w-16 h-16 bg-white rounded-full opacity-20 blur-lg bottom-10 right-10"></div>
            <div className="absolute w-12 h-12 bg-white rounded-full opacity-25 blur-lg bottom-20 left-20"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Komponen baru di bawah */}
      <div id="info-lanjutan" className="p-10 mt-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
        <motion.h2 className="text-white text-3xl font-bold text-center">Informasi Lanjutan</motion.h2>
        <motion.p className="text-white text-xl text-center mt-4">Dapatkan informasi lebih lanjut tentang program studi, fasilitas, dan beasiswa yang tersedia di universitas kami.</motion.p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Program Studi</h3>
            <p>Berbagai pilihan program studi untuk membentuk masa depan Anda.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Fasilitas Kampus</h3>
            <p>Fasilitas modern untuk mendukung pengalaman belajar Anda.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
