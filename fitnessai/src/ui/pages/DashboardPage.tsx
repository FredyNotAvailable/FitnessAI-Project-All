import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaRegSmile, FaChartBar, FaClipboardList, FaExchangeAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegistro = () => {
    // Navega a la página del registro diario
    navigate("/dashboard/registro-diario");
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.50" fontFamily="'Open Sans', sans-serif">
      <Navbar />

      <Flex direction="column" flex="1" p={8} maxW="960px" mx="auto" w="100%" align="center">
        <Heading size="lg" color="brand.600" mb={4} textAlign="center">
          Hola, [nombre] 👋 ¿Cómo va tu día?
        </Heading>

        <Button
          size="lg"
          colorScheme="teal"
          leftIcon={<FaClipboardList />}
          onClick={handleRegistro}
          mb={8}
        >
          Registrar día
        </Button>

        <Stack direction={{ base: "column", md: "row" }} spacing={6} w="100%" justify="center">
          {/* Último resumen */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            flex="1"
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
          >
            <Icon as={FaRegSmile} boxSize={6} color="blue.500" mb={2} />
            <Text fontSize="xl" fontWeight="semibold" color="gray.700">
              Último resumen
            </Text>
            <Text color="gray.500" mt={2}>Verás un resumen de tu día aquí.</Text>
          </Box>

          {/* Progreso semanal */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            flex="1"
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
          >
            <Icon as={FaChartBar} boxSize={6} color="green.500" mb={2} />
            <Text fontSize="xl" fontWeight="semibold" color="gray.700">
              Progreso semanal
            </Text>
            <Text color="gray.500" mt={2}>Pronto verás tus estadísticas semanales.</Text>
          </Box>

          {/* Cambiar rutina */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            flex="1"
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
          >
            <Icon as={FaExchangeAlt} boxSize={6} color="purple.500" mb={2} />
            <Text fontSize="xl" fontWeight="semibold" color="gray.700">
              Cambiar rutina
            </Text>
            <Text color="gray.500" mt={2}>Opcional: actualiza tus metas o tipo de rutina.</Text>
          </Box>
        </Stack>
      </Flex>
      <ChatBot />
    </Flex>
  );
}
