import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyD6syDYTxYn9BvQA_1l3v4bHhWyxvxNk9Q";
const MapaLugaresEntrenamientoCard = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg="white"
      color="black"
    >
      <Heading size="md" mb={2}>
        Lugares para entrenar cerca de ti
      </Heading>

      <Text mb={4} color="gray.600">
        Mapa de gimnasios cercanos.
      </Text>

      <Box
        as="iframe"
        title="Mapa de gimnasios"
        src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&q=gimnasios+cerca+de+mi`}
        width="100%"
        height="300"
        style={{ borderRadius: "12px", border: 0 }}
        loading="lazy"
        allowFullScreen
      />

      <Button
        mt={4}
        as="a"
        href="https://www.google.com/maps/search/gimnasios+cerca+de+mi"
        target="_blank"
        rel="noopener noreferrer"
        colorScheme="blue"
        leftIcon={<ExternalLinkIcon size={16} />}
      >
        Ver en Google Maps
      </Button>
    </Box>
  );
};

export default MapaLugaresEntrenamientoCard;
