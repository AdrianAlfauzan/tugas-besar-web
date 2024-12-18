import { collection, getDocs, where, query, doc, addDoc, getFirestore, updateDoc } from "firebase/firestore";
import app from "@/lib/firebase/init";
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

// Tipe untuk callback
type signUpCallback = (response: { status: boolean; message: string }) => void;

export async function signUp(userData: { fullname: string; email: string; password: string; role?: string }, callback: signUpCallback) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "Email sudah terdaftar" });
  } else {
    // userData.password = await bcrypt.hash(userData.password, 10);
    userData.password = userData.password;
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register berhasil" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
      });
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
    userData.role = "member";
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
