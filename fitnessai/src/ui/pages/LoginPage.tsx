import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  useToast,
  Image,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
        icon: <WarningIcon />,
      });
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido/a a FitnessAI. Prepárate para transformar tu entrenamiento.",
        status: "success",
        duration: 3500,
        isClosable: true,
        position: "top",
        icon: <CheckCircleIcon />,
        // onCloseComplete: () => {
        //   navigate("/dashboard");
        // },
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas. Intenta nuevamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        icon: <WarningIcon />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Flex minH="100vh" w="100vw">
      {/* Izquierda: imagen 50% */}
      <Box flex="1" position="relative" display={{ base: "none", md: "block" }}>
        <Image
          src="/images/fitness-image.jpg"
          alt="Fitness"
          objectFit="cover"
          width="100%"
          height="100vh"
        />
      </Box>

      {/* Derecha: formulario 50% */}
      <Flex
        flex="1"
        direction="column"
        justify="center"
        align="center"
        bg="white"
        p={12}
        overflowY="auto"
      >
        <Container maxW="md">
          <Heading mb={8} textAlign="center" color="brand.700">
            Iniciar sesión
          </Heading>
          <Stack spacing={4}>
            <Input
              placeholder="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="brand.700"
            />
            <InputGroup>
              <Input
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="brand.700"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                  variant="ghost"
                  tabIndex={-1}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              colorScheme="brand"
              bg="brand.700"
              color="white"
              _hover={{ bg: "brand.800" }}
              size="lg"
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Iniciando sesión"
              spinnerPlacement="start"
              borderRadius="full"
              fontWeight="bold"
            >
              Iniciar Sesión
            </Button>

            {/* Texto tipo Facebook para registro */}
            <Stack direction="row" justify="center" align="center" spacing={2} mt={4}>
              <Text color="gray.600" fontSize="sm">
                ¿No tienes una cuenta?
              </Text>
              <Button
                variant="link"
                color="brand.700"
                fontWeight="bold"
                onClick={goToRegister}
                _hover={{ textDecoration: "underline" }}
                fontSize="sm"
              >
                Crear cuenta
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Flex>
    </Flex>
  );
}
