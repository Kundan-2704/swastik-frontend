
import { createTheme } from "@mui/material";

export const customeTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#8B5E34",        // Royal Brown Gold
      dark: "#6B4423",        // Deep Antique Brown
      light: "#D9A86C",       // Soft luxury gold
      contrastText: "#FFF8ED"
    },

    secondary: {
      main: "#FAF3E0",        // Warm Ivory Cream
      light: "#FFF8ED",
      dark: "#EAD9BF",
      contrastText: "#3B302A"
    },

    background: {
      default: "#FFFCF7",     // Premium Ivory
      paper: "#FFFFFF"
    },

    text: {
      primary: "#3B302A",     // Deep coal brown
      secondary: "#7A6A58"    // Muted ethnic brown
    },

    divider: "#C89F5D"        // Thin luxury gold border
  },

  typography: {
    fontFamily: ["Poppins", "serif"].join(","),

    h1: { fontWeight: 600, letterSpacing: "0.5px" },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    body1: { color: "#3B302A" },
    button: { textTransform: "none", fontWeight: 600 }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
        }
      }
    }
  }
});
