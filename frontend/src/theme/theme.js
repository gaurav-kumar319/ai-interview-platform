import { createTheme } from "@mui/material/styles";


const theme = createTheme({

  palette: {

    mode: "light",

    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#7c3aed",
    },

    background: {

      default: "#f8fafc",

      paper: "#ffffff",

    },

  },


  typography: {

    fontFamily:
      "Inter, Roboto, Arial, sans-serif",

    h4: {

      fontWeight: 700,

    },

    h5: {

      fontWeight: 600,

    },

  },


  shape: {

    borderRadius: 14,

  },


});



export default theme;