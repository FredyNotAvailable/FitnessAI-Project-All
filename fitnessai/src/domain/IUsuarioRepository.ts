// src/domain/IUsuarioRepository.ts

import type { Usuario } from '../domain/Usuario';

export abstract class IUsuarioRepository {
  abstract guardarUsuario(usuario: Usuario): Promise<void>;
  abstract obtenerUsuario(id: string): Promise<Usuario | null>;
  
  // Nuevo método para actualizar
  abstract actualizarUsuario(usuario: Partial<Usuario> & { id: string }): Promise<void>;
}
