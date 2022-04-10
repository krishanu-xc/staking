import Layout from "components/layout/Layout";

import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from 'react-scroll';
import Accordion from "../components/Home/Accordion"
import clsx from "clsx";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link as Links } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  img: {
    width: "100%",
    height: "auto",
    boxShadow: "0px 2px 20px rgba(0,0,0,0.4)",
  },
  gamingBlock: {
    backgroundImage: "url('banner.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%",
    backgroundPosition: "center",
    height: "407px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "45px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "30px"
    }
  },
  buttonCta: {
    width: "175px",
    height: "48px"
  },
  centerBlock: {
    backgroundImage: "url('banner-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "224px",
    height: "194px",
    display: "flex",
    alignItems: "end",
    justifyContent: "end"
  },
  leftSide: {
    position: "sticky",
    top: 20,
    minWidth: "275",
    textAlign: "left",
    "& img": {
      width: "40px",
      height: "40px",
      marginRight: "10px",
      marginBottom: "10px",
    }
  },
  oneverseTitle: {
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    WebkitTextFillColor: "#000",
    WebkitTextStroke: "1px #E9D758",
    marginBottom: "40px"
  },
  mobileTitle1: {
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    WebkitTextFillColor: "#000",
    WebkitTextStroke: "1px #E9D758",
    marginBottom: "65px",
    fontSize: "58px",
    lineHeight: "63px",
    fontWeight: 800,
    paddingLeft: "16px"
  },
  composeTitle: {
    backgroundImage: "url('vector.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "40px",
    display: "flex",
    alignItems: "center",
    marginBottom: "67px",
    "& h1": {
      fontSize: "24px",
      lineHeight: "26px",
      letterSpacing: "0.05em",
      color: "#E9D758",
      paddingLeft: "16px",
      paddingBottom: "7px"
    },
    [theme.breakpoints.down("xs")]: {
      height: "50px",
      marginBottom: "50px",
      "& h1": {
        fontSize: "18px",
        fontWeight: "800",
        lineHeight: "20px",
        color: "#E9D758",
      },
    }
  },
  nftsBlock1: {
    marginTop: "50px",
    marginBottom: "60px",
  },
  nftsBlock2: {
    marginBottom: "350px",
  },
  nftImg: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: "16px"
    }
  },
  nftsBox1: {
    backgroundImage: "url('nft-block1.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "350px",
  },
  nftsBox2: {
    backgroundImage: "url('nft-block2.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "350px",
  },
  puffs: {
    fontSize: "24px",
    lineHeight: "26px",
    fontWeight: 800,
    color: "#74CFEB",
    paddingTop: "13px",
    paddingBottom: "10px",
    width: "36%",
    textAlign: "center",
  },
  mobileTitle: {
    fontSize: "24px",
    lineHeight: "26px",
    fontWeight: 800,
    color: "#E9D758",
    paddingLeft: "16px"
  },
  harmolecules: {
    fontSize: "24px",
    lineHeight: "26px",
    fontWeight: 800,
    color: "#EE4266",
    width: "61%",
    textAlign: "center",
    paddingTop: "13px",
    paddingBottom: "10px"
  },
  puffsContent: {
    border: "1px solid #74CFEB",
    background: "#333745",
    padding: "58px",
    height: "252px",
    marginTop: "14px",
    marginBottom: "12px",
    marginRight: "8%",
    [theme.breakpoints.down("xs")]: {
      padding: "42px",
    }
  },
  buyBtn: {
    backgroundImage: "url('buy-button.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "109px",
    height: "42px",
    marginLeft: "20px",
  },
  learnMoreBtn: {
    backgroundImage: "url('buy-button.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "197px",
    height: "42px",
  },
  ctaBtn: {
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    color: "#74CFEB"
  },
  puffPoint: {
    width: "6px",
    height: "6px",
    background: "#06070E",
    border: "1px solid #74CFEB",
    boxSizing: "border-box",
    transform: "matrix(0.71, -0.7, 0.71, 0.71, 0, 0)"
  },
  puffPointContent: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "14px",
    fontWeight: 400,
    color: "#fff",
    marginLeft: "20px",
    textAlign: "left"
  },
  harmoPoint: {
    width: "6px",
    height: "6px",
    background: "#06070E",
    border: "1px solid #EE4266",
    boxSizing: "border-box",
    transform: "matrix(0.71, -0.7, 0.71, 0.71, 0, 0)"
  },
  harmoPointContent: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "14px",
    fontWeight: 400,
    color: "#fff",
    marginLeft: "20px"
  },
  harmoLearnMore: {
    backgroundImage: "url('learn-more-button-1.png')",
  },
  harmoBuy: {
    backgroundImage: "url('buy-button-1.png')",
  },
  harmoColor: {
    color: "#EE4266"
  },
  harmoBorder: {
    border: "1px solid #EE4266",
  },
  leftMenu: {
    "& h2": {
      backgroundImage: "url('menu-frame.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      padding: "9px",
      paddingLeft: "15px",
      marginBottom: "16px",
      color: "#333745",
      fontSize: "14px",
      lineHeight: "15px",
    },
    "&.active h2": {
      backgroundImage: "url('menu-active.png')",
      color: "#fff"
    }
  }
}));

