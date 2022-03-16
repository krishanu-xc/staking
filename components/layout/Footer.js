import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import { Box, Grid, Typography } from "@material-ui/core";

import { routes } from "data/routes";
import Social from "components/Social";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginBottom: "20px",
    backgroundImage: "url('footer.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    paddingRight: "200px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      paddingRight: "0px",
      marginBottom: "10px",
      marginTop: "100px"
    }
  },
  link: {
    fontSize: "1.25em",
    color: "#fff",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copyRight: {
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: "12px",
      lineHeight: "14px",
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  const path = routes;
  const router = useRouter();
  return (
    <footer className={classes.footer}>
      <Box className={classes.bg}>
        <Typography variant="h1" className={classes.copyRight}>
          2022 - ONEVERSE - ALL RIGHTS RESERVED
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
