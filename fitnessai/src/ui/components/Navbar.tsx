import {
  Box,
  Flex,
  Text,
  IconButton,
  Spacer,
  useColorModeValue,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.800")} px={6} py={4} shadow="sm">
        <Flex align="center">
          <Text
            fontWeight="bold"
            fontSize="xl"
            color="brand.700"
            cursor="pointer"
            onClick={() => navigate("/dashboard")}
            _hover={{ textDecoration: "underline" }}
          >
            FitnessAI
          </Text>

          <Spacer />

          <Button
            size="sm"
            variant="ghost"
            mr={3}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>

          <IconButton
            aria-label="Perfil"
            icon={<FiUser />}
            variant="ghost"
            fontSize="20px"
            onClick={() => navigate("/dashboard/perfil")}
            mr={3}
          />

          <Button size="sm" colorScheme="red" onClick={onOpen}>
            Cerrar sesión
          </Button>
        </Flex>
      </Box>

      {/* Modal de confirmación */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar cierre de sesión
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que quieres cerrar sesión?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Cerrar sesión
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