const About = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout
      // type your page title and page description.
      title="ONEVERSE"
      description="A multiplayer P2E experience on Harmony Network"
    >
      <Container disableGutters={matches}>
        <Grid container spacing={5}>
          {!matches &&
            (<Grid item md={2} >
              <Box className={classes.leftSide}>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="oneverse" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    ONEVERSE
                  </Typography>
                </Link>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="gaming" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    GAMING
                  </Typography>
                </Link>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="token" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    TOKEN
                  </Typography>
                </Link>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="nfts" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    NFTs
                  </Typography>
                </Link>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="future" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    FUTURE
                  </Typography>
                </Link>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="puffs" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    PUFFS
                  </Typography>
                </Link>
                <Link href="#" className={classes.leftMenu} style={{ textDecoration: "none" }} to="harmolecules" duration={2000} spy={true} smooth={true}>
                  <Typography variant="h2">
                    HARMOLECULES
                  </Typography>
                </Link>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  <Links target="_blank" href="https://twitter.com/ONEverseONE">
                    <img width="20px" height="18px" src="/twitter.png" ></img>
                  </Links>
                  <Links target="_blank" href="https://discord.gg/ONEverse">
                    <img width="20px" height="20px" src="/discord.png"></img>
                  </Links>
                  <Links target="_blank" href="https://ovexclusive.com/">
                    <img width="20px" height="20px" style={{ marginRight: 0 }} src="/medium.png"></img>
                  </Links>
                  <Links target="_blank" href="https://t.me/ONEverseONEofficial">
                    <img width="20px" height="20px" src="/telegram.png"></img>
                  </Links>
                  <Links target="_blank" href="https://www.reddit.com/r/ONEverse/">
                    <img width="20px" height="20px" src="/reddit.png"></img>
                  </Links>
                </Box>
              </Box>
            </Grid>)}
          <Grid item md={10} xs={12}>
            <Box id="oneverse">
              <Box className={classes.gamingBlock}>
                <Box className={classes.centerBlock}>
                  <Links href="https://testnet.oneverse.one/">
                    <Button className={classes.buttonCta}></Button>
                  </Links>
                </Box>
              </Box>
              <Box>
                {!matches ? (
                  <Typography variant="h3" className={classes.oneverseTitle}>
                    ENTER THE ONEVERSE
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h3" className={classes.mobileTitle}>
                      ENTER THE
                    </Typography>
                    <Typography variant="h3" className={classes.mobileTitle1}>
                      ONEVERSE
                    </Typography>
                  </>
                )}
                <Box className={classes.composeTitle}>
                  <Typography variant="h1">
                    COMPOSITION OF {matches && <br></br>} THE ONEVERSE
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Accordion></Accordion>
            <Grid container id="puffs" className={classes.nftsBlock1} spacing={7}>
              <Grid item md={5} xs={12} >
                <img className={classes.nftImg} src="puffs.png"></img>
              </Grid>
              <Grid item md={7} xs={12} style={{ margin: matches ? "16px" : "0" }}>
                <Box className={classes.nftsBox1}>
                  <Typography className={classes.puffs} variant="h1">PUFFS</Typography>
                  <Box className={classes.puffsContent}>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.puffPoint}>
                      </Box>
                      <Box className={classes.puffPointContent}>
                        1 PUFF NFT
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.puffPoint}>
                      </Box>
                      <Box className={classes.puffPointContent}>
                        ACCESS TO PUFFS GAME
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.puffPoint}>
                      </Box>
                      <Box className={classes.puffPointContent}>
                        ABILITY TO BREED PUFFS
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.puffPoint}>
                      </Box>
                      <Box className={classes.puffPointContent}>
                        ACCESS TO THE FINAL BATTLE
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.puffPoint}>
                      </Box>
                      <Box className={classes.puffPointContent}>
                        ACCESS TO AIRDROPS & OTHER REWARDS
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.puffPoint}>
                      </Box>
                      <Box className={classes.puffPointContent}>
                        24/7 SUPPORT
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Links target="_blank" href="https://puffs.one/">
                      <Button className={classes.learnMoreBtn}>
                        <Typography variant="h2" className={classes.ctaBtn}>
                          LEARN MORE
                        </Typography>
                      </Button>
                    </Links>
                    <Links target="_blank" href="https://nftkey.app/collections/puffs/">
                      <Button className={classes.buyBtn}>
                        <Typography variant="h2" className={classes.ctaBtn}>
                          BUY
                        </Typography>
                      </Button>
                    </Links>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container id="harmolecules" className={classes.nftsBlock2} spacing={7}>
              <Grid item md={5} xs={12} >
                <img className={classes.nftImg} src="harmolecules.png"></img>
              </Grid>
              <Grid item md={7} xs={12} style={{ margin: matches ? "16px" : "0" }}>
                <Box className={classes.nftsBox2}>
                  <Typography className={classes.harmolecules} variant="h1">HARMOLECULES</Typography>
                  <Box className={clsx(classes.puffsContent, classes.harmoBorder)}>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.harmoPoint}>
                      </Box>
                      <Box className={classes.harmoPointContent}>
                        1 HARMOLECULE NFT
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.harmoPoint}>
                      </Box>
                      <Box className={classes.harmoPointContent}>
                        ACCESS TO HARMOLECULE GAME
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.harmoPoint}>
                      </Box>
                      <Box className={classes.harmoPointContent}>
                        ABILITY TO CREATE REACTIONS
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.harmoPoint}>
                      </Box>
                      <Box className={classes.harmoPointContent}>
                        ACCESS TO DISCORD ROLES
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.harmoPoint}>
                      </Box>
                      <Box className={classes.harmoPointContent}>
                        ACCESS TO AIRDROPS & OTHER REWARDS
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" mb="10px">
                      <Box className={classes.harmoPoint}>
                      </Box>
                      <Box className={classes.harmoPointContent}>
                        24/7 SUPPORT
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Button className={clsx(classes.learnMoreBtn, classes.harmoColor, classes.harmoLearnMore)}>
                      <Typography variant="h2" className={clsx(classes.ctaBtn, classes.harmoColor)}>
                        LEARN MORE
                      </Typography>
                    </Button>
                    <Button className={clsx(classes.buyBtn, classes.harmoColor, classes.harmoBuy)}>
                      <Typography variant="h2" className={clsx(classes.ctaBtn, classes.harmoColor)}>
                        BUY
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
