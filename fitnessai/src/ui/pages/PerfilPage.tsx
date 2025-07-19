import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useUsuario } from "../../context/UsuarioContext";
import type { Usuario } from "../../domain/Usuario";
import { UsuarioFirebaseDataSource } from "../../infrastructure/UsuarioFirebaseDataSource";
import { UsuarioService } from "../../services/UsuarioService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";

export default function PerfilPage() {
  const toast = useToast();
  const { user } = useAuth();
  const { usuario, setUsuario, loading } = useUsuario();
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Usuario | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const usuarioService = new UsuarioService(new UsuarioFirebaseDataSource());

  const objetivoTexto: Record<string, string> = {
    ganar_musculo: "Ganar músculo",
    bajar_peso: "Bajar de peso",
    ganar_fuerza: "Ganar fuerza",
    mantenerme_activo: "Mantenerme activo",
  };

  const frecuenciaTexto = (frec?: number | null) =>
    frec
      ? `${frec} ${frec === 1 ? "vez" : "veces"} por semana`
      : "No especificado";

  function calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }
    return edad;
  }

  useEffect(() => {
    if (usuario) {
      setForm(usuario);
      if (usuario.fotoURL) setPhotoURL(usuario.fotoURL);
    }
  }, [usuario]);

  if (loading || !form) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!usuario) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Text>No hay usuario autenticado</Text>
      </Flex>
    );
  }

  const fechaNacimientoISO = form.fechaNacimiento
    ? (typeof form.fechaNacimiento === "object" && "toDate" in form.fechaNacimiento
      ? form.fechaNacimiento.toDate().toISOString().substring(0, 10)
      : new Date(form.fechaNacimiento).toISOString().substring(0, 10))
    : "";

  const createdAtDate =
    usuario.createdAt &&
    typeof usuario.createdAt === "object" &&
    "toDate" in usuario.createdAt
      ? usuario.createdAt.toDate()
      : new Date(usuario.createdAt);

  const edadCalculada = form.fechaNacimiento
    ? calcularEdad(
        typeof form.fechaNacimiento === "object" && "toDate" in form.fechaNacimiento
          ? form.fechaNacimiento.toDate()
          : new Date(form.fechaNacimiento)
      )
    : null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (!prev) return null;

      type PartialUsuario = Usuario & { [key: string]: any };
      const newForm = { ...prev } as PartialUsuario;

      if (name === "fechaNacimiento") {
        newForm[name] = value; // string ISO
      } else if (name === "frecuencia") {
        const parsed = Number(value);
        const allowed = [1, 2, 3, 4, 5, 6, 7];
        if (allowed.includes(parsed)) {
          newForm[name] = parsed as 1 | 2 | 3 | 4 | 5 | 6 | 7;
        }
      } else {
        newForm[name] = value;
      }

      return newForm as Usuario;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Archivo inválido",
        description: "Solo puedes subir imágenes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `usuarios/${usuario!.id}.jpg`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);

      const usuarioActualizado = { ...form!, fotoURL: url };
      setForm(usuarioActualizado);
      await usuarioService.actualizarUsuario(usuarioActualizado);
      setUsuario(usuarioActualizado);

      toast({
        title: "Foto de perfil actualizada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al subir foto",
        description: (error as Error).message || "Intenta nuevamente",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      await usuarioService.actualizarUsuario(form);
      setUsuario(form);
      toast({
        title: "Perfil actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error al actualizar",
        description: error.message || "Intenta nuevamente",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Navbar />

      <Flex direction="column" align="center" p={8} w="100%">
        <Box
          bg="white"
          p={8}
          borderRadius="2xl"
          boxShadow="xl"
          maxW="600px"
          w="100%"
        >
          <Stack spacing={6} align="center" textAlign="center">
            <Avatar size="2xl" name={form.nombre} src={photoURL ?? undefined} />
            {isEditing && (
              <Button
                as="label"
                size="sm"
                cursor="pointer"
                isLoading={uploading}
              >
                Cambiar foto
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            )}

            <Heading size="lg" color="brand.700">
              {isEditing ? (
                <Input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                form.nombre
              )}
            </Heading>

            <Text fontSize="md" color="gray.600">
              {user?.email ?? usuario.correo}
            </Text>
          </Stack>

          <Divider my={6} />

          <SimpleGrid columns={2} spacing={5}>
            <Box>
              <Text fontWeight="bold">Objetivo</Text>
              {isEditing ? (
                <Select
                  name="objetivo"
                  value={form.objetivo ?? ""}
                  onChange={handleChange}
                >
                  {Object.entries(objetivoTexto).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Text>{form.objetivo ? objetivoTexto[form.objetivo] : "No especificado"}</Text>
              )}
            </Box>

            <Box>
              <Text fontWeight="bold">Frecuencia semanal</Text>
              {isEditing ? (
                <Select
                  name="frecuencia"
                  value={form.frecuencia ? form.frecuencia.toString() : ""}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num} {num === 1 ? "vez" : "veces"}
                    </option>
                  ))}
                </Select>
              ) : (
                <Text>{frecuenciaTexto(form.frecuencia)}</Text>
              )}
            </Box>

            <Box>
              <Text fontWeight="bold">Edad</Text>
              <Text>{edadCalculada !== null ? `${edadCalculada} años` : "No especificada"}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Fecha de nacimiento</Text>
              {isEditing ? (
                <Input
                  type="date"
                  name="fechaNacimiento"
                  value={fechaNacimientoISO}
                  onChange={handleChange}
                />
              ) : (
                <Text>
                  {fechaNacimientoISO
                    ? new Date(fechaNacimientoISO).toLocaleDateString()
                    : "No especificada"}
                </Text>
              )}
            </Box>

            <Box gridColumn="span 2">
              <Text fontWeight="bold">Fecha de registro</Text>
              <Text>
                {createdAtDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Box>
          </SimpleGrid>

          <Divider my={6} />

          <Stack direction="row" justify="center">
            {isEditing ? (
              <>
                <Button onClick={() => setIsEditing(false)} isDisabled={saving}>
                  Cancelar
                </Button>
                <Button colorScheme="green" onClick={handleSave} isLoading={saving}>
                  Guardar
                </Button>
              </>
            ) : (
              <Button colorScheme="brand" onClick={() => setIsEditing(true)}>
                Editar perfil
              </Button>
            )}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
