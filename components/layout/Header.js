import Link from "components/Link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  IconButton,
  Box,
  Button
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import MenuIcon from "@material-ui/icons/Menu";

import { routes } from "data/routes";

import Image from "next/image";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: `0`,
    [theme.breakpoints.down("xs")]: {
      minHeight: "16px",
      marginBottom: "0",
    },
  },
  logo: {
    color: theme.palette.secondary.main,
    width: "max-content",
    fontSize: "1.5rem",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: `50px`,
    width: `50px`,
    color: `#fff`,
    [theme.breakpoints.down("xs")]: {
      height: `40px`,
      width: `40px`,
    },
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0 6em",
  },
  link: {
    fontFamily: "Archivo",
    fontSize: "18px",
    lineHeight: "20px",
    color: theme.palette.secondary.main,
    marginRight: "49px",
    "&:hover": {
      color: theme.palette.info.main,
    },
    "&:last-child": {
      marginRight: "0",
    }
  },
  gameBtn: {
    minWidth: "198px",
    padding: "10px 70px",
    textAlign: "center",
    color: "#06070E",
    marginRight: "20px",
    backgroundColor: "#E9D758",
    border: "1px solid #E9D758",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: "#E9D758"
    }
  },
  connectBtn: {
    minWidth: "198px",
    padding: "10px 0px",
    textAlign: "center",
    color: "#E9D758",
    border: "1px solid #E9D758",
    borderRadius: "0"
  }
}));

const Header = ({ onConnect, address }) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const router = useRouter();

  const path = routes;

  const formatAddress = (str) => {
    return str ? str.slice(0, 5) + '...' + str.slice(str.length - 5) : '';
  }

  const tabs = (
    <>
      <Grid container justifyContent="flex-end" spacing={4}>
        {path.map(({ name, link }) => (
          <Grid item key={link} style={{ display: "flex", alignItems: "center" }}>
            <Link href={link}>
              <Typography
                className={classes.link}
                style={{
                  fontWeight: router.pathname === link && "bold",
                  borderBottom: router.pathname === link && "1px solid #E9D758",
                }}
              >
                {name}
              </Typography>
            </Link>
          </Grid>
        ))}
        <Grid item>
          <Button size="medium" className={classes.gameBtn}>
            <Typography variant="h2">GAME</Typography>
          </Button>
          {address ? (
            <Button variant="outlined" size="medium" className={classes.connectBtn}>
              <Typography variant="h2">{formatAddress(address)}</Typography>
            </Button>
          ) : (
            <Button onClick={onConnect} variant="outlined" size="medium" className={classes.connectBtn}>
              <Typography variant="h2">CONNECT</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="right"
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {path.map(({ name, link }) => (
            <ListItem
              key={link}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ListItemText disableTypography>
                <Link href={link}>
                  <Typography
                    style={{
                      color:
                        router.pathname === link
                          ? "primary"
                          : "rgb(107 107 107)",
                      fontWeight: router.pathname === link && "bold",
                    }}
                  >
                    {name}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <Image src="/drawer.png" width="70px" height="20px"></Image>
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar position="static" style={{ zIndex: 0 }} className={classes.appBar}>
          <Toolbar
            disableGutters
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              width: "100%",
              padding: matches ? "20px 16px" : "24px",
            }}
          >
            <Box>
              {!matches ?
                (
                  <Link href="/">
                    <Image src="/logo-img.png" width="198px" height="49px"></Image>
                  </Link>
                ) : (
                  <Link href="/">
                    <Image src="/mobile-logo.png" width="79px" height="72px"></Image>
                  </Link>
                )
              }
            </Box>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <div className={classes.toolbarMargin} />
    </>
  );
};
export default Header;
