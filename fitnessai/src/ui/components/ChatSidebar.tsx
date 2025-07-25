import { useState } from "react";
import {
  Box,
  VStack,
  Button,
  Text,
  Divider,
  Collapse,
  IconButton,
  useToken,
} from "@chakra-ui/react";
import { FiMenu, FiPlus, FiUser } from "react-icons/fi";
import { ProfileCard } from "./ProfileCard";
import { UsuarioService } from "../../services/UsuarioService";
import { UsuarioFirebaseDataSource } from "../../infrastructure/UsuarioFirebaseDataSource";
import { getAuth } from "firebase/auth";

const chatsDummy = Array.from({ length: 15 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Chat número ${i + 1}`,
}));

// Instancia del repositorio y servicio
const usuarioRepositoryImpl = new UsuarioFirebaseDataSource();
const usuarioService = new UsuarioService(usuarioRepositoryImpl);

export const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Obtener ID usuario actual Firebase
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid || "";

  // Obtener colores reales de la paleta
  const brand700 = useToken("colors", "brand.700"); // "#333333"
  const brand800 = useToken("colors", "brand.800"); // "#232323ff"

  return (
    <>
      <Box
        bg="brand.700"
        color="white"
        w={isOpen ? "350px" : "60px"}
        h="100vh"
        p={4}
        display="flex"
        flexDirection="column"
        transition="width 0.3s"
        position="relative"
      >
        {/* Botón para abrir/cerrar */}
        <IconButton
          aria-label={isOpen ? "Ocultar sidebar" : "Mostrar sidebar"}
          icon={<FiMenu />}
          onClick={toggleSidebar}
          size="sm"
          mb={4}
          alignSelf={isOpen ? "flex-end" : "center"}
          bg="brand.600"
          _hover={{ bg: "brand.500" }}
        />

        <Collapse in={isOpen} animateOpacity>
          {/* Botones Nuevo Chat y Perfil en lista vertical */}
          <VStack spacing={3} mb={4} align="stretch" fontSize="md">
            <Button
              leftIcon={<FiPlus />}
              colorScheme="brand"
              size="sm"
              justifyContent="flex-start"
            >
              Nuevo chat
            </Button>
            <Button
              leftIcon={<FiUser />}
              colorScheme="brand"
              size="sm"
              justifyContent="flex-start"
              onClick={() => setShowProfile(true)}
            >
              Perfil
            </Button>
          </VStack>

          <Divider borderColor="brand.500" mb={4} />

          {/* Lista de chats con scroll y estilo igual que ChatAssistant */}
          <VStack
            spacing={3}
            align="stretch"
            overflowY="auto"
            flex={1}
            maxH="calc(100vh - 180px)" // Ajusta según alto del sidebar y botones
            fontSize="md"
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: brand800,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: brand700,
                borderRadius: "24px",
              },
              scrollbarWidth: "thin",
              scrollbarColor: `${brand700} ${brand800}`,
            }}
          >
            {chatsDummy.map((chat) => (
              <Box
                key={chat.id}
                px={3}    // mantengo padding horizontal
                py={3}    // menos padding vertical para hacerlo más "chiquito"
                bg="brand.600"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "brand.500" }}
              >
                <Text isTruncated fontSize="sm">{chat.title}</Text>
              </Box>
            ))}
          </VStack>
        </Collapse>
      </Box>

      {/* ProfileCard modal-like, visible solo si showProfile es true */}
      {showProfile && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={1000}
        >
          <ProfileCard
            usuarioService={usuarioService}
            userId={currentUserId}
            onClose={() => setShowProfile(false)}
          />
        </Box>
      )}
    </>
  );
};
