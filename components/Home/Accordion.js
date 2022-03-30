import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Grid, Button } from '@material-ui/core';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  img1: {
    width: "260px",
    height: "240px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      paddingBottom: "25px"
    }
  },
  img2: {
    width: "260px",
    height: "240px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "100%",
      paddingBottom: "50px"
    }
  },
  title: {
    color: "#E9D758",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
      fontWeight: "500",
      lineHeight: "22px",
    }
  },
  content: {
    width: "260px",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "17px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "30px",
      marginTop: "30px"
    }
  },
  rightFrame: {
    display: "flex",
    position: "relative",
    padding: "0 24px",
    justifyContent: "center",
    backgroundImage: "url('nft-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "top",
    marginBottom: "40px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "30px",
    }
  },
  traits: {
    padding: "0 24px"
  },
  nftTitle: {
    position: "absolute",
    top: "-18px",
    margin: "auto",
    width: "fit-content",
    padding: "8px 33px",
    fontWeight: "600",
    border: "1px solid #E9D758",
  },
  nftContent: {
    fontSize: "16px",
    lineHeight: "17px",
    fontWeight: "400",
    paddingTop: "50px",
    paddingBottom: "50px",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "40px",
      paddingBottom: "40px",
    }
  },
  nftContainer: {
    marginTop: "80px",
    marginBottom: "80px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "60px",
      marginBottom: "50px",
    }
  },
  nftContainer1: {
    marginTop: "0px",
    marginBottom: "90px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
      marginBottom: "60px",
    }
  },
  traitsTitle: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    padding: "5px 10px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#333745",
    background: 'transparent'
  },
  traitLayer: {
    cursor: "pointer",
    fontFamily: "Archivo",
    fontStyle: "normal",
    padding: "5px 10px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#EE4266",
    border: '1px solid #EE4266',
    background: "rgba(238, 66, 102, 0.37)",
    marginRight: "10px",
    marginBottom: "10px"
  },
  puffColor: {
    border: '1px solid #74CFEB',
    background: "rgba(116, 207, 235, 0.37)",
    color: "#74CFEB",
  },
  daoContent: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#fff"
  },
  daoWrapper: {
    marginTop: "16px",
    marginBottom: "16px",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  },
  daoContainer: {
    padding: "80px 30px 0 30px",
    marginBottom: "50px",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    }
  },
  daoTitle: {
    fontWeight: "600",
    fontSize: "85px",
    lineHeight: "92.48px",
    color: "#E9D758",
    letterSpacing: "0.07em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "111px",
      lineHeight: "121px",
      letterSpacing: "0.06em",
    }
  },
  daoDesc: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "20px",
    color: "#E9D758",
    letterSpacing: "0.07em",
    display: "flex",
    alignItems: "center",
    marginLeft: "100px",
    width: "200px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      fontSize: "35px",
      lineHeight: "38px",
    }
  },
  tokenBlock: {
    marginTop: "90px",
    marginBottom: "90px",
    border: "1px solid #E9D758",
  },
  tokenTitle: {
    fontFamily: "Archivo",
    fontSize: "14px",
    lineHeight: "15px",
    fontWeight: "600",
    color: "#4A51A3"
  },
  tokenDesc: {
    fontFamily: "Archivo",
    fontSize: "18px",
    lineHeight: "19.58px",
    fontWeight: "400",
    color: "#fff"
  },
  purchaseBtn: {
    fontFamily: "Archivo",
    fontSize: "16px",
    lineHeight: "17.41px",
    fontWeight: "600",
    color: "#000",
    borderRadius: "0",
    background: "#E9D758",
    width: "100%",
    padding: "17px 0",
    "&:hover": {
      background: "#E9D758",
      color: "#000",
    }
  },
  forwardIcon: {
    color: "#fff",
    fontSize: "18px",
    marginRight: "10px"
  },
}));

const Accordion = withStyles({
  root: {
    border: '0',
    outline: "none",
    WebkitBackfaceVisibility: "hidden",
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'transparent',
    WebkitBackfaceVisibility: "hidden",
    border: '0',
    outline: "none",
    marginBottom: -1,
    minHeight: 56,
    backgroundImage: "url('vector1.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 40px",
    backgroundPosition: "center",
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    display: "block",
    padding: theme.spacing(2),
    color: "#fff"
  },
}))(MuiAccordionDetails);

