import { collection, getDocs, where, query, doc, addDoc, getFirestore, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { app, db } from "@/lib/firebase/init";
import { getSession } from "next-auth/react";
// import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// Tipe generik untuk mengambil data
export async function mengambilData<DataType>(namaCollection: string): Promise<DataType[]> {
  const snapshot = await getDocs(collection(firestore, namaCollection));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DataType[];
  return data;
}

export async function signIn(userData: { email: string }) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

type signUpCallback = (response: { status: boolean; message: string }) => void;

export async function signUp(userData: { fullname: string; email: string; password: string; role?: string; nim: string; jurusan: string }, callback: signUpCallback) {
  try {
    // Cek apakah email sudah terdaftar
    const emailQuery = query(collection(firestore, "users"), where("email", "==", userData.email));
    const emailSnapshot = await getDocs(emailQuery);
    const emailData = emailSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (emailData.length > 0) {
      callback({ status: false, message: "Email sudah terdaftar" });
      return;
    }

    // Cek apakah NIM sudah terdaftar
    const nimQuery = query(collection(firestore, "users"), where("nim", "==", userData.nim));
    const nimSnapshot = await getDocs(nimQuery);
    const nimData = nimSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (nimData.length > 0) {
      callback({ status: false, message: "NIM sudah terdaftar" });
      return;
    }

    // Jika email dan NIM valid, tambahkan data pengguna baru
    userData.password = userData.password; // Gantilah ini dengan hashing password jika diperlukan
    userData.role = "user"; // Default role untuk user baru
    await addDoc(collection(firestore, "users"), userData);
    callback({ status: true, message: "Register berhasil" });
  } catch (error: any) {
    callback({ status: false, message: error.message });
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  if (!userData.email) {
    return callback({ status: false, message: "Email is required", data: userData });
  }

  const q = query(collection(firestore, "users"), where("email", "==", userData.email));
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Data from Firestore:", data);

  if (data.length > 0) {
    // Jika user sudah ada, update data
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({ status: true, message: "User updated successfully", data: userData });
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        callback({ status: false, message: "Failed to update user", data: userData });
      });
  } else {
    // Jika user belum ada, tambahkan data baru
    userData.role = "user";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "User created successfully", data: userData });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        callback({ status: false, message: "Failed to create user", data: userData });
      });
  }
}

interface PendaftaranData {
  judulProposal: string;
  temaProposal: string;
  statusPembayaran: string;
}

// Fungsi untuk menyimpan data pendaftaran
export const savePendaftaran = async (data: PendaftaranData) => {
  try {
    // Ambil session dari NextAuth untuk mendapatkan informasi user
    const session: any = await getSession();

    if (!session) {
      throw new Error("User belum terautentikasi. Silakan login.");
    }

    // Ambil koleksi user dari Firestore
    const userCollection = collection(firestore, "users");

    // Cari dokumen berdasarkan nim user yang sedang login
    const q = query(userCollection, where("nim", "==", session.user?.nim));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Dokumen user tidak ditemukan.");
    }

    // Ambil userId dari document ID yang ditemukan
    const userId = snapshot.docs[0].id;

    // Referensi dokumen pendaftaran berdasarkan userId
    const docRef = doc(db, "pendaftaran", userId);

    // Ambil dokumen pendaftaran
    const docSnap = await getDoc(docRef);

    // Gabungkan data lama dengan data baru jika dokumen sudah ada
    const updatedData = docSnap.exists()
      ? {
          ...docSnap.data(),
          ...data,
          email: session?.user?.email,
          fullname: session?.user?.fullname,
          nim: session?.user?.nim,
        }
      : {
          ...data,
          email: session?.user?.email,
          fullname: session?.user?.fullname,
          nim: session?.user?.nim,
        };

    // Simpan data ke Firestore
    await setDoc(docRef, updatedData, { merge: true });

    return { success: true };
  } catch (error: any) {
    console.error("Gagal menyimpan data ke Firestore:", error);
    return { success: false, error: error.message };
  }
};
