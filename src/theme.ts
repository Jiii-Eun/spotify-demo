import { createTheme } from "@mui/material";

declare module "@mui/material" {
  interface Theme {
    gradients: {
      primary: string;
      secondary: string;
    };
  }
  interface ThemeOptions {
    gradients?: {
      primary?: string;
      secondary?: string;
    };
  }
}

const brandPink = "#f5228e";
const brandSky = "#13c2f9";
const brandRed = "#f81919";
const brandOrange = "#ff8000";
const brandGreen = "#27b621";

const brandWhite = "#fff";

const brandBlack = "#000";

const brandBlack100 = "#3e3e3e";
const brandBlack200 = "#333333";
const brandBlack300 = "#2a2a2a";
const brandBlack400 = "#242424";
const brandBlack500 = "#1f1f1f";
const brandBlack600 = "#1a1a1a";
const brandBlack700 = "#181818";
const brandBlack800 = "#121212";
const brandBlack900 = "#0a0a0a";

const brandGray300 = "#b3b3b3";
const brandGray200 = "#d3d3d3";

const primaryGradient = `linear-gradient(135deg, ${brandPink} 0%, ${brandSky} 100%)`;
const pinkWhiteGradient = `linear-gradient(135deg, ${brandPink} 0%, ${brandWhite} 100%)`;

declare module "@mui/material/styles" {
  interface TypeBackground {
    black100: string;
    black200: string;
    black300: string;
    black400: string;
    black500: string;
    black600: string;
    black700: string;
    black800: string;
    black900: string;
  }
}

export default function theme() {
  return createTheme({
    // 색상 팔레트
    palette: {
      mode: "dark",
      primary: {
        main: brandPink,
      },
      secondary: {
        main: brandWhite,
      },
      error: {
        main: brandRed,
      },
      warning: {
        main: brandOrange,
      },
      success: {
        main: brandGreen,
      },
      info: {
        main: brandSky,
      },
      background: {
        default: brandBlack,
        paper: brandBlack800,
        black100: brandBlack100,
        black200: brandBlack200,
        black300: brandBlack300,
        black400: brandBlack400,
        black500: brandBlack500,
        black600: brandBlack600,
        black700: brandBlack700,
        black800: brandBlack800,
        black900: brandBlack900,
      },
      text: {
        primary: brandWhite,
        secondary: brandGray300,
      },
      action: {
        hover: brandGray200,
        active: brandGray300,
      },
    },
    // 그라데이션
    gradients: {
      primary: primaryGradient,
      secondary: pinkWhiteGradient,
    },
    // 폰트
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
    // 컴포넌트 스타일
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "30px",
            textTransform: "none",
          },
          sizeLarge: {
            padding: "8px 32px",
            fontWeight: 700,
            fontSize: "16px",
          },
        },
        variants: [
          {
            props: { variant: "contained", color: "primary" },
            style: {
              backgroundImage: primaryGradient,
              color: brandWhite,
              "&:hover": {
                backgroundImage: primaryGradient,
                filter: "brightness(1.08)",
              },
            },
          },
          {
            props: { variant: "contained", color: "secondary" },
            style: {
              backgroundColor: brandWhite,
              color: brandBlack,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            },
          },
        ],
      },
    },
  });
}
