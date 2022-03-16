import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Modal, Fade, Backdrop, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "400px",
    height: "400px",
    padding: "12px",
    background: "#06070E",
    outline: 0
  },
  mainWrap: {
    backgroundImage: "url('modal-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    padding: "20px 20px 40px 20px"
  },
  mainTitle: {
    flexShrink: "0",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "18px",
    lineHeight: "19px",
    color: "#7DCFB6",
    marginRight: "5px"
  },
  upcoming: {
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "12px",
    lineHeight: "13px",
    color: "#06070E",
  },
  upcomingWrap: {
    flexGrow: "1",
    height: "15px",
    background: "#7DCFB6",
    marginRight: "5px"
  },
  closeIcon: {
    background: "#EE4266",
    border: "1px solid #EE4266",
    color: "#06070E",
    cursor: "pointer",
    width: "15px",
    height: "15px",
  },
  row: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#FFFFFF",
  },
  rowWrap: {
    height: "24px"
  }
}));

export default function UnlocksModal(props) {
  const classes = useStyles();

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box className={classes.paper}>
            <Box className={classes.mainWrap}>
              <Box mb="24px" display="flex" alignItems="center">
                <Typography className={classes.mainTitle}>XGRAV</Typography>
                <Box display="flex" alignItems="center" className={classes.upcomingWrap}>
                  <Typography className={classes.upcoming}>UPCOMING UNLOCKS</Typography>
                </Box>
                <CloseIcon onClick={props.handleModalClose} className={classes.closeIcon}></CloseIcon>
              </Box>
              <Box id="unlock-scroll">
                {
                  [...Array(20).keys()].map(index => (
                    <Box key={index} style={{ background: (index % 2 == 1) ? "rgba(125, 207, 182, 0.15)" : "transparent", border: (index % 2 == 1) ? "0.25px solid rgba(125, 207, 182, 0.6)" : "0" }} className={classes.rowWrap} display="flex" justifyContent="space-between" alignItems="center">
                      <Typography className={classes.row}>1000 XGRAV</Typography>
                      <Typography className={classes.row}>DECEMBER 2, 2022</Typography>
                    </Box>
                  ))
                }
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
