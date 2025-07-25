import { Box } from "@chakra-ui/react";

export const VideoPlayer = () => {
  return (
    <Box
      w="400px"
      h="100vh"
      bg="brand.800"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <video
        src="/videos/raton-gym.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
      >
        Tu navegador no soporta video HTML5.
      </video>
    </Box>
  );
};
