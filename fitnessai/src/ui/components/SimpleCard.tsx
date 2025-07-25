import { Box, Image, Text } from "@chakra-ui/react";

interface CardProps {
  titulo: string;
  imagenUrl: string;
  descripcion: string;
}

export const SimpleCard = ({ titulo, imagenUrl, descripcion }: CardProps) => {
  return (
    <Box
      w="250px"
      h="320px"  // aumenté la altura total
      bg="brand.700"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      _hover={{ boxShadow: "xl" }}
      color="white"
      flexShrink={0} // evita que se encoja en flex row
    >
      {/* Título fijo en altura */}
      <Box p={3} borderBottom="1px solid" borderColor="whiteAlpha.300" flexShrink={0}>
        <Text fontWeight="bold" fontSize="lg" noOfLines={1} textAlign="center">
          {titulo}
        </Text>
      </Box>

      {/* Imagen con alto fijo aumentado */}
      <Box flexShrink={0} h="160px" overflow="hidden">
        <Image
          src={imagenUrl}
          alt={titulo}
          objectFit="cover"
          w="100%"
          h="100%"
          loading="lazy"
          draggable={false}
        />
      </Box>

      {/* Descripción con más líneas permitidas */}
      <Box p={3} flex={1} overflow="hidden">
        <Text fontSize="sm" color="whiteAlpha.800" noOfLines={5} textAlign="center">
          {descripcion}
        </Text>
      </Box>
    </Box>
  );
};
