// src/ui/pages/PerfilPage.tsx
import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Flex, Heading, Stack, Text, Spinner, SimpleGrid, Divider, Input, Select, useToast } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useUsuario } from "../../context/UsuarioContext";
import type { Usuario } from "../../domain/Usuario";
import { UsuarioFirebaseDataSource } from "../../infrastructure/UsuarioFirebaseDataSource";
import { UsuarioService } from "../../services/UsuarioService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase"; // Asumo que exportas storage desde tu config firebase.ts
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  // Función para calcular edad desde fechaNacimiento
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

  const objetivoTexto: Record<string, string> = {
    ganar_musculo: "Ganar músculo",
    bajar_peso: "Bajar de peso",
  };

  // Convierte fechaNacimiento a string "YYYY-MM-DD" para el input date
  const fechaNacimientoISO = form.fechaNacimiento
    ? (typeof form.fechaNacimiento === "object" && "toDate" in form.fechaNacimiento
      ? form.fechaNacimiento.toDate().toISOString().substring(0, 10)
      : new Date(form.fechaNacimiento).toISOString().substring(0, 10))
    : "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (!prev) return null;

      // Para fechaNacimiento, guardamos como Date o string ISO
      if (name === "fechaNacimiento") {
        return {
          ...prev,
          [name]: value, // guardamos el string ISO para enviar luego (puedes adaptar según backend)
        };
      }

      // Solo convierte a number para campos específicos (peso, altura)
      if (["peso", "altura"].includes(name)) {
        const numericValue = value === "" ? "" : Number(value);
        return {
          ...prev,
          [name]: numericValue,
        };
      }

      // Para otros campos (nombre, objetivo) se mantiene string
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      // Llamamos al servicio para actualizar usuario
      await usuarioService.actualizarUsuario(form);

      // Actualizamos contexto con nuevo usuario
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

  // Convertir createdAt de Firestore Timestamp a fecha legible
  const createdAtDate =
    usuario.createdAt &&
    typeof usuario.createdAt === "object" &&
    "toDate" in usuario.createdAt
      ? usuario.createdAt.toDate()
      : new Date(usuario.createdAt);

  // Calcular edad a mostrar (solo lectura)
  const edadCalculada = form.fechaNacimiento
    ? calcularEdad(
        typeof form.fechaNacimiento === "object" && "toDate" in form.fechaNacimiento
          ? form.fechaNacimiento.toDate()
          : new Date(form.fechaNacimiento)
      )
    : null;

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
        // Ref en storage: "usuarios/{id}.jpg"
        const storageRef = ref(storage, `usuarios/${usuario!.id}.jpg`);

        // Subir archivo
        await uploadBytes(storageRef, file);

        // Obtener URL pública
        const url = await getDownloadURL(storageRef);

        // Actualizar estado foto
        setPhotoURL(url);

        // Actualizar usuario en Firestore con la nueva URL
        const usuarioActualizado = { ...form!, fotoPerfilUrl: url };
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


  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Navbar ocupa todo el ancho */}
      <Navbar />

      {/* Contenido del perfil centrado */}
      <Flex justify="center" align="flex-start" flex="1" p={8}>
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          maxW="480px"
          w="100%"
          textAlign="center"
        >
          <Stack spacing={6} align="center">
            {/* Aquí va todo el contenido que ya tienes dentro del Box */}
            <Avatar name={form.nombre} size="xl" src={photoURL ?? undefined} />
        
        {isEditing && (
          <Button as="label" size="sm" cursor="pointer" isLoading={uploading}>
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
            <Input name="nombre" value={form.nombre} onChange={handleChange} autoFocus />
          ) : (
            form.nombre
          )}
        </Heading>

        <Text color="gray.600" fontWeight="medium">
          {user?.email ?? usuario.correo ?? "correo@example.com"}
        </Text>

        <Divider borderColor="gray.200" width="100%" />

        <SimpleGrid columns={2} spacing={4} width="100%" textAlign="left">
          <Box>
            <Text fontWeight="bold">Objetivo</Text>
            {isEditing ? (
              <Select name="objetivo" value={form.objetivo} onChange={handleChange}>
                <option value="ganar_musculo">Ganar músculo</option>
                <option value="bajar_peso">Bajar de peso</option>
              </Select>
            ) : (
              objetivoTexto[form.objetivo]
            )}
          </Box>

          <Box>
            <Text fontWeight="bold">Altura</Text>
            {isEditing ? (
              <Input type="number" name="altura" value={form.altura} onChange={handleChange} min={140} max={220} />
            ) : (
              `${form.altura} cm`
            )}
          </Box>

          <Box>
            <Text fontWeight="bold">Peso</Text>
            {isEditing ? (
              <Input type="number" name="peso" value={form.peso} onChange={handleChange} min={40} max={180} />
            ) : (
              `${form.peso} kg`
            )}
          </Box>

          <Divider gridColumn="span 2" borderColor="gray.200" />

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
                max={new Date().toISOString().substring(0, 10)} // No puede ser fecha futura
              />
            ) : fechaNacimientoISO ? (
              new Date(fechaNacimientoISO).toLocaleDateString()
            ) : (
              "No especificada"
            )}
          </Box>

          <Divider gridColumn="span 2" borderColor="gray.200" />

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

        <Divider borderColor="gray.200" width="100%" />

        {isEditing ? (
          <Stack direction="row" spacing={4}>
            <Button colorScheme="green" onClick={handleSave} isLoading={saving}>
              Guardar
            </Button>
            <Button onClick={() => setIsEditing(false)} isDisabled={saving}>
              Cancelar
            </Button>
          </Stack>
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
