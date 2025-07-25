// src/services/authService.ts

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../app/firebase"; // Asume que tienes este archivo

// Inicializa Firebase (si no está inicializado en otro lado)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Interface simple para usuario autenticado (puedes extender)
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Observador para el usuario autenticado
export function onAuthStateChangedListener(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const authUser: AuthUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      callback(authUser);
    } else {
      callback(null);
    }
  });
}

// Login con email y password
export async function loginWithEmail(email: string, password: string): Promise<AuthUser> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

// Login con Google (popup)
export async function loginWithGoogle(): Promise<AuthUser> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

// Logout
export async function logout() {
  await signOut(auth);
}
