// src/infrastructure/UsuarioFirebaseDataSource.ts

import { IUsuarioRepository } from '../domain/IUsuarioRepository';
import type { Usuario } from '../domain/Usuario';
import { db } from '../app/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export class UsuarioFirebaseDataSource implements IUsuarioRepository {
  
  async guardarUsuario(usuario: Usuario): Promise<void> {
    await setDoc(doc(db, 'usuarios', usuario.id), usuario);
  }

  async obtenerUsuario(id: string): Promise<Usuario | null> {
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Usuario;
    }
    return null;
  }
  
  async actualizarUsuario(usuario: Partial<Usuario> & { id: string }): Promise<void> {
    const docRef = doc(db, 'usuarios', usuario.id);
    // Actualiza solo los campos que vienen en usuario
    await updateDoc(docRef, usuario);
  }
}
