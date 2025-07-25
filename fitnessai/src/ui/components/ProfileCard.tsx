import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Input,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import type { UsuarioService } from "../../services/UsuarioService";
import { logout, onAuthStateChangedListener } from "../../services/authService";  // Importa logout y listener real

interface ProfileCardProps {
  usuarioService: UsuarioService;
  onClose: () => void;
  userId: string;
}

export const ProfileCard = ({ usuarioService, onClose, userId }: ProfileCardProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carga datos usuario firestore
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuario = await usuarioService.obtenerUsuario(userId);
        if (usuario) {
          setName(usuario.nombre || "");

          // Manejo fechaNacimiento Date | Timestamp | string
          let fechaStr = "";
          if (usuario.fechaNacimiento instanceof Date) {
            fechaStr = usuario.fechaNacimiento.toISOString().substring(0, 10);
          } else if (
            usuario.fechaNacimiento &&
            typeof usuario.fechaNacimiento === "object" &&
            "toDate" in usuario.fechaNacimiento
          ) {
            fechaStr = usuario.fechaNacimiento.toDate().toISOString().substring(0, 10);
          } else if (typeof usuario.fechaNacimiento === "string") {
            fechaStr = usuario.fechaNacimiento.substring(0, 10);
          }
          setBirthday(fechaStr);

          setPhotoURL(usuario.fotoURL || "");
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    cargarUsuario();
  }, [userId, usuarioService]);

  // Escucha usuario autenticado para obtener email y displayName
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((authUser) => {
      if (authUser) {
        setEmail(authUser.email || "");
        if (!photoURL) setPhotoURL(authUser.photoURL || ""); // Actualiza foto si no hay
      } else {
        setEmail("");
      }
    });
    return () => unsubscribe();
  }, [photoURL]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await usuarioService.actualizarUsuario({
        id: userId,
        nombre: name,
        fechaNacimiento: birthday,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar perfil", error);
    }
    setLoading(false);
  };

  return (
    <Box
      w="400px"
      h="480px"
      bg="brand.800"
      p={6}
      borderRadius="md"
      boxShadow="lg"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      color="white"
    >
      <IconButton
        aria-label="Cerrar perfil"
        icon={<FiX />}
        size="sm"
        position="absolute"
        top={3}
        right={3}
        onClick={onClose}
        variant="ghost"
        color="white"
        _hover={{ bg: "brand.700" }}
      />

      <VStack spacing={3} align="center" mb={6}>
        <Avatar size="2xl" src={photoURL} name={name} />
        {!isEditing ? (
          <Text fontSize="xl" fontWeight="bold" color="white">
            {name}
          </Text>
        ) : (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            maxW="80%"
            textAlign="center"
            bg="brand.700"
            color="white"
            _placeholder={{ color: "whiteAlpha.700" }}
            borderColor="brand.600"
            _focus={{ borderColor: "brand.500" }}
          />
        )}
      </VStack>

      <HStack justify="space-between" mb={6} px={4}>
        <Box flex={1} pr={2}>
          <Text fontWeight="bold" mb={1} color="whiteAlpha.800">
            Correo
          </Text>
          <Text isTruncated color="whiteAlpha.900">
            {email}
          </Text>
        </Box>

        <Box flex={1} pl={2}>
          <Text fontWeight="bold" mb={1} textAlign="right" color="whiteAlpha.800">
            Cumpleaños
          </Text>
          {!isEditing ? (
            <Text textAlign="right" color="whiteAlpha.900">
              {birthday}
            </Text>
          ) : (
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              maxW="140px"
              textAlign="right"
              bg="brand.700"
              color="white"
              borderColor="brand.600"
              _focus={{ borderColor: "brand.500" }}
            />
          )}
        </Box>
      </HStack>

      <HStack spacing={4} justify="space-between">
        <Button
          colorScheme="red"
          onClick={handleLogout}
          flex={1}
          isLoading={loading}
          _focus={{ boxShadow: "none" }}
        >
          Cerrar sesión
        </Button>

        <Button
          colorScheme="blue"
          flex={1}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          isLoading={loading}
          isDisabled={isEditing && (!name.trim() || !birthday)}
          _focus={{ boxShadow: "none" }}
        >
          {isEditing ? "Guardar" : "Editar"}
        </Button>
      </HStack>
    </Box>
  );
};
