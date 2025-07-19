import type { Timestamp } from "firebase/firestore";

export enum Objetivo {
  GanarMusculo = "ganar_musculo",
  PerderGrasa = "perder_grasa",
  GanarFuerza = "ganar_fuerza",
}

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  fechaNacimiento: Date | Timestamp | string;
  objetivo?: Objetivo | null;
  frecuencia?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;
  setupCompleto?: boolean;
  fotoURL?: string;
  createdAt: Date | Timestamp | string;
  updatedAt?: Date | Timestamp | string;
}
