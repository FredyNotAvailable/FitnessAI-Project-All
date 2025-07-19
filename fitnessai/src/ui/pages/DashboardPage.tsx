import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../app/firebase"; // ajusta la ruta si es necesario
import { signOut } from "firebase/auth";

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <Flex direction="column" minH="100vh" p={8} bg="gray.50" align="center" justify="center">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" maxW="600px" width="100%" textAlign="center">
        <Heading mb={4} color="brand.700">
          Bienvenido a FitnessAI
        </Heading>
        <Text fontSize="lg" mb={6}>
          ¡Has iniciado sesión correctamente!
        </Text>
        <Button colorScheme="brand" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>
    </Flex>
  );
}
