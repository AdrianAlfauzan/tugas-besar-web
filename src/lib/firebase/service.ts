import { collection, getDocs, where, query, doc, addDoc, getFirestore, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { app, db } from "@/lib/firebase/init";
import { storage } from "@/lib/firebase/init"; // Pastikan path ini sesuai
import { getSession } from "next-auth/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const firestore = getFirestore(app);

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
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({ status: true, message: "User updated successfully", data: userData });
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        callback({ status: false, message: "Failed to update user", data: userData });
      });
  } else {
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

export const savePendaftaran = async (data: PendaftaranData) => {
  try {
    const session: any = await getSession();

    if (!session) {
      throw new Error("User belum terautentikasi. Silakan login.");
    }

    const userCollection = collection(firestore, "users");

    const q = query(userCollection, where("nim", "==", session.user?.nim));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Dokumen user tidak ditemukan.");
    }

    const userId = snapshot.docs[0].id;

    const docRef = doc(db, "pendaftaran", userId);

    const docSnap = await getDoc(docRef);

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

    await setDoc(docRef, updatedData, { merge: true });

    return { success: true };
  } catch (error: any) {
    console.error("Gagal menyimpan data ke Firestore:", error);
    return { success: false, error: error.message };
  }
};

export const pilihDosen = async (
  nidnDosen: string, // Ganti parameter 'dosenPengajar' menjadi 'nidnDosen'
  callback: (response: { status: boolean; message: string; data?: any }) => void
): Promise<void> => {
  try {
    // Mengambil sesi pengguna
    const session: any = await getSession();
    console.log("Sesi pengguna saat ini:", session);

    if (!session) {
      throw new Error("User belum terautentikasi. Silakan login.");
    }

    // Mencari dosen berdasarkan nidn
    const q = query(collection(firestore, "admin"), where("nidn", "==", nidnDosen));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      callback({
        status: false,
        message: "Dosen dengan NIDN tersebut tidak ditemukan",
      });
      return;
    }

    const dosenData: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const dosenPilih = dosenData[0];

    // Mencari data pengguna berdasarkan nim
    const userCollection = collection(firestore, "users");
    const qUser = query(userCollection, where("nim", "==", session.user?.nim));
    const snapshotUser = await getDocs(qUser);
    console.log("Snapshot pengguna:", snapshotUser);

    if (snapshotUser.empty) {
      throw new Error("Dokumen user tidak ditemukan.");
    }

    const userId = snapshotUser.docs[0].id;
    const userRef = doc(firestore, "users", userId);
    const userDocSnap = await getDoc(userRef);

    const updatedUserData = userDocSnap.exists()
      ? {
          ...userDocSnap.data(),
          pilihDosenPembimbing: {
            nidnDosen: dosenPilih.nidn,
            namaDosen: dosenPilih.fullname,
            dosenPengajar: dosenPilih.dosenPengajar,
          },
        }
      : {
          pilihDosenPembimbing: {
            nidnDosen: dosenPilih.nidn,
            namaDosen: dosenPilih.fullname,
            dosenPengajar: dosenPilih.dosenPengajar,
          },
        };

    // Periksa apakah dosen yang dipilih sudah ada pada data user
    if (userDocSnap.exists() && userDocSnap.data()?.pilihDosenPembimbing?.nidnDosen === nidnDosen) {
      callback({
        status: false,
        message: "Dosen dengan NIDN tersebut sudah dipilih.",
      });
      return;
    }

    // Menyimpan data dosen yang dipilih ke Firestore
    await setDoc(userRef, updatedUserData, { merge: true });
    console.log("Data dosen berhasil disimpan untuk pengguna:", session.user?.nim);

    callback({
      status: true,
      message: "Dosen berhasil dipilih dan data disimpan.",
      data: dosenData,
    });
  } catch (error: any) {
    console.error("Gagal memilih dosen atau menyimpan data:", error);
    callback({
      status: false,
      message: "Gagal memilih dosen atau menyimpan data.",
    });
  }
};

export async function updateProfile(nim: string, updatedData: any) {
  if (!nim) {
    throw new Error("NIM is required for updating profile");
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new Error("No data provided for update");
  }

  try {
    // Cari dokumen user berdasarkan NIM
    const q = query(collection(firestore, "users"), where("nim", "==", nim));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { success: false, message: "User with the specified NIM not found" };
    }

    // Ambil dokumen pertama yang ditemukan
    const userDoc = snapshot.docs[0];
    const userRef = doc(firestore, "users", userDoc.id);

    // Update dokumen
    await updateDoc(userRef, updatedData);

    return { success: true, message: "Profile updated successfully!" };
  } catch (error: any) {
    console.error("Error updating profile: ", error);

    // Pastikan error yang dilempar relevan
    return { success: false, message: error.message || "Failed to update profile." };
  }
}

export const uploadFileToFirebase = (file: File, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading file:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at:", downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });
};

export const fetchPelaksanaanSeminar = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pelaksanaanSeminar"));
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    throw new Error("Error fetching documents");
  }
};
