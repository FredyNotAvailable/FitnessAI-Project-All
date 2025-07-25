import type { Timestamp } from "firebase/firestore";

export interface Usuario {
  id: string;
  nombre: string;
  fechaNacimiento: Date | Timestamp | string;
  fotoURL?: string;
  createdAt: Date | Timestamp | string;
}

