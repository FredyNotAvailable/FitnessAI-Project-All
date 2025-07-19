// src/domain/Usuario.ts

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  edad: number;
  peso: number;
  altura: number;
  objetivo: 'ganar_musculo' | 'bajar_peso';
  createdAt: string;
}
