// src/services/UsuarioService.ts

import { IUsuarioRepository } from '../domain/IUsuarioRepository';
import type { Usuario } from '../domain/Usuario';

export class UsuarioService {
  private repository: IUsuarioRepository;

  constructor(repository: IUsuarioRepository) {
    this.repository = repository;
  }

  async registrarUsuario(usuario: Usuario) {
    await this.repository.guardarUsuario(usuario);
  }

  async obtenerUsuario(id: string) {
    return await this.repository.obtenerUsuario(id);
  }

  async actualizarUsuario(usuario: Partial<Usuario> & { id: string }) {
    // Aquí puedes validar o hacer lógica antes de actualizar
    await this.repository.actualizarUsuario(usuario);
  }
}
