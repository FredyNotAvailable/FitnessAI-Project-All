import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // << aquí están las importaciones que faltan
import { getStorage } from 'firebase/storage';  // <-- faltaba esta importación

export const firebaseConfig = {
  apiKey: "AIzaSyDh5SPTDdCHUEkoo80KZEuWD_YV_TC7MEg",
  authDomain: "fitnessai-project.firebaseapp.com",
  projectId: "fitnessai-project",
  storageBucket: "fitnessai-project.firebasestorage.app",
  // storageBucket: "fitnessai-project.appspot.com" Solo si tengo errores al subir imagenes
  messagingSenderId: "542441656038",
  appId: "1:542441656038:web:99ef174d3bd07d9b673527"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);