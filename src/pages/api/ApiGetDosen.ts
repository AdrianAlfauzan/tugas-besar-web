import type { NextApiRequest, NextApiResponse } from "next";
import { mengambilData } from "@/lib/firebase/service";

// Tipe untuk data produk
type GetDosen = {
  id: string;
  nidn: string;
  fullname: string;
  dosenPengajar: string;
};

// Tipe untuk response API
type ResponseData = {
  status: boolean;
  statusCode: number;
  dataGetDosen: GetDosen[]; // Ganti dengan tipe yang sesuai
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    // Mengambil data produk
    const data = await mengambilData<GetDosen>("admin");

    // Pastikan mengirim data dalam bentuk yang sesuai
    res.status(200).json({
      status: true,
      statusCode: 200,
      dataGetDosen: data, // Kirim data dengan properti dataGetUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, statusCode: 500, dataGetDosen: [] }); // Perbaiki kesalahan di dataGetUsers
  }
}
