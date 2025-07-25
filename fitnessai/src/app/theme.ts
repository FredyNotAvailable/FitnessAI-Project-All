import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50:  "#f5f5f5",
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#4d4d4d",
      700: "#333333",
      800: "#232323ff",
      900: "rgba(24, 24, 24, 1)",
    },
    gray: {
      50:  "#fafafa",
      100: "#f0f0f0",
      200: "#d9d9d9",
      300: "#bfbfbf",
      400: "#a6a6a6",
      500: "#8c8c8c",
      600: "#737373",
      700: "#595959",
      800: "#404040",
      900: "#262626",
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
