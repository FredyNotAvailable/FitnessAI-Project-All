import type { Timestamp } from "firebase/firestore";

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  fechaNacimiento: Date | Timestamp | string; // fecha de nacimiento
  peso: number;
  altura: number;
  objetivo: "ganar_musculo" | "bajar_peso";
  createdAt: Date | Timestamp | string;
}
