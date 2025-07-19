// src/services/UsuarioService.ts

import { IUsuarioRepository } from '../domain/IUsuarioRepository';
import type { Usuario } from '../domain/Usuario';

export class UsuarioService {
  private repository: IUsuarioRepository;

  constructor(repository: IUsuarioRepository) {
    this.repository = repository;
  }

  async registrarUsuario(usuario: Usuario) {
    // Aquí puedes validar datos o agregar lógica
    await this.repository.guardarUsuario(usuario);
  }

  async obtenerUsuario(id: string) {
    return await this.repository.obtenerUsuario(id);
  }
}
