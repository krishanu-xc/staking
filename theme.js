import { createTheme } from "@material-ui/core/styles";

const mainBlack = "#212121";
const mainWhite = "#fafafa";
const blue = "#757ce8";
// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: mainBlack,
      white: mainWhite,
      blue: blue,
    },
    primary: {
      main: mainBlack,
    },
    secondary: {
      main: mainWhite,
    },
    info: {
      main: blue,
    },
  },
  typography: {
    h1: {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "22px",
      fontWeight: 500,
    },
    h2: {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "20px",
      fontWeight: 800,
    },
    h3: {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontSize: "83px",
      lineHeight: "90px",
      fontWeight: 800
    },
    a: {
      color: mainBlack,
    },
  },
  overrides: {
    MuiButtonGroup: {
      root: {
        cursor: "pointer"
      },
      grouped: {
        borderRadius: "0",
        minWidth: "138px"
      }
    },
    MuiButton: {
      outlinedSecondary: {
        cursor: "pointer",
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "none"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        background: "transparent",
        backgroundColor: "none"
      }
    },
    MuiFormLabel: {
      root: {
        color: "#E9D758"
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "0"
      }
    },
    MuiList: {
      padding: {
        paddingTop: "4px",
        padding: "4px",
        paddingBottom: "0px"
      }
    }
  },
});

export default theme;
