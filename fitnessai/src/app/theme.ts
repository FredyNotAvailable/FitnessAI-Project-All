import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#4a5568", // gris principal
      600: "#2d3748",
      700: "#1a202c",
      800: "#171923",
      900: "#0f1115",
    },
    gray: {
      50: "#ffffff",    // blanco puro
      100: "#e1e4e8",   // gris muy claro, pero más oscuro que antes
      200: "#b0b8c1",   // gris claro más intenso
      300: "#8892a0",   // gris medio oscuro
      400: "#626d7e",   // gris oscuro suave
      500: "#444e61",   // gris oscuro más marcado
      600: "#2f3744",   // gris muy oscuro
      700: "#1f2531",   // gris casi negro
      800: "#151a24",
      900: "#0b0e12",
    },
  },
  fonts: {
    heading: "'Roboto', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: { bg: "brand.600" },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
  },
});

export default theme;