const CustomizedAccordions = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const harmoTraits = ['PRESSURE BADGE', 'ATTRIBUTE COUNT', 'FOGS', 'MAIN ELEMENT', 'RANK', 'BACKGROUND', 'TYPE BADGE']
  const puffTraits = ['BACKDROP', 'ATTRIBUTE COUNT', 'MAIN ELEMENT', 'BELT', 'CHAIN', 'EYE COLOR', 'HAT', 'LIGHT SABER', 'SPSV', 'MONOCLE', 'PENDANT', 'PUFF', 'RANK', 'RAYGUN', 'SMOKE', 'SPSV IDENTIFIER']

  return (
    <>
      <Accordion id="gaming" square expanded={true} >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h1" className={classes.title}>01 GAMING</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container style={{ marginTop: "60px", marginBottom: '80px' }}>
            <Grid item md={4} xs={12}>
              <Box className={classes.content}>
                We currently have two games: <br></br>
                <span style={{ color: "#E54565" }}>HARMOLECULES</span> and <span style={{ color: "#74CFEB" }}>PUFFS</span>
                <br></br>
                <br></br>
                Both take place in alternate timelines within the ONEverse.
              </Box>
            </Grid>
            <Grid item md={4} xs={12} style={{ textAlign: "center" }}>
              <img className={classes.img1} src="img1.png"></img>
            </Grid>
            <Grid item md={4} xs={12} style={{ textAlign: "center" }}>
              <img className={classes.img2} src="img2.png"></img>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion id="token" square expanded={true} >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h1" className={classes.title}>02 TOKEN</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!matches ? (
            <Grid container className={classes.tokenBlock}>
              <Grid item md={4} style={{ borderRight: '1px solid #E9D758' }}>
                <Typography style={{ marginTop: "17px", textAlign: "center" }} className={classes.tokenTitle}>ICON</Typography>
                <Box display="flex" justifyContent="center">
                  <img style={{ marginTop: "28px", marginBottom: "40px" }} src="token-icon.png"></img>
                </Box>
              </Grid>
              <Grid item md={4} style={{ borderRight: '1px solid #E9D758' }}>
                <Box display="flex" alignItems="center" style={{ padding: "14px 0 14px 18px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>TOKEN NAME</Typography>
                  <Typography style={{ paddingLeft: "15px" }} className={classes.tokenDesc}>GRAVITY</Typography>
                </Box>
                <Box display="flex" alignItems="center" style={{ padding: "14px 0 14px 18px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>HARD CAP</Typography>
                  <Typography style={{ paddingLeft: "35px" }} className={classes.tokenDesc}>25,000,000 $GRAV</Typography>
                </Box>
                <Box style={{ padding: "14px 70px 0px 18px" }}>
                  <Typography style={{ marginBottom: '18px' }} className={classes.tokenTitle}>INITIAL LIQUIDITY</Typography>
                  <Typography className={classes.tokenDesc}>$25,000 USD worth of ONE
                    paired with 2,500,000 $GRAV</Typography>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box display="flex" alignItems="center" style={{ padding: "14px 0 14px 18px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>TICKER</Typography>
                  <Typography style={{ paddingLeft: "57px" }} className={classes.tokenDesc}>$GRAV</Typography>
                </Box>
                <Box style={{ padding: "14px 60px 0px 20px" }}>
                  <Typography style={{ marginBottom: '18px' }} className={classes.tokenTitle}>TOKEN UTILITY</Typography>
                  <Box display="flex" alignItems="start">
                    <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                    <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Minting land/collections
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="start">
                    <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                    <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Flex single staking
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="start">
                    <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                    <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Breeding
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="start">
                    <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                    <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Special events
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="start">
                    <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                    <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Craftable NFTs
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4} style={{ borderTop: '1px solid #E9D758' }}>
                <Button className={classes.purchaseBtn}>PURCHASE AT THE DFK DEX</Button>
              </Grid>
              <Grid item md={8} style={{ borderTop: '1px solid #E9D758' }}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Typography className={classes.tokenTitle}>TOKEN ADDRESS</Typography>
                  <Typography style={{ paddingLeft: "40px" }} className={classes.tokenDesc}>0x5DCE7A3E8B53387A9Ee1cE0d855b7A8d948100A3 </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container style={{ border: "1px solid #E9D758", margin: "60px 0 90px 0" }}>
              <Grid item xs={6}>
                <Box style={{ padding: "10px 0 10px 10px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>TOKEN NAME</Typography>
                  <Typography style={{ marginTop: "15px" }} className={classes.tokenDesc}>GRAVITY</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ padding: "10px 0 10px 10px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>TICKER</Typography>
                  <Typography style={{ marginTop: "15px" }} className={classes.tokenDesc}>$GRAV</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box style={{ padding: "10px 0 10px 10px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>HARD CAP</Typography>
                  <Typography style={{ marginTop: "15px" }} className={classes.tokenDesc}>$25,000 USD worth of ONE  paired with 2,500,000 $GRAV</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ padding: "20px 0", borderBottom: "1px solid #E9D758" }}>
                <Box display="flex" justifyContent="center">
                  <img width="153px" height="153px" src="token-icon.png"></img>
                </Box>
                <Typography style={{ marginTop: "7px", textAlign: "center" }} className={classes.tokenTitle}>ICON</Typography>
              </Grid>
              <Grid item xs={12} style={{ borderBottom: "1px solid #E9D758" }}>
                <Box style={{ padding: "10px 0 10px 10px" }}>
                  <Typography className={classes.tokenTitle}>TOKEN UTILITY</Typography>
                  <Typography style={{ marginTop: "15px" }} className={classes.tokenDesc}>
                    Interacting with the harmonex<br></br><br></br>
                    Cosmetic items<br></br><br></br>
                    Rewarded from PvE, quests, reactions, and staking<br></br><br></br>
                    Puffs breeding
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ borderBottom: "1px solid #E9D758" }}>
                <Box style={{ padding: "10px 0 10px 10px", borderBottom: "1px solid #E9D758" }}>
                  <Typography className={classes.tokenTitle}>TOKEN ADDRESS</Typography>
                  <Typography style={{ marginTop: "15px", wordWrap: 'break-word' }} className={classes.tokenDesc}>
                    0x5DCE7A3E8B53387A9Ee1cE0d855b7A8d948100A3
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button className={classes.purchaseBtn}>PURCHASE AT THE DFK DEX</Button>
              </Grid>
            </Grid>
          )}
          <Grid container className={classes.tokenBlock}>
            <Grid item md={4} style={{ borderRight: '1px solid #E9D758' }}>
              <Typography style={{ marginTop: "17px", textAlign: "center" }} className={classes.tokenTitle}>ICON</Typography>
              <Box display="flex" justifyContent="center">
                <img style={{ width: "205px", marginTop: "28px", marginBottom: "40px" }} src="token-icon1.png"></img>
              </Box>
            </Grid>
            <Grid item md={8}>
              <Grid container>
                <Grid item md={12}>
                  <Box display="flex" alignItems="center" style={{ padding: "14px 0 14px 18px", borderBottom: "1px solid #E9D758" }}>
                    <Typography className={classes.tokenTitle}>TOKEN NAME</Typography>
                    <Typography style={{ paddingLeft: "15px" }} className={classes.tokenDesc}>ANTI-GRAVITY</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box display="flex" alignItems="center" style={{ borderBottom: "1px solid #E9D758", padding: "14px 27px 13px 18px" }}>
                <Typography style={{ marginRight: "35px" }} className={classes.tokenTitle}>HARD CAP</Typography>
                <Typography style={{ marginRight: "50px" }} className={classes.tokenDesc}>25,000,000</Typography>
                <Typography className={classes.tokenDesc}>(Total supply/price mirrors $GRAV)</Typography>
              </Box>
              <Box style={{ borderBottom: "1px solid #E9D758", padding: "14px 20px 0px 20px" }}>
                <Typography style={{ marginBottom: '18px' }} className={classes.tokenTitle}>TOKEN UTILITY</Typography>
                <Grid container>
                  <Grid item md={6}>
                    <Box display="flex" alignItems="start">
                      <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                      <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Main in-game token
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="start">
                      <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                      <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>NFT staking rewards
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Box display="flex" alignItems="start">
                      <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                      <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>Upgrade Lands (Level 1-3) <span style={{ fontStyle: "italic" }}>Quantity of materials scale with land</span>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="start">
                      <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                      <Typography style={{ marginBottom: '18px' }} className={classes.tokenDesc}>P2E Earnings
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box style={{ paddingLeft: "20px" }} display="flex" alignItems="center" height="45px">
                <Typography style={{ fontSize: "16px", lineHeight: "18px", fontWeight: "400" }} className={classes.tokenDesc}>Lock xGRAV for 4 MONTHS to receive 1:1 GRAV rewards
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion id="nfts" square expanded={true} >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="h1" className={classes.title}>03 NFTS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={classes.nftContainer} spacing={5}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src='harmo-left.png'></img>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box className={classes.rightFrame}>
                <Typography className={classes.nftTitle} variant="h2">HarMolecules</Typography>
                <Typography variant='h2' className={classes.nftContent}>
                  Some time ago scientists invented a new machine, the harmonex.  After countless experiments the crew found a breakthrough in their research, and managed to use elements to create new substances.  The first being a bright glittery substance that glowed in the dark, and naturally wanted to float away.
                  <br></br>
                  <br></br>
                  Commander X thinks there's more, and wants your help harnessing the power from 2,222 HarMolecules.  He says there's a lot we don't know about them, and maybe using the harmonex will help us uncover more.  Lately he's been asking for certain combinations, he calls them reactions, and offers a reward to anyone who can provide.
                  <br></br>
                  <br></br>
                  Scientists take a more passive role in the ONEverse, often taking time between experiments to reflect.  Will you be able to uncover all the harmonex has to offer?
                </Typography>
              </Box>
              <Box display="flex" flexWrap="wrap" className={classes.traits}>
                <Box className={classes.traitsTitle} variant='h2'>TRAITS</Box>
                {harmoTraits.map((e, index) =>
                  <Box key={index} className={classes.traitLayer} variant='h2'>{e}</Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid container className={classes.nftContainer1} spacing={5}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src='puff-left.png'></img>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box className={classes.rightFrame}>
                <Typography className={classes.nftTitle} variant="h2">Puffs</Typography>
                <Typography variant='h2' className={classes.nftContent}>
                  Pushed to the edge of their galaxy by parasites that spread through their home planets like mycelium. 8,888 Puffs are regrouping, gathering strength for their final stand. Around the same time as this a new species appeared, the humans. They call themselves scientists, and quickly manufactured machines creating seamless communication.
                  <br></br>
                  <br></br>
                  They brought what they call HarMolecules, and the Puffs think they're the key to success. Puffs have been gathering materials for more ships, practicing astronautical maneuvers, and launching mock battles to prepare for what's ahead.  They're also busy cleaning out a section of the space station that hasn't been used in decades, just to make it feel a little more like home.
                  <br></br>
                  <br></br>
                  The Puffs take a more active role in the ONEverse, there's always help to be had preparing for war.  Will they be able to work together and take back their home?
                </Typography>
              </Box>
              <Box display="flex" flexWrap="wrap" className={classes.traits}>
                <Box className={classes.traitsTitle} variant='h2'>TRAITS</Box>
                {puffTraits.map((e, index) => (
                  <Box key={index} className={clsx(classes.traitLayer, classes.puffColor)} variant='h2'>{e}</Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion id="future" square expanded={true} >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography variant="h1" className={classes.title}>04 FUTURE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} md={11} className={classes.daoContainer}>
              <Typography className={classes.daoContent} variant='h2'>
                We've been plotting the course to change the shape of ONEverse. This new shape brings more control to the community, ultimately pushing the project to true decentralization.
                <br></br>
                <br></br>
                What does the team mean when we use words like decentralize, or control to the community? Simply, it means the seeds of a DAO, or rather multiple DAOs are being planted.
                <br></br>
                <br></br>
                For those of us a little less exposed to the space, DAO stands for decentralized autonomous organization.
              </Typography>
              <Box display="flex" className={classes.daoWrapper}>
                <Typography className={classes.daoTitle} variant='h2'>
                  D.A.O
                </Typography>
                <Typography className={classes.daoDesc} variant='h2'>
                  DECENTRALIZED
                  AUTONOMOUS
                  ORGANIZATION
                </Typography>
              </Box>
              <Typography className={classes.daoContent} variant='h2'>
                Many examples of them exist such as the MetricsDAO, ReflectDAO, and Harmony Africa DAO. While this might seem complex to work out, ultimately it makes it much simpler for the community to control the narrative. There are even more examples of projects that aren't decentralized, where the team has too much centralized power, ultimately leading to the projects downfall.
                <br></br>
                <br></br>
                The innerworkings of the DAOs that will ultimately govern ONEverse are still up for discussion. Implementing a system that protects the project along with the community is a little tricky. However, by using the resources available— along with the recommendations from the Harmony team — we're confident that decentralization is an achievable task.
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default CustomizedAccordions;