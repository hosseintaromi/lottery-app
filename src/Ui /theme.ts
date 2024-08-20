import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#BD3233",
    },
    secondary: {
      main: "#BD3233",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          fontFamily: "Vazirmatn!important",
        },
        html: {
          fontFamily: "Vazirmatn!important",
        },
        body: {
          fontFamily: "Vazirmatn!important",
        },
      },
    },
  },
});

export default theme;
