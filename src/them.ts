import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    gradients: {
      primary: string;
    };
  }
  interface ThemeOptions {
    gradients?: {
      primary?: string;
    };
  }
}

const brandPink = "#f5228e";
const brandSky = "#13c2f9";
const primaryGradient = `linear-gradient(135deg, ${brandPink} 0%, ${brandSky} 100%)`;

export default function theme() {
  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: brandPink,
      },
      secondary: {
        main: "#ffffff",
      },
      error: {
        main: "#f81919",
      },
      warning: {
        main: "#ff8000",
      },
      success: {
        main: "#27b621",
      },
      info: {
        main: brandSky,
      },
      background: {
        default: "#000",
        paper: "#121212",
      },
      text: {
        primary: "#fff",
        secondary: "#b3b3b3",
      },
      action: {
        hover: "#282828",
        active: "#333",
      },
    },
    gradients: {
      primary: primaryGradient,
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h1: {
        fontWeight: 700,
        fontSize: "24px",
      },
      h2: {
        fontSize: "1rem",
      },
      body1: {
        fontSize: "14px",
      },
      subtitle1: {
        fontSize: "0.6875rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "30px",
            textTransform: "none",
          },
          containedPrimary: {
            backgroundImage: primaryGradient,
            color: "#ffffff",
            "&:hover": {
              backgroundImage: primaryGradient,
              filter: "brightness(1.08)",
            },
          },
          containedSecondary: {
            backgroundColor: "#ffffff",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          },
          sizeLarge: {
            padding: "8px 32px",
            fontWeight: 700,
            fontSize: "16px",
          },
        },
      },
    },
  });
}
