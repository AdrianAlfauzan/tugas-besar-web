import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPelaksanaanSeminar } from "@/lib/firebase/service"; // Import service untuk fetching data dari Firestore

// Tipe untuk data pelaksanaanSeminar
type PelaksanaanSeminar = {
  id: string; // Tambahkan id dokumen
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
  message?: string;
  dataPelaksanaanSeminar?: PelaksanaanSeminar[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "GET") {
    // Validasi metode HTTP
    return res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Method not allowed. Only GET requests are supported.",
    });
  }

  try {
    const data = await fetchPelaksanaanSeminar();

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "No seminar data found.",
      });
    }

    res.status(200).json({
      status: true,
      statusCode: 200,
      dataPelaksanaanSeminar: data,
    });
  } catch (error: any) {
    console.error("Error fetching pelaksanaanSeminar:", error.message);

    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error. Failed to fetch seminar data.",
    });
  }
}
