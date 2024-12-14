import { motion } from "framer-motion";
import React, { useState } from "react";
import Button from "@mui/material/Button";

const Seminar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSection, setShowSection] = useState<boolean>(true);

  const announcements = [
    { id: 1, title: "Seminar on Cyber Security", date: "2024-12-15", description: "Ayo join dengan teman-teman untuk belajar cyber security bersama kami!" },
    { id: 2, title: "Upcoming Workshop on Technology", date: "2024-12-20", description: "Ayo join dengan teman-teman untuk belajar teknologi terbaru bersama kami!" },
  ];

  const schedules = [
    { id: 1, date: "2024-12-15", time: "10:00 AM - 12:00 PM" },
    { id: 2, date: "2024-12-20", time: "2:00 PM - 4:00 PM" },
  ];

  const evaluations = [
    { id: 1, name: "Adrian Musa Alfauzan", grade: "A", comments: "Excellent performance in the seminar." },
    { id: 2, name: "Musa Alfauzan", grade: "B+", comments: "Good effort but needs improvement." },
  ];

  const handleButtonClick = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
      setShowSection(false);
    } else {
      setActiveSection(section);
      setShowSection(true);
    }
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

      <motion.div className="my-24" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        {activeSection === "announcements" && showSection && (
          <motion.div className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl font-extrabold">Pengumuman</h1>
          </motion.div>
        )}
        <motion.div
          className={`display-announcements p-6 bg-white shadow-md rounded-lg ${activeSection === "announcements" && showSection ? "opacity-100" : "opacity-0"}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: activeSection === "announcements" && showSection ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id} className="mb-4">
                <h3 className="text-xl font-semibold">{announcement.title}</h3>
                <p className="text-gray-600">{announcement.date}</p>
                <p>{announcement.description}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {activeSection === "schedules" && showSection && (
          <motion.div className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl font-extrabold">Jadwal</h1>
          </motion.div>
        )}
        <motion.div
          className={`display-schedules p-6 bg-white shadow-md rounded-lg ${activeSection === "schedules" && showSection ? "opacity-100" : "opacity-0"}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: activeSection === "schedules" && showSection ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id} className="mb-4">
                <p className="text-xl font-semibold">{schedule.date}</p>
                <p>{schedule.time}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {activeSection === "evaluations" && showSection && (
          <motion.div className="bg-gradient-to-r from-blue-500 to-purple-600 p-12 rounded-lg text-white text-center mb-12" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl font-extrabold">Nilai</h1>
          </motion.div>
        )}
        <motion.div
          className={`display-evaluations p-6 bg-white shadow-md rounded-lg ${activeSection === "evaluations" && showSection ? "opacity-100" : "opacity-0"}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: activeSection === "evaluations" && showSection ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <ul>
            {evaluations.map((evaluation) => (
              <li key={evaluation.id} className="mb-4">
                <p className="font-semibold">{evaluation.name}:</p>
                <p>Grade: {evaluation.grade}</p>
                <p>Comments: {evaluation.comments}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Seminar;
