import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPelaksanaanSeminar } from "@/lib/firebase/service"; // Import service untuk fetching data dari Firestore

// Tipe untuk data pelaksanaanSeminar
type PelaksanaanSeminar = {
  deskripsiPengumuman: string;
  judulPengumuman: string;
  komentar: string;
  namaPeserta: string;
  nilai: string;
  tanggal: string;
  waktu: string;
};

// Tipe untuk response API
type ResponseData = {
  status: boolean;
  statusCode: number;
  dataPelaksanaanSeminar: PelaksanaanSeminar[]; // Ganti dengan tipe yang sesuai
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const data = await fetchPelaksanaanSeminar();
    console.log("Data:", data); // Logging data yang diterima dari Firestore

    res.status(200).json({
      status: true,
      statusCode: 200,
      dataPelaksanaanSeminar: data,
    });
  } catch (error) {
    console.error("Error fetching pelaksanaanSeminar:", error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      dataPelaksanaanSeminar: [],
    });
  }
}
