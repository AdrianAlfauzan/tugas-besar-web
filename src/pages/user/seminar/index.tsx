import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

type PelaksanaanSeminar = {
  id: string;
  deskripsiPengumuman: string;
  judulPengumuman: string;
  komentar: string;
  namaPeserta: string;
  nilai: string;
  tanggal: string;
  waktu: string;
};

const Seminar = () => {
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const [announcements, setAnnouncements] = useState<PelaksanaanSeminar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeminarData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/ApiGetPelaksanaanSeminar");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data?.status) {
          setAnnouncements(data.dataPelaksanaanSeminar || []);
        } else {
          setError(data.message || "Failed to fetch seminar data.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeminarData();
  }, []);

  const handleButtonClick = (section: string) => {
    setActiveSections((prev) => (prev.includes(section) ? prev.filter((activeSection) => activeSection !== section) : [...prev, section]));
  };

  return (
    <div className="my-24 px-6">
      <div className="flex justify-around mb-8">
        <Button onClick={() => handleButtonClick("announcements")} className="btn">
          Pengumuman
        </Button>
        <Button onClick={() => handleButtonClick("schedules")} className="btn">
          Jadwal
        </Button>
        <Button onClick={() => handleButtonClick("evaluations")} className="btn">
          Nilai
        </Button>
      </div>

      <motion.div className="my-24 p-12 rounded-lg" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <AnimatePresence>
          {/* Pengumuman Section */}
          {activeSections.includes("announcements") && (
            <>
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-5xl font-extrabold">Pengumuman</h1>
              </motion.div>
              <motion.div className="display-announcements p-6 bg-white shadow-md rounded-lg z-0" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.5, duration: 0.3 }}>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : announcements.length === 0 ? (
                  <p>No announcements available.</p>
                ) : (
                  <ul>
                    {announcements.map((announcement) => (
                      <li key={announcement.id} className="mb-4">
                        <h3 className="text-xl font-semibold">{announcement.judulPengumuman}</h3>
                        <p className="text-gray-600">{announcement.tanggal}</p>
                        <p>{announcement.deskripsiPengumuman}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </>
          )}
          {activeSections.includes("schedules") && (
            <>
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-5xl font-extrabold">Jadwal</h1>
              </motion.div>
              <motion.div className="display-announcements p-6 bg-white shadow-md rounded-lg z-0" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.5, duration: 0.3 }}>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : announcements.length === 0 ? (
                  <p>No announcements available.</p>
                ) : (
                  <ul>
                    {announcements.map((announcement) => (
                      <li key={announcement.id} className="mb-4">
                        <h3 className="text-xl font-semibold">{announcement.tanggal}</h3>
                        <p className="text-gray-600">{announcement.waktu}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </>
          )}
          {activeSections.includes("evaluations") && (
            <>
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-5xl font-extrabold">Evaluations</h1>
              </motion.div>
              <motion.div className="display-announcements p-6 bg-white shadow-md rounded-lg z-0" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.5, duration: 0.3 }}>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : announcements.length === 0 ? (
                  <p>No announcements available.</p>
                ) : (
                  <ul>
                    {announcements.map((announcement) => (
                      <li key={announcement.id} className="mb-4">
                        <h3 className="text-xl font-semibold">{announcement.namaPeserta}</h3>
                        <h3 className="text-xl font-semibold">{announcement.nilai}</h3>
                        <p className="text-gray-600">{announcement.komentar}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </>
          )}
          {/* Jadwal dan Evaluations dapat ditambahkan jika data dinamis tersedia */}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Seminar;
