// src/domain/IUsuarioRepository.ts

import type { Usuario } from '../domain/Usuario';

export abstract class IUsuarioRepository {
  abstract guardarUsuario(usuario: Usuario): Promise<void>;
  abstract obtenerUsuario(id: string): Promise<Usuario | null>;
}
