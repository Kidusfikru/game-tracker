import { createTheme } from "@mui/material/styles";

const darkGameTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00aff4",
    },
    secondary: {
      main: "#d32f2f",
    },
    background: {
      default: "#181c24",
      paper: "#232837",
    },
    text: {
      primary: "#fff",
      secondary: "#b0b8c1",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Roboto", "Arial", "sans-serif"].join(","),
    h3: {
      fontWeight: 900,
      letterSpacing: 2,
      textShadow: "0 2px 8px #000, 0 0px 2px #00aff4",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "linear-gradient(135deg, #232837 60%, #1b2838 100%)",
          boxShadow: "0 4px 32px 0 #000a, 0 1.5px 4px 0 #00aff4a0",
        },
      },
    },
  },
});

export default darkGameTheme;
