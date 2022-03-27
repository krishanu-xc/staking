import Layout from "components/layout/Layout";

import { Container, Grid, Typography, Box, Button, ButtonGroup, Tabs, Tab, Switch, Select, Input, MenuItem, Checkbox } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from 'react-scroll';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from "clsx";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import React, { useEffect, useReducer, useState } from 'react';
import Web3 from 'web3';
import { singleContractAddress, singleAbi, lockContractAddress, lockAbi, tokenAddress, tokenAbi, nftContractAddress, nftContractABI, nftAddress, nftABI, lockXGRAVContractAddress, lockXGRAVAbi } from '../public/config';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link as Links } from "@material-ui/core";

import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import UnlocksModal from '../components/Staking/UnlocksModal'
import { Provider as MulticallProvider, Contract as MulticallContract } from "ethers-multicall";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
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
  },
  flexibleBlock: {
    backgroundImage: "url('flexible-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "left",
    padding: "67px",
    paddingTop: "0px",
    marginBottom: "130px",
    [theme.breakpoints.down("xs")]: {
      padding: "16px",
      paddingTop: "0",
      backgroundSize: "180% 100%",
    }
  },
  swapBlock: {
    backgroundImage: "url('swap-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "left",
    padding: "67px",
    paddingTop: "0px",
    marginBottom: "130px",
    [theme.breakpoints.down("xs")]: {
      padding: "16px",
      paddingTop: "0",
      backgroundSize: "180% 100%",
    }
  },
  nftStakingBlock: {
    backgroundImage: "url('nft-staking-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "left",
    padding: "0px 67px",
    marginBottom: "100px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 16px",
      backgroundSize: "130% 100%",
    }
  },
  lockStakingBlock: {
    backgroundImage: "url('lock-staking-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "left",
    padding: "0px 67px",
    paddingBottom: "30px",
    marginBottom: "100px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 16px",
      backgroundSize: "216% 100%",
      paddingBottom: "10px"
    }
  },
  blockTitle: {
    paddingTop: "16px",
    color: '#E9D758',
    fontSize: "24px",
    lineHeight: "26px",
  },
  blockTitleDesc: {
    marginTop: "7px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#E9D758",
    display: "flex",
    alignItems: "center",
    marginBottom: "48px"
  },
  flexibleContent: {
    paddingTop: "60px",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "20px",
    }
  },
  nftStakingContent: {
    paddingTop: "40px",
    paddingBottom: "55px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "80px"
    }
  },
  leftFlexBlock: {
    backgroundImage: "url('flex-left.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "263px",
    textAlign: "center",
    "& .MuiButtonGroup-grouped": {
      minWidth: "100px"
    }
  },
  leftStakingBlock: {
    backgroundImage: "url('incubator-illo.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "448px",
    height: "550px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    }
  },
  flyInto: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "22px",
    color: "#E9D758",
    paddingTop: "12px"
  },
  flyInto1: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "22px",
    color: "#E9D758",
  },
  stakeOv: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "18px",
    color: "#E9D758",
    paddingTop: "28px"
  },
  flexStakeInput: {
    width: "218px",
    height: "29px",
    [theme.breakpoints.down("xs")]: {
      width: "169px",
    },
    outline: "transparent solid 2px",
    appearance: "none",
    borderRadius: "0px",
    background: "#fff",
    color: "#000",
    "& input": {
      fontSize: "1.5rem",
      fontWeight: "700",
    },
    marginTop: "6px",
    marginBottom: "6px",
    "& span": {
      cursor: "pointer",
      height: "14px"
    },
    "& .rc-input-number-handler-up": {
      border: "0"
    },
    "& .rc-input-number-handler-wrap": {
      border: "0"
    }
  },
  darkMatter: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "13px",
    marginBottom: "24px"
  },
  stakeBtn: {
    color: "#000",
    background: "#E9D758",
    border: "1px solid #E9D758",
    "&:hover": {
      border: "1px solid #E9D758",
      background: "#E9D758"
    }
  },
  unstakeBtn: {
    color: "#fff",
    border: "1px solid #E9D758",
    "&:hover": {
      border: "1px solid #E9D758",
    }
  },
  rewardBlock: {
    backgroundImage: "url('reward-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "262px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      height: "230px"
    }
  },
  stakedBlock: {
    width: "270px",
    background: "#fff",
    padding: "10px",
    marginTop: "60px",
    marginBottom: "12px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
      marginTop: "50px"
    }
  },
  rewardedBlock: {
    width: "270px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
      marginBottom: "22px",
    },
    background: "#fff",
    padding: "10px",
    marginBottom: "40px",
  },
  collectBtn: {
    height: "38px",
    width: "345px",
    [theme.breakpoints.down("xs")]: {
      width: "270px",
    },
    borderRadius: "0",
    color: "#fff",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    fontWeight: 600
  },
  rewardLabel: {
    textAlign: "left",
    color: "#000",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "13px",
    fontWeight: 600
  },
  stakedAmount: {
    color: "#000",
    fontWeight: "normal",
    marginRight: "10px"
  },
  rewardedAmount: {
    color: "#000",
    fontWeight: "normal",
    marginRight: "10px"
  },
  stakingNFT: {
    width: "100%",
    background: "#06070E",
    [theme.breakpoints.down("xs")]: {
      marginTop: "30px",
      marginBottom: "50px"
    }
  },
  nftTitle: {
    width: "fit-content",
    border: "1px solid #E9D758",
    padding: "10px 90px 10px 20px",
    borderBottom: "none",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 40px 10px 15px",
    }
  },
  totalBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E9D758",
    marginRight: "20px",
    padding: "5px 20px"
  },
  totalTitle: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#FFFFFF",
    marginRight: "50px"
  },
  gravAmount: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#E9D758",
  },
  nftStakeBtn: {
    borderRadius: "0",
    background: "#E9D758",
    color: "#000",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "217px",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#E9D758",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "16px",
      width: "160px",
    }
  },
  nftUnStakeBtn: {
    borderRadius: "0",
    background: "transparent",
    color: "#E9D758",
    paddingTop: "15px",
    paddingBottom: "15px",
    width: "100%",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    "&:hover": {
      background: "transparent",
    }
  },
  singleStakeInput: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "60%",
    transition: 'none',
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
      borderWidth: "1px"
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
    },
    "& input": {
      color: "#fff",
    },
    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      MozAppearance: "none",
      appearance: "none",
      margin: "0",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#E9D758",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "#fff",
    }
  },
  stakedInput: {
    marginRight: "20px",
    width: "100%",
    transition: 'none',
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
      borderWidth: "1px"
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
    },
    "& input": {
      color: "#fff",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#E9D758",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "#fff",
    }
  },
  unitLabel: {
    "& p": {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "26px",
      color: '#fff',
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      }
    }
  },
  unitLabel1: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    color: '#fff',
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    }
  },
  stakeAmountInput: {
    width: "100vh",
    [theme.breakpoints.down("xs")]: {
      width: "inherit",
    },
    "& input": {
      color: "#fff",
      border: "0",
      padding: "14px"
    },
    "& input::placeholder": {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "17px",
      color: '#333745'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0"
    }
  },
  claimBtn: {
    marginTop: "7px",
    background: "#7DCFB6",
    padding: "12px 19px",
    borderRadius: "0",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#000",
    height: "42px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      fontWeight: "800"
    }
  },
  topLabel: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#E9D758",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px"
    }
  },
  topLabelInfo: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#FFFFFF",
  },
  stakeAndLockBlock: {
    marginBottom: "40px",
    border: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      border: "0"
    }
  },
  stakeAndLockLeft: {
    borderLeft: "6px solid #E9D758",
    borderRight: "1px solid #E9D758",
    paddingLeft: "33px",
    paddingTop: "14px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "20px",
      paddingBottom: "30px",
      borderBottom: "1px solid #E9D758",
      borderTop: "1px solid #E9D758",
    }
  },
  stakeAndLockRight: {
    borderLeft: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderLeft: "6px solid #E9D758",
    }
  },
  stakeAndLockRightTop: {
    borderBottom: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderRight: "1px solid #E9D758",
    }
  },
  stakeAndLockRightBottomLeft: {
    borderRight: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "1px solid #E9D758",
    }
  },
  stakeAndLockRightBottomRight: {
    borderRight: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "1px solid #E9D758",
    }
  },
  stake6btn: {
    padding: "13px",
    background: "#06070E",
    width: "100%",
    height: "100%",
    borderRadius: "0",
    textAlign: "center",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "17.5px",
    color: "#E9D758",
  },
  stakeAndLockTitle: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "17.5px",
    color: "#E9D758",
    marginBottom: "17px"
  },
  stakeAndLockSubTitle: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#E9D758",
  },
  stakeAndLockSubTitle1: {
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#fff",
  },
  maxBtn: {
    borderRadius: "0",
    textAlign: "center",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "17.5px",
    color: "#E9D758",
  },
  nftImg: {
    width: "130px",
    height: "130px",
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      height: "100px",
    }
  },
  stakeInputBlock: {
    marginBottom: "70px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  activeCta: {
    background: "#E9D758",
    color: "#000",
    "&:hover": {
      background: "#E9D758",
      color: "#000",
    },
    "&.Mui-disabled": {
      background: "#333745",
      color: "#06070E"
    }
  },
  mobileCTA: {
    [theme.breakpoints.down("xs")]: {
      background: "#E9D758",
      color: "#000",
      "&:hover": {
        background: "#E9D758",
        color: "#000",
      }
    }
  },
  customLeftArrow: {
    display: "block",
    top: "40%",
    "&::before": {
      display: "none"
    },
    right: "-20px",
    [theme.breakpoints.down("xs")]: {
      top: "45%",
      "& img": {
        width: "20px",
        height: "30px"
      }
    }
  },
  customRightArrow: {
    display: "block",
    top: "40%",
    "&::before": {
      display: "none"
    },
    left: "-30px",
    [theme.breakpoints.down("xs")]: {
      top: "45%",
      left: "-20px",
      "& img": {
        width: "20px",
        height: "30px"
      }
    }
  },
  nftItem: {
    display: "flex !important",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    border: "none"
  },
  nftImgContainer: {
    padding: "10px 55px",
    border: "2px solid #333745",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 35px",
    }
  },
  selectBtn: {
    fontFamily: "Archivo",
    fontWeight: '600',
    fontSize: "16px",
    lineHeight: "17.41px",
    padding: "15px",
    width: "244px",
    marginTop: "10px",
    borderRadius: "0",
    color: "#333745",
    border: "2px solid #333745",
    [theme.breakpoints.down("xs")]: {
      width: "174px",
      padding: "10px",
    }
  },
  selectBtn1: {
    fontFamily: "Archivo",
    fontWeight: '600',
    fontSize: "16px",
    lineHeight: "17.41px",
    padding: "15px",
    width: "244px",
    marginTop: "10px",
    borderRadius: "0",
    color: "#000",
    background: "#7DCFB6",
    border: "2px solid #7DCFB6",
    "&:hover": {
      color: "#000",
      background: "#7DCFB6",
    },
    [theme.breakpoints.down("xs")]: {
      width: "174px",
      padding: "10px",
    }
  },
  nftNFTs: {
    border: "1px solid #E9D758",
    padding: "13px 20px 29px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 15px 20px 15px",
    }
  },
  selectAllBtn: {
    width: "110px",
    padding: "3px 0",
    marginBottom: "10px",
    background: "#E9D758",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "13px",
    color: "#06070E",
    borderRadius: "0",
    "&:hover": {
      background: "#E9D758",
    }
  },
  myNft: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#FFFFFF",
    marginRight: "57px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px"
    }
  },
  muiTab: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "15px",
    padding: "7px 0",
    color: "#333745 !important",
    opacity: "1 !important",
    minWidth: "110px !important",
    background: "#E9D758",
    minHeight: "unset !important",
    border: "1px solid #333745",
    background: "#06070E",
    "&:not(:last-child)": {
      borderRight: "none",
    },
    "&.Mui-selected": {
      background: "#E9D758 !important"
    },
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0",
      minWidth: "100px !important",
    }
  },
  muiTabs: {
    minHeight: "unset !important"
  },
  stakingImg: {
    width: "88px",
    height: "88px",
    flexShrink: "0",
    borderRight: "1px solid #333745",
    [theme.breakpoints.down("xs")]: {
      width: "65px",
      height: "65px",
    }
  },
  stakingWrap: {
    padding: "21px",
    flexGrow: "1",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    }
  },
  stakingInfo: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "13px",
    letterSpacing: "0.05em",
    color: "#FFFFFF",
    marginRight: "70px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "15px",
    }
  },
  stakingInfo1: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "13px",
    letterSpacing: "0.05em",
    color: "#FFFFFF",
    marginRight: "18px"
  },
  stakingInfoSelected: {
    color: "#333745"
  },
  stakingName: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#333745",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
      lineHeight: "15px",
    }
  },
  stakingNameSelect: {
    color: "#06070E"
  },
  stakingCTA: {
    color: "#333745",
    fontSize: "40px"
  },
  stakingNFTBlock: {
    background: "#06070E",
    border: "1px solid #333745",
    marginBottom: "12px",
    cursor: "pointer",
  },
  selectedNFT: {
    borderColor: "#E9D758",
    background: "#E9D758"
  },
  nftCheckbox: {
    color: "#333745",
    padding: "1px",
    borderRadius: "0",
    '&.Mui-checked': {
      color: "#E9D758",
    }
  },
  nftScroll: {
    height: "260px",
    overflowY: "auto",
    paddingRight: "20px",
    marginBottom: "55px",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "10px",
      marginBottom: "35px",
    }
  },
  unitMobile: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px"
    }
  },
  itemMargin: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "12px"
    }
  },
  lockXgrav: {
    fontSize: "15px !important",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "12px",
      width: "230px"
    }
  },
  iconBlock: {
    padding: "36px",
    border: "1px solid #fff",
    marginRight: "36px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "20px",
      marginRight: "0px",
      textAlign: "center",
      padding: "55px",
      "& img": {
        width: "226px",
        height: "226px"
      }
    }
  },
  whiteBg: {
    background: "#fff",
    minHeight: "16px",
    flexGrow: "1"
  },
  antiGrav: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#FFFFFF",
    flexShrink: "0",
    marginRight: "16px"
  },
  antiGravDesc: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#FFFFFF",
  },
  unlockModalLink: {
    cursor: "pointer",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "16px",
    lineHeight: "17px",
    textDecoration: "underline",
    color: "#7DCFB6",
  },
  forwardIcon: {
    color: "#fff",
    fontSize: "18px",
    marginRight: "10px"
  },
  antiGravDescBottom: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#FFFFFF",
    marginTop: "10px",
    marginBottom: "16px"
  },
  whiteWrap: {
    border: "1px solid #fff",
    padding: "16px"
  },
  swapInputBlock: {
    marginBottom: "40px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center"
    }
  },
  penalty: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#FFFFFF",
    marginBottom: "10px"
  },
  mb0: {
    marginBottom: "0"
  },
  toggleBtn: {
    width: "48px",
    height: "24px",
    padding: "0",
    "& .MuiSwitch-switchBase": {
      top: "-5px",
      left: "-5px"
    },
    '& .MuiSwitch-track': {
      background: '#333745',
      opacity: "1",
      borderRadius: "0"
    },
    "& .MuiSwitch-thumb": {
      borderRadius: '0',
      width: "20px",
      height: "16px"
    },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      background: "#E9D758",
      opacity: "1"
    },
  },
  mobileLocked: {
    [theme.breakpoints.down("xs")]: {
      width: "200px"
    }
  },
  lockedRightTop: {
    right: "0px",
    top: "0",
    padding: "15px 33px",
    border: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      width: "200px"
    }
  },
  formControl: {
    minWidth: "100%",
    maxWidth: 300,
  },
  selectItems: {
    background: "#06070E",
    color: "#FFFFFF",
    fontSize: "16px",
    fontFamily: "Archivo",
    border: "0",
    "& .MuiSelect-select.MuiSelect-select": {
      paddingTop: "14px",
      paddingBottom: "14px",
      paddingLeft: "70px"
    },
    "& svg": {
      fontSize: "40px",
      top: "3px",
      fill: "#E9D758"
    }
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontFamily: "Archivo",
  }
}));

const initialState = {
  address: null,
  web3: null,
  singleContract: null,
  stakedAmount: '',
  pendingReward: '',
  singleInputAmount: '',
  lockContract: null,
  lockStakedAmount: '',
  lockPendingReward: '',
  monthStakingInputAmount: '',
  lockUnstakeAmount: '',
  lockDepositAmount: '',
  nftContract: null,
  currentItems: null,
  stakedItems: null,
  rewardItems: null,
  totalRewards: '',
  lockXgravContract: null,
  lockXgravStakedAmount: '',
  lockXgravPendingReward: '',
  lockXgravStakingInput: '',
  lockXgravWithdrawal: '',
  lockStakedIds: [],
  lockStakedRewards: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      };
    case 'SET_WEB3':
      return {
        ...state,
        web3: action.web3,
      };
    case 'SET_SINGLE_CONTRACT':
      return {
        ...state,
        singleContract: action.singleContract,
      };
    case 'SET_SINGLE_AMOUNT':
      return {
        ...state,
        singleInputAmount: action.singleInputAmount,
      };
    case 'SET_LOCK_CONTRACT':
      return {
        ...state,
        lockContract: action.lockContract,
      };
    case 'SET_XGRAV_LOCK_CONTRACT':
      return {
        ...state,
        lockXgravContract: action.lockXgravContract,
      };
    case 'SET_NFT_CONTRACT':
      return {
        ...state,
        nftContract: action.nftContract,
      };
    case 'SET_CURRENT_ITEMS':
      return {
        ...state,
        currentItems: action.currentItems,
      };
    case 'SET_STAKED_ITEMS':
      return {
        ...state,
        stakedItems: action.stakedItems,
      };
    case 'SET_REWARD_ITEMS':
      return {
        ...state,
        rewardItems: action.rewardItems,
      };
    case 'SET_TOTAL_REWARDS':
      return {
        ...state,
        totalRewards: action.totalRewards,
      };
    case 'SET_MONTH_STAKE_AMOUNT':
      return {
        ...state,
        monthStakingInputAmount: action.monthStakingInputAmount,
      };
    case 'SET_XGRAV_LOCK_STAKE_AMOUNT':
      return {
        ...state,
        lockXgravStakingInput: action.lockXgravStakingInput,
      };
    case 'SET_XGRAV_LOCK_WITHDRAWAL_AMOUNT':
      return {
        ...state,
        lockXgravWithdrawal: action.lockXgravWithdrawal,
      };
    case 'SET_UNSTAKE_AMOUNT':
      return {
        ...state,
        lockUnstakeAmount: action.lockUnstakeAmount,
      };
    case 'SET_LOCK_DEPOSIT_AMOUNT':
      return {
        ...state,
        lockDepositAmount: action.lockDepositAmount,
      };
    case 'SET_STAKED_PENDING':
      return {
        ...state,
        stakedAmount: action.stakedAmount,
        pendingReward: action.pendingReward
      };
    case 'SET_LOCK_STAKED_PENDING':
      return {
        ...state,
        lockStakedAmount: action.lockStakedAmount,
        lockPendingReward: action.lockPendingReward
      };
    case 'SET_LOCK_STAKED_IDS':
      return {
        ...state,
        lockStakedIds: action.lockStakedIds,
      };
    case 'SET_LOCK_STAKED_REWARDS':
      return {
        ...state,
        lockStakedRewards: action.lockStakedRewards,
      };
    case 'SET_XGRAV_LOCK_STAKED_PENDING':
      return {
        ...state,
        lockXgravStakedAmount: action.lockXgravStakedAmount,
        lockXgravPendingReward: action.lockXgravPendingReward
      };
    default:
      throw new Error();
  }
}

const Staking = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    address,
    web3,
    singleContract,
    stakedAmount,
    pendingReward,
    singleInputAmount,
    lockContract,
    lockStakedAmount,
    lockPendingReward,
    monthStakingInputAmount,
    lockUnstakeAmount,
    lockDepositAmount,
    nftContract,
    currentItems,
    stakedItems,
    rewardItems,
    totalRewards,
    lockXgravContract,
    lockXgravStakedAmount,
    lockXgravPendingReward,
    lockXgravStakingInput,
    lockXgravWithdrawal,
    lockStakedIds,
    lockStakedRewards
  } = state;

  const connectWallet = async () => {
    const providerOptions = {
      metamask: {
        display: {
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            1666700000: 'https://api.s0.b.hmny.io'
          },
          network: 'harmony testnet'
        }
      }
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      disableInjectedProvider: false,
      providerOptions // required
    });
    web3Modal.clearCachedProvider();
    //var provider

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    provider.on('connect', (info) => {
      toast.success(`Connected wallet`);
    });

    provider.on('error', e => {
      toast.success(e);
    });

    provider.on('disconnect', (error) => {
      web3Modal.clearCachedProvider();
      dispatch({
        type: 'SET_ADDRESS',
        address: ''
      });
    });

    provider.on("accountsChanged", (accounts) => {
      dispatch({
        type: 'SET_ADDRESS',
        address: accounts[0]
      })
    });

    const address = await web3.eth.getAccounts();

    dispatch({
      type: 'SET_ADDRESS',
      address: address[0]
    });

    dispatch({
      type: 'SET_WEB3',
      web3: web3
    });

    const singleStakingContract = new web3.eth.Contract(singleAbi, singleContractAddress)

    dispatch({
      type: 'SET_SINGLE_CONTRACT',
      singleContract: singleStakingContract
    });

    const lockStakingContract = new web3.eth.Contract(lockAbi, lockContractAddress)

    dispatch({
      type: 'SET_LOCK_CONTRACT',
      lockContract: lockStakingContract
    });

    const ethers = require("ethers");

    const provider1 = new ethers.providers.Web3Provider(web3.currentProvider);
    const _signer = provider1.getSigner();

    const nftStakingContract = new ethers.Contract(nftContractAddress, nftContractABI, _signer);

    dispatch({
      type: 'SET_NFT_CONTRACT',
      nftContract: nftStakingContract
    });

    const lockXgravContracts = new web3.eth.Contract(lockXGRAVAbi, lockXGRAVContractAddress);

    dispatch({
      type: 'SET_XGRAV_LOCK_CONTRACT',
      lockXgravContract: lockXgravContracts
    });
  }

  useEffect(() => {
    singleContract && getBalance();
  }, [singleContract])

  useEffect(() => {
    lockContract && getLockStakingBalance();
  }, [lockContract])

  useEffect(() => {
    lockXgravContract && getXgravLockStakingBalance();
  }, [lockXgravContract])

  useEffect(() => {
    nftContract && getNFTBalance();
  }, [nftContract])

  const getNFTBalance = async () => {
    // const contract = new web3.eth.Contract(nftABI, nftAddress);
    const ethers = require("ethers");

    let provider = new ethers.providers.JsonRpcProvider("https://api.s0.b.hmny.io");

    //Contract
    // const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingAbi, provider);
    const contract = new ethers.Contract(nftAddress, nftABI, provider);

    const balance = await contract.balanceOf(address);
    console.log(Number(balance), address, '+++')

    let nftIds = [];

    const setupMultiCallContract = async (nftAddress, nftABI) => {
      const provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "any"
      );
      const ethcallProvider = new MulticallProvider(provider);

      await ethcallProvider.init();
      ethcallProvider._multicallAddress =
        '0xd078799c53396616844e2fa97f0dd2b4c145a685';

      const multicallContract = new MulticallContract(nftAddress, nftABI);
      return ([ethcallProvider, multicallContract]);

    }
    const [multicallProvider, multicallContract] = await setupMultiCallContract(nftAddress, nftABI);
    let tokenCalls = []
    for (let i = 0; i < balance; i++) {
      tokenCalls.push(multicallContract.tokenOfOwnerByIndex(address, i));
    }
    const userTokens = (await multicallProvider?.all(tokenCalls)).map(e => e.toString());

    // getting unstaked nfts
    const promises = userTokens.map(async (element) => {
      try {
        const uri = await contract.tokenURI(element);
        const response = await fetch(uri);

        if (!response.ok)
          throw new Error(response.statusText);

        const json = await response;
        // return {
        //   id: element,
        //   name: json.name,
        //   key: json.dna,
        //   url: json.image
        // }
        return {
          id: element,
          name: element,
          key: element,
          url: '/buy-button.png'
        }
      } catch (err) {
        console.log(err)
      }
    })
    const itemsArr = await Promise.all(promises)
    console.log(promises, '*************')

    dispatch({
      type: 'SET_CURRENT_ITEMS',
      currentItems: itemsArr
    });

    // getting staked nfts

    const stakedOnes = await nftContract.getUserStaked(address);
    const stakedIds = stakedOnes.map((e) => Number(e))
    console.log(stakedIds, '+++')

    const stakedPromises = stakedIds.map(async (element) => {
      const uri = await contract.tokenURI(element);
      const response = await fetch(uri);

      if (!response.ok)
        throw new Error(response.statusText);

      const json = await response;
      // return {
      //   id: element,
      //   name: json.name,
      //   key: json.dna,
      //   url: json.image
      // }
      return {
        id: element,
        name: element,
        key: element,
        url: '/buy-button.png'
      }
    })
    const result = await Promise.all(stakedPromises)

    dispatch({
      type: 'SET_STAKED_ITEMS',
      stakedItems: result
    });

    let rewarding = []
    let sumUpRewards = 0
    try {
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        // getRewardsByID
        const res = await nftContract.getReward(element.id);

        rewarding.push({
          id: element.id,
          name: element.name,
          key: element.id,
          url: element.url,
          reward: res / Math.pow(10, 18)
        })
        sumUpRewards += res / Math.pow(10, 18)
      }
    } catch (err) {
      console.log(err)
    }

    dispatch({
      type: 'SET_REWARD_ITEMS',
      rewardItems: rewarding
    });

    // const total = await nftContract.methods.getTotalRewards(nftAddress).call({ from: address });
    dispatch({
      type: 'SET_TOTAL_REWARDS',
      totalRewards: sumUpRewards
    });
  }

  const getBalance = async () => {
    const stakedAmount = await singleContract.methods.supplyAmount(address).call({ from: address });
    const temp = stakedAmount / Math.pow(10, 18);
    const rewarded = await singleContract.methods.accruedReward(address, 0).call({ from: address });
    const tempPending = rewarded / Math.pow(10, 18);

    dispatch({
      type: 'SET_STAKED_PENDING',
      stakedAmount: temp.toFixed(3),
      pendingReward: tempPending.toFixed(3)
    });
  }

  const getLockStakingBalance = async () => {
    const total = await lockContract.methods.getUserStakedAmount(address).call({ from: address });
    const temp = total / Math.pow(10, 18)

    await lockContract.methods.updatecurrentStakingTime().call({ from: address });
    const reward = await lockContract.methods.getCurrentRewards().call({ from: address });
    const tempPending = reward / Math.pow(10, 18)

    dispatch({
      type: 'SET_LOCK_STAKED_PENDING',
      lockStakedAmount: temp.toFixed(3),
      lockPendingReward: tempPending.toFixed(3)
    });
  }

  const collectRewards = () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    const stakingContract = new web3.eth.Contract(singleAbi, singleContractAddress)

    toast.info('Please Wait Till The Transaction Succeeds')

    stakingContract.methods.claimRewards().send({ from: address })
      .on('receipt', receipt => {
        toast.success('Claiming rewards successful')
        getBalance();
      })
      .on("error", (error, reciept) => {
        toast.error(error.message)
        console.log(error)
      })
  }

  const getXgravLockStakingBalance = async () => {
    // TODO
    try {
      const getStakedIDs = await lockXgravContract.methods.getStakedIDs(address).call({ from: address });

      let totalStakedAmt = 0;
      let rewardsAmount = 0;
      let stakedRewards = {}
      for (let index = 0; index < getStakedIDs.length; index++) {
        const element = getStakedIDs[index];
        let temp = await lockXgravContract.methods.getStakeInfo(element).call({ from: address })
        totalStakedAmt += temp.amount / Math.pow(10, 18)
        let tempReward = await lockXgravContract.methods.getCurrentRewards(element).call({ from: address })
        stakedRewards[element] = {
          amount: temp.amount / Math.pow(10, 18),
          rewards: tempReward / Math.pow(10, 18)
        }
        rewardsAmount += tempReward / Math.pow(10, 18)
      }

      dispatch({
        type: 'SET_LOCK_STAKED_IDS',
        lockStakedIds: getStakedIDs,
      });

      dispatch({
        type: 'SET_LOCK_STAKED_REWARDS',
        lockStakedRewards: stakedRewards,
      });

      dispatch({
        type: 'SET_XGRAV_LOCK_STAKED_PENDING',
        lockXgravStakedAmount: totalStakedAmt.toFixed(3),
        lockXgravPendingReward: rewardsAmount.toFixed(3)
      });
    } catch (error) {
      console.log(error)
    }
  }

  const lockXgravStake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (lockXgravStakingInput < 1 || !lockXgravStakingInput) {
      toast.error('Enter An Amount Greater Than 1 ONEverse token')
      return;
    }

    const amount = Web3.utils.toBN(String(Math.floor(lockXgravStakingInput)) + "0".repeat(18))
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)

    toast.info('Approve Transaction To Allow ONEverse token spending')

    tokenContract.methods.approve(lockXGRAVContractAddress, amount).send({ from: address })
      .on('receipt', receipt => {
        toast.info('Confirm staking transaction')
        lockXgravContract.methods.lockTokens(amount).send({ from: address })
          .on('receipt', receipt => {
            toast.success('Your tokens have been staked! - Amount:' + lockXgravStakingInput)
            getXgravLockStakingBalance()
          })
          .on('error', (error, receipt) => {
            toast.error(error.message)
            console.log(error)
          })
      })
      .on('error', (error, receipt) => {
        toast.error(error.message)
        console.log(error)
      })
  }

  const lockXgravUnstake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (selectedStakedItems.length < 1 || !selectedStakedItems.length) {
      toast.error('Enter An Amount Greater Than 1')
      return;
    }

    toast.info('Please Wait Till The Transaction Succeeds')

    lockXgravContract.methods.batchWithdraw(selectedStakedItems).send({ from: address })
      .on('receipt', receipt => {
        toast.success('Withdrawal Success')
        getXgravLockStakingBalance()
      })
      .on("error", (error, reciept) => {
        toast.error(error.message)
        console.log(error)
      })
  }

  const staking6Months = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (monthStakingInputAmount < 1 || !monthStakingInputAmount) {
      toast.error('Enter An Amount Greater Than 1 ONEverse token')
      return;
    }

    const amount = Web3.utils.toBN(String(Math.floor(monthStakingInputAmount)) + "0".repeat(18))
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)

    toast.info('Approve Transaction To Allow ONEverse token spending')

    tokenContract.methods.approve(lockContractAddress, amount).send({ from: address })
      .on('receipt', receipt => {
        toast.info('Confirm staking transaction')
        try {
          lockContract.methods.stake(amount, 182).send({ from: address })
            .on('receipt', receipt => {
              toast.success('Your tokens have been secured in the Wormhole for six months! - Amount:' + monthStakingInputAmount)
              getLockStakingBalance()
            })
            .on('error', (error, receipt) => {
              toast.error(error.message)
              console.log(error)
            })
        } catch (err) {
          console.log(err)
        }
      })
      .on('error', (error, receipt) => {
        toast.error(error.message)
        console.log(error)
      })
  }

  const staking12Month = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (monthStakingInputAmount < 1 || !monthStakingInputAmount) {
      toast.error('Enter An Amount Greater Than 1 ONEverse token')
      return;
    }

    const amount = Web3.utils.toBN(String(Math.floor(monthStakingInputAmount)) + "0".repeat(18))
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)

    toast.info('Approve Transaction To Allow ONEverse token spending')

    tokenContract.methods.approve(lockContractAddress, amount).send({ from: address })
      .on('receipt', receipt => {
        toast.info('Please wait...')
        toast.info('Confirm staking transaction')
        try {
          lockContract.methods.stake(amount, 365).send({ from: address })
            .on('receipt', receipt => {
              toast.success('Your tokens have been secured in the Wormhole for one year! - Amount:' + monthStakingInputAmount)
              getLockStakingBalance()
            })
            .on('error', (error, receipt) => {
              toast.error(error.message)
              console.log(error)
            })
        } catch (err) {
          console.log(err)
        }
      })
      .on('error', (error, receipt) => {
        toast.error(error.message)
        console.log(error)
      })
  }

  const lockUnStake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (lockUnstakeAmount < 1 || !lockUnstakeAmount) {
      toast.error('Enter An Amount Greater Than 1')
      return;
    }

    const amount = Web3.utils.toBN(String(Math.floor(lockUnstakeAmount)) + "0".repeat(18))

    toast.info('Please Wait Till The Transaction Succeeds')
    try {
      await lockContract.methods.updatecurrentStakingTime().call({ from: address });

      lockContract.methods.unstake(amount).send({ from: address })
        .on('receipt', receipt => {
          toast.success('Wormhole Withdrawal Success')
          toast.info('Please Note Withdrawal Includes Current Reward Obtained!')
          getLockStakingBalance()
        })
        .on("error", (error, reciept) => {
          toast.error(error.message)
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const lockDeposit = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (lockDepositAmount < 1 || !lockDepositAmount) {
      toast.error('Enter An Amount Greater Than 1')
      return;
    }

    const amount = Web3.utils.toBN(String(Math.floor(lockDepositAmount)) + "0".repeat(18))
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)

    toast.info('Approve Transaction To Allow ONEverse token spending')
    try {
      await lockContract.methods.updatecurrentStakingTime().call({ from: address });

      tokenContract.methods.approve(lockContractAddress, amount).send({ from: address })
        .on('receipt', receipt => {
          lockContract.methods.deposit(amount).send({ from: address })
            .on('receipt', receipt => {
              toast.success('Your tokens have been added to the Wormhole! - Amount:' + lockDepositAmount)
              getLockStakingBalance()
            })
            .on('error', (error, receipt) => {
              toast.error(error.message)
              console.log(error)
            })
        })
        .on('error', (error, receipt) => {
          toast.error(error.message)
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    }
  }


  const getRewards = async () => {
    if (!address) {
      toast.error('Please Connect Your Wallet', 'error')
      return;
    }
    try {
      lockContract.methods._transferRewards().send({ from: address })
        .on('receipt', receipt => {
          toast.success('You have successfully transferred your rewards!')
          getLockStakingBalance()
        })
        .on('error', (error, receipt) => {
          console.error(receipt)
        })
    } catch (err) {
      console.log(err)
    }
  }


  const handleSingleAmountChange = (event) => {
    dispatch({
      type: 'SET_SINGLE_AMOUNT',
      singleInputAmount: event.target.value
    });
  }

  const singleUnstake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (singleInputAmount < 1 || !singleInputAmount) {
      toast.error('Enter An Amount Greater Than 1 ONEverse token')
      return;
    }

    const stakingContract = new web3.eth.Contract(singleAbi, singleContractAddress)
    const amount = Web3.utils.toBN(String(Math.floor(singleInputAmount)) + "0".repeat(18))

    toast.info('Please Wait Till The Transaction Succeeds')

    // await stakingContract.methods.updateStakedTime().call({ from: address });

    stakingContract.methods.redeem(amount).send({ from: address })
      .on('receipt', receipt => {
        toast.success('Wormhole Withdrawal Success')
        getBalance();
      })
      .on("error", (error, reciept) => {
        toast.error(error.message)
        console.log(error)
      })
  }

  const singleStake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (singleInputAmount < 1 || !singleInputAmount) {
      toast.error('Enter An Amount Greater Than 1 ONEverse token')
      return;
    }

    const amount = Web3.utils.toBN(String(Math.floor(singleInputAmount)) + "0".repeat(18))
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)
    const stakingContract = new web3.eth.Contract(singleAbi, singleContractAddress)

    toast.info('Approve Transaction To Allow ONEverse token spending')

    tokenContract.methods.approve(singleContractAddress, amount).send({ from: address })
      .on('receipt', receipt => {
        toast.info('Please wait...')
        stakingContract.methods.deposit(amount).send({ from: address })
          .on('receipt', receipt => {
            toast.success('Your tokens have been sent into the Wormhole! - Amount: ' + singleInputAmount);
            getBalance();
          })
          .on('error', (error, receipt) => {
            toast.error(error.message);
            console.log(error, receipt)
          });
      })
      .on('error', (error, receipt) => {
        toast.error(error.message);
        console.log(error, receipt);
      });
  }

  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItems1, setCheckedItems1] = useState({});
  const [checkedItems2, setCheckedItems2] = useState({});
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedAll1, setSelectedAll1] = useState(false);
  const [selectedAll2, setSelectedAll2] = useState(false);

  const checkNFTHandle = (name, checked, tab) => {
    if (tab == 'unstaked') {
      !checked && setSelectedAll(false);
      setCheckedItems({ ...checkedItems, [name]: checked });
    } else if (tab == 'staked') {
      !checked && setSelectedAll1(false);
      setCheckedItems1({ ...checkedItems1, [name]: checked });
    } else if (tab == 'rewarded') {
      !checked && setSelectedAll2(false);
      setCheckedItems2({ ...checkedItems2, [name]: checked });
    }
  }

  useEffect(() => {
    const defaultSelect = currentItems && currentItems.reduce(function (result, item) {
      result[item["name"]] = false;
      return result;
    }, {});
    setCheckedItems(defaultSelect);
  }, [currentItems]);

  useEffect(() => {
    const defaultSelect = stakedItems && stakedItems.reduce(function (result, item) {
      result[item["name"]] = false;
      return result;
    }, {});
    setCheckedItems1(defaultSelect);
  }, [stakedItems]);

  const selectAllNFT = () => {
    const selected = currentItems.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems(selected);
    setSelectedAll(true);
  }

  const selectAllNFT1 = () => {
    const selected = stakedItems.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems1(selected);
    setSelectedAll1(true);
  }

  const selectAllNFT2 = () => {
    const selected = rewardItems.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems2(selected);
    setSelectedAll2(true);
  }

  const deselectAllNFT = () => {
    const defaultSelect = currentItems && currentItems.reduce(function (result, item) {
      result[item["name"]] = false;
      return result;
    }, {});
    setCheckedItems(defaultSelect);
    setSelectedAll(false);
  }

  const deselectAllNFT1 = () => {
    const defaultSelect = stakedItems && stakedItems.reduce(function (result, item) {
      result[item["name"]] = false;
      return result;
    }, {});
    setCheckedItems1(defaultSelect);
    setSelectedAll1(false);
  }

  const deselectAllNFT2 = () => {
    const defaultSelect = rewardItems && rewardItems.reduce(function (result, item) {
      result[item["name"]] = false;
      return result;
    }, {});
    setCheckedItems2(defaultSelect);
    setSelectedAll2(false);
  }

  const nftStake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    const notEmpty = Object.values(checkedItems).some(val => val === true);

    if (!notEmpty) {
      toast.error('Please select at least one nft to stake');
      return;
    }

    function isSelected(elem) {
      return checkedItems[elem.name];
    }

    let filtered = currentItems.filter(isSelected).map((a) => a.id)

    // init nft contract(not staking)
    const ethers = require("ethers");
    const provider1 = new ethers.providers.Web3Provider(web3.currentProvider);
    const _signer = provider1.getSigner();

    const contract = new ethers.Contract(nftAddress, nftABI, _signer);

    try {
      const checkApproval = await contract.isApprovedForAll(address, nftContractAddress);
      if (!checkApproval) {
        const setApproval = await contract.setApprovalForAll(nftContractAddress, true);
        await setApproval.wait();
      }
      const transaction = await nftContract.stakeNFT(filtered);
      const finishTxn = await transaction.wait();
      toast.success(`${filtered.length} Nfts successfully staked.`)
      console.log(finishTxn)
      // getNFTBalance();
      // deselectAllNFT1();
    }
    catch (e) {
      console.log(e);
    }
  }

  const nftClaim = async () => {
    const notEmpty = Object.values(checkedItems2).some(val => val === true);

    if (!notEmpty) {
      toast.error('Please select at least one nft to claim');
      return;
    }

    try {
      let ids = []
      rewardItems.forEach(elem => {
        if (checkedItems2[elem.name])
          ids.push(elem.id)
      });

      console.log(ids, '+++')

      const webRequest = await axios.get("http://104.197.187.131/");
      const { signature, address, types, voucher, finalPrice } = webRequest.data;
      const transaction = await nftContract.claimRewards(ids, [voucher.price, voucher.time, signature]);
      const finishTxn = await transaction.wait();
      toast.success(`${ids.length} NFts were successfully claimed.`)
      console.log(finishTxn);

      // getNFTBalance();
      // deselectAllNFT2();
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const nftUnstake = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    const notEmpty = Object.values(checkedItems1).some(val => val === true);

    if (!notEmpty) {
      toast.error('Please select at least one nft to unstake');
      return;
    }

    function isSelected(elem) {
      return checkedItems1[elem.name];
    }

    let filtered = stakedItems.filter(isSelected).map((a) => a.id)

    console.log(filtered, '_+_+_+_+_+_+_+')

    try {
      const webRequest = await axios.get("http://104.197.187.131/");
      const { signature, address, types, voucher, finalPrice } = webRequest.data;
      console.log(voucher)
      console.log(filtered, [voucher.price.toString(), voucher.time.toString(), signature], '*******')
      const transaction = await nftContract.unstakeTokens(filtered, [voucher.price.toString(), voucher.time.toString(), signature]);
      const finishTxn = await transaction.wait();
      console.log(finishTxn);
      toast.success(`${filtered.length} NFts were successfully unstaked.`)
      // getNFTBalance();
      // deselectAllNFT1();
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [tabVal, setTabVal] = useState(0);

  const tabHandleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const [activePenalty, setActivePenalty] = useState(true);

  const handleTogglePenaty = () => {
    setActivePenalty(!activePenalty)
  }

  const [openUnlocksModal, setOpenUnlocksModal] = useState(false);

  const unlocksModalShow = () => {
    setOpenUnlocksModal(true);
  }

  const handleModalClose = () => {
    setOpenUnlocksModal(false);
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        background: "#06070E",
        border: "1px solid #E9D758",
        borderRadius: "0",
        paddingTop: "0",
        top: "10px"
      },
    },
    disableScrollLock: true,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    getContentAnchorEl: null
  };

  const [selectedStakedItems, setSelectedStakedItems] = useState([]);
  const handleChangeItem = (event) => {
    setSelectedStakedItems(event.target.value);
  };

  return (
    <Layout
      // type your page title and page description.
      title="ONEVERSE"
      description="A multiplayer P2E experience on Harmony Network"
      onConnect={connectWallet}
      address={address}
    >
      <Container disableGutters={matches} style={{ overflowX: matches ? "hidden" : "unset" }}>
        <Grid container spacing={5}>
          {!matches && (
            <Grid item md={2}>
              <Box className={classes.leftSide}>
                <Link href="#" smooth={true} className={classes.leftMenu} style={{ textDecoration: "none" }} to="swap" duration={2000} spy={true}>
                  <Typography variant="h2">
                    LOCKED xGRAV STAKING
                  </Typography>
                </Link>
                <Link href="#" smooth={true} className={classes.leftMenu} style={{ textDecoration: "none" }} to="flexible" duration={2000} spy={true}>
                  <Typography variant="h2">
                    FLEXIBLE STAKING
                  </Typography>
                </Link>
                <Link href="#" smooth={true} className={classes.leftMenu} style={{ textDecoration: "none" }} to="nft" duration={2000} spy={true}>
                  <Typography variant="h2">
                    NFT STAKING
                  </Typography>
                </Link>
                <Link href="#" smooth={true} className={classes.leftMenu} style={{ textDecoration: "none" }} to="time" duration={2000} spy={true}>
                  <Typography variant="h2">
                    TIME LOCKED STAKING
                  </Typography>
                </Link>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  <Links href="/">
                    <img width="20px" height="18px" src="/twitter.png" ></img>
                  </Links>
                  <Links href="/">
                    <img width="20px" height="20px" src="/discord.png"></img>
                  </Links>
                  <Links href="/">
                    <img width="20px" height="20px" style={{ marginRight: 0 }} src="/medium.png"></img>
                  </Links>
                  <Links href="/">
                    <img width="20px" height="20px" src="/telegram.png"></img>
                  </Links>
                  <Links href="/">
                    <img width="20px" height="20px" src="/reddit.png"></img>
                  </Links>
                </Box>
              </Box>
            </Grid>
          )}
          <Grid item md={10} xs={12}>
            <Box id="swap" className={classes.swapBlock} style={{ position: "relative", overflowX: "hidden" }}>
              <Typography variant="h2" className={clsx(classes.blockTitle, classes.mobileLocked)}>
                LOCKED xGRAV STAKING
              </Typography>
              {
                !matches ? (
                  <Box display="flex" position="absolute" className={classes.lockedRightTop}>
                    <Typography className={classes.topLabelInfo}>1 GRAV = 1 xGRAV</Typography>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center" mt="50px" >
                    <Box style={{
                      padding: "14px 33px", border: "1px solid #E9D758", width: "fit-content"
                    }}>
                      <Typography className={classes.topLabelInfo}>1 GRAV = 1 xGRAV</Typography>
                    </Box>
                  </Box>
                )
              }
              <Box mt="65px" mb="40px" display={matches ? "block" : "flex"}>
                <Box className={classes.iconBlock}>
                  <img src="token-icon1.png"></img>
                </Box>
                <Box flexGrow={1}>
                  <Box mb="16px" className={classes.whiteWrap}>
                    <Box mb="10px" display="flex">
                      <Typography className={classes.antiGrav}>ANTI-GRAV // $xGRAV</Typography>
                      <Box className={classes.whiteBg}>
                      </Box>
                    </Box>
                    <Box display={matches ? "block" : "flex"} justifyContent="space-between">
                      <Typography className={clsx(classes.antiGravDesc, classes.lockXgrav)}>Lock xGRAV for 4 MONTHS to receive 1:1 GRAV rewards</Typography>
                      <Typography onClick={() => unlocksModalShow()} style={{ fontSize: "15px" }} className={classes.unlockModalLink}>UPCOMING UNLOCKS</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.whiteWrap}>
                    <Box mb="10px" display="flex">
                      <Typography className={classes.antiGrav}>xGRAV UTILITY</Typography>
                      <Box className={classes.whiteBg}>
                      </Box>
                    </Box>
                    <Grid container>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                          <Box>
                            <Typography className={classes.antiGravDesc}>Upgrade land (Level 1-3)</Typography>
                            <Typography className={classes.antiGravDescBottom}>Quantity of materials scales with land</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                          <Box className={classes.itemMargin}>
                            <Typography className={classes.antiGravDesc}>Not transferable or tradeable</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                          <Box className={classes.itemMargin}>
                            <Typography className={classes.antiGravDesc}>P2E main earnings</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon className={classes.forwardIcon}></ArrowForwardIosIcon>
                          <Box className={classes.itemMargin}>
                            <Typography className={classes.antiGravDesc}>Total supply/price mirrors GRAV</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={3} className={classes.swapInputBlock}>
                <Grid item md={4} xs={10}>
                  <FormControl className={classes.stakedInput} variant="outlined">
                    <InputLabel style={{ transition: "none" }} shrink={true} htmlFor="staked-html">STAKED</InputLabel>
                    <OutlinedInput
                      id="staked-html"
                      type="text"
                      endAdornment={<InputAdornment className={classes.unitLabel} position="end">xGRAV</InputAdornment>}
                      notched
                      value={lockXgravStakedAmount}
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={10}>
                  <FormControl className={classes.stakedInput} variant="outlined">
                    <InputLabel style={{ transition: "none" }} shrink={true} htmlFor="staked-html">REWARDS</InputLabel>
                    <OutlinedInput
                      id="staked-html"
                      type="text"
                      endAdornment={<InputAdornment className={classes.unitLabel} position="end">GRAV</InputAdornment>}
                      notched
                      value={lockXgravPendingReward}
                      labelWidth={90}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={10}>
                  <Button variant="contained" onClick={() => { }} className={classes.claimBtn}>
                    Claim
                  </Button>
                </Grid>
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography className={classes.stakeAndLockTitle} variant="h1">LOCKED xGRAV STAKING</Typography>
                </Grid>
                <Grid container item md={6} xs={12} className={classes.stakeAndLockRight}>
                  <Grid item container xs={12} className={classes.stakeAndLockRightTop}>
                    <Grid item md={8}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          placeholder="ENTER AMOUNT TO STAKE"
                          className={classes.stakeAmountInput}
                          value={lockXgravStakingInput}
                          onChange={(event) => {
                            dispatch({
                              type: 'SET_XGRAV_LOCK_STAKE_AMOUNT',
                              lockXgravStakingInput: event.target.value
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <Box display="flex" alignItems="center" justifyContent="end" height="100%">
                        <Typography className={clsx(classes.unitLabel1, classes.unitMobile)}>xGRAV</Typography>
                        <Button className={classes.maxBtn}>MAX</Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} className={classes.stakeAndLockRightBottomRight}>
                    <Button onClick={lockXgravStake} className={clsx(classes.stake6btn, classes.activeCta)}>STAKE</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography className={clsx(classes.stakeAndLockTitle, classes.mb0)} variant="h1">LOCKED xGRAV STAKING</Typography>
                  <Typography className={classes.penalty} variant="h1">WITH 50% PENALTY</Typography>
                  <Switch checked={activePenalty}
                    onClick={() => handleTogglePenaty()}
                    value="active"
                    className={classes.toggleBtn}
                    inputProps={{ 'aria-label': 'primary checkbox' }} />
                </Grid>
                <Grid container item md={6} xs={12} className={classes.stakeAndLockRight}>
                  <Grid item xs={12} className={classes.stakeAndLockRightTop}>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={selectedStakedItems}
                        onChange={handleChangeItem}
                        input={<Input />}
                        renderValue={(selected) => {
                          let sum = 0;
                          selected.forEach((elem) => {
                            if (lockStakedRewards[elem]) {
                              sum += lockStakedRewards[elem].amount;
                            }
                          })
                          return `${sum} XGARV`;
                        }}
                        MenuProps={MenuProps}
                        className={classes.selectItems}
                      >
                        {lockStakedIds && lockStakedIds.map((key, index) => (
                          <MenuItem key={index} value={key} style={{
                            background: "#06070E",
                            border: "1px solid #333745",
                            padding: "0",
                            marginBottom: "5px"
                          }}>
                            <Checkbox style={{ color: "#E9D758", padding: "5px 10px" }} checked={selectedStakedItems.indexOf(key) > -1} />
                            <Grid container>
                              <Grid item md={6}>
                                <Typography style={{ paddingLeft: "20px" }} className={classes.itemText} >{lockStakedRewards[key] && lockStakedRewards[key].amount} xGRAV</Typography>
                              </Grid>
                              <Grid item md={6}>
                                <Typography style={{ paddingLeft: "20px" }} className={classes.itemText} >{lockStakedRewards[key] && lockStakedRewards[key].rewards}</Typography>
                              </Grid>
                            </Grid>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid container item xs={12} className={classes.stakeAndLockRightBottomRight}>
                    {
                      activePenalty ? (
                        <Button onClick={lockXgravUnstake} className={clsx(classes.stake6btn, classes.activeCta)}>EARLY WITHDRAWAL</Button>
                      ) : (
                        <Button disabled={true} className={clsx(classes.stake6btn, classes.activeCta)}>EARLY WITHDRAWAL</Button>
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box id="flexible" className={classes.flexibleBlock}>
              <Typography variant="h2" className={classes.blockTitle}>
                FLEXIBLE STAKING
              </Typography>
              <Grid container className={classes.flexibleContent}>
                <Grid item md={6} xs={12}>
                  <Box className={classes.leftFlexBlock}>
                    <Typography variant="h1" className={classes.flyInto}>FLY INTO THE WORMHOLE</Typography>
                    <FormControl className={classes.singleStakeInput} variant="outlined">
                      <InputLabel style={{ transition: "none" }} shrink={true} htmlFor="staked-html">STAKE</InputLabel>
                      <OutlinedInput
                        id="staked-html"
                        type="number"
                        endAdornment={<InputAdornment className={classes.unitLabel} position="end">GRAV</InputAdornment>}
                        notched
                        labelWidth={60}
                        onChange={handleSingleAmountChange}
                      />
                    </FormControl>
                    <Typography variant="h1" className={classes.darkMatter}>15% APR</Typography>
                    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                      <Button onClick={singleStake} className={classes.stakeBtn}>STAKE</Button>
                      <Button onClick={singleUnstake} className={classes.unstakeBtn}>UNSTAKE</Button>
                    </ButtonGroup>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.rewardBlock}>
                    <Box className={classes.stakedBlock}>
                      <Typography className={classes.rewardLabel}>GRAV STAKED</Typography>
                      <Box textAlign="right" display="flex" justifyContent="end">
                        <Typography variant="h2" className={classes.stakedAmount}>{stakedAmount}</Typography>
                        <Typography variant="h2" style={{ color: "#000" }}>GRAV</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.rewardedBlock}>
                      <Typography className={classes.rewardLabel}>GRAV REWARDS</Typography>
                      <Box textAlign="right" display="flex" justifyContent="end">
                        <Typography variant="h2" className={classes.rewardedAmount}>{pendingReward}</Typography>
                        <Typography variant="h2" style={{ color: "#000" }}>GRAV</Typography>
                      </Box>
                    </Box>
                    <Button onClick={collectRewards} className={classes.collectBtn}>COLLECT</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box id="nft" className={classes.nftStakingBlock}>
              <Typography variant="h2" className={classes.blockTitle}>
                NFT STAKING
              </Typography>
              <Grid container className={classes.nftStakingContent}>
                <Grid item md={4} xs={12}>
                  <Box className={classes.leftStakingBlock}>
                  </Box>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Box className={classes.stakingNFT} >
                    <Box className={classes.nftTitle}>
                      <Typography variant="h1" className={classes.flyInto1}>INCUBATE YOUR NFT</Typography>
                      <Typography variant="h1" className={classes.darkMatter} style={{ marginBottom: "0" }}>Earn Variable xGrav</Typography>
                    </Box>
                    <Box className={classes.nftNFTs}>
                      <Box display={matches ? "block" : "flex"} alignItems="center" mb="33px">
                        <Typography className={classes.myNft}>MY NFTs</Typography>
                        <Tabs
                          className={classes.muiTabs}
                          TabIndicatorProps={{
                            style: { display: 'none' }
                          }}
                          value={tabVal} onChange={tabHandleChange} aria-label="simple tabs example">
                          <Tab className={classes.muiTab} label="UNSTAKED" {...a11yProps(0)} />
                          <Tab className={classes.muiTab} label="STAKED" {...a11yProps(1)} />
                          <Tab className={classes.muiTab} label="REWARDS" {...a11yProps(2)} />
                        </Tabs>
                      </Box>
                      <Box>
                        <TabPanel value={tabVal} index={0}>
                          <Box display="flex" justifyContent="end">
                            {
                              checkedItems && Object.values(checkedItems).filter(item => item === true).length ? (
                                <Button onClick={deselectAllNFT} className={classes.selectAllBtn}><CloseIcon style={{ fontSize: "15px" }}></CloseIcon> {checkedItems && Object.values(checkedItems).filter(item => item === true).length ? Object.values(checkedItems).filter(item => item === true).length : ''
                                } SELECTED</Button>
                              ) : (
                                <Button onClick={selectAllNFT} className={classes.selectAllBtn}>Select All</Button>
                              )
                            }
                          </Box>
                          <Box className={classes.nftScroll} id="nft-scroll">
                            {currentItems && currentItems.map((item, index) => (
                              <Box key={index}>
                                <Box display="flex" className={checkedItems && checkedItems[item.name] ? clsx(classes.stakingNFTBlock, classes.selectedNFT) : classes.stakingNFTBlock} >
                                  <img className={checkedItems && checkedItems[item.name] ? clsx(classes.stakingImg, classes.selectedNFT) : classes.stakingImg} src={item.url}></img>
                                  <Box display="flex" justifyContent="space-between" className={classes.stakingWrap}>
                                    <Box>
                                      <Box display="flex" alignItems="center" mb="12px">
                                        <Typography className={checkedItems && checkedItems[item.name] ? clsx(classes.stakingInfo, classes.stakingInfoSelected) : classes.stakingInfo}>NAME</Typography>
                                        <Typography className={checkedItems && checkedItems[item.name] ? clsx(classes.stakingName, classes.stakingNameSelect) : classes.stakingName}>PUFFS {item.name}</Typography>
                                      </Box>
                                      <Box display="flex" alignItems="center">
                                        <Typography className={checkedItems && checkedItems[item.name] ? clsx(classes.stakingInfo1, classes.stakingInfoSelected) : classes.stakingInfo1}>RARITY RANK</Typography>
                                        <Typography className={checkedItems && checkedItems[item.name] ? clsx(classes.stakingName, classes.stakingNameSelect) : classes.stakingName}></Typography>
                                      </Box>
                                    </Box>
                                    <Box display="flex" justifyContent="end">
                                      {checkedItems && checkedItems[item.name] ? (
                                        <CloseIcon onClick={() => checkNFTHandle(item.name, false, 'unstaked')} className={classes.stakingCTA}></CloseIcon>
                                      ) : (
                                        <AddIcon onClick={() => checkNFTHandle(item.name, true, 'unstaked')} className={classes.stakingCTA}></AddIcon>
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Button onClick={nftStake} className={classes.nftStakeBtn}>STAKE {checkedItems && Object.values(checkedItems).filter(item => item === true).length ? Object.values(checkedItems).filter(item => item === true).length : ''
                            } NFT</Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabVal} index={1}>
                          <Box display="flex" justifyContent="end">
                            {
                              checkedItems1 && Object.values(checkedItems1).filter(item => item === true).length ? (
                                <Button onClick={deselectAllNFT1} className={classes.selectAllBtn}><CloseIcon style={{ fontSize: "15px" }}></CloseIcon> {checkedItems1 && Object.values(checkedItems1).filter(item => item === true).length ? Object.values(checkedItems1).filter(item => item === true).length : ''
                                } SELECTED</Button>
                              ) : (
                                <Button onClick={selectAllNFT1} className={classes.selectAllBtn}>Select All</Button>
                              )
                            }
                          </Box>
                          <Box className={classes.nftScroll} id="nft-scroll">
                            {stakedItems && stakedItems.map((item, index) => (
                              <Box key={index}>
                                <Box display="flex" className={checkedItems1 && checkedItems1[item.name] ? clsx(classes.stakingNFTBlock, classes.selectedNFT) : classes.stakingNFTBlock} >
                                  <img className={checkedItems1 && checkedItems1[item.name] ? clsx(classes.stakingImg, classes.selectedNFT) : classes.stakingImg} src={item.url}></img>
                                  <Box display="flex" justifyContent="space-between" className={classes.stakingWrap}>
                                    <Box>
                                      <Box display="flex" alignItems="center" mb="12px">
                                        <Typography className={checkedItems1 && checkedItems1[item.name] ? clsx(classes.stakingInfo, classes.stakingInfoSelected) : classes.stakingInfo}>NAME</Typography>
                                        <Typography className={checkedItems1 && checkedItems1[item.name] ? clsx(classes.stakingName, classes.stakingNameSelect) : classes.stakingName}>PUFFS {item.name}</Typography>
                                      </Box>
                                      <Box display="flex" alignItems="center">
                                        <Typography className={checkedItems1 && checkedItems1[item.name] ? clsx(classes.stakingInfo1, classes.stakingInfoSelected) : classes.stakingInfo1}>RARITY RANK</Typography>
                                        <Typography className={checkedItems1 && checkedItems1[item.name] ? clsx(classes.stakingName, classes.stakingNameSelect) : classes.stakingName}></Typography>
                                      </Box>
                                    </Box>
                                    <Box display="flex" justifyContent="end">
                                      {checkedItems1 && checkedItems1[item.name] ? (
                                        <CloseIcon onClick={() => checkNFTHandle(item.name, false, 'staked')} className={classes.stakingCTA}></CloseIcon>
                                      ) : (
                                        <AddIcon onClick={() => checkNFTHandle(item.name, true, 'staked')} className={classes.stakingCTA}></AddIcon>
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Button onClick={nftUnstake} className={classes.nftStakeBtn}>UNSTAKE {checkedItems1 && Object.values(checkedItems1).filter(item => item === true).length ? Object.values(checkedItems1).filter(item => item === true).length : ''
                            } NFT</Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabVal} index={2}>
                          <Box display="flex" justifyContent="end">
                            {
                              checkedItems2 && Object.values(checkedItems2).filter(item => item === true).length ? (
                                <Button onClick={deselectAllNFT2} className={classes.selectAllBtn}><CloseIcon style={{ fontSize: "15px" }}></CloseIcon> {checkedItems2 && Object.values(checkedItems2).filter(item => item === true).length ? Object.values(checkedItems2).filter(item => item === true).length : ''
                                } SELECTED</Button>
                              ) : (
                                <Button onClick={selectAllNFT2} className={classes.selectAllBtn}>Select All</Button>
                              )
                            }
                          </Box>
                          <Box className={classes.nftScroll} id="nft-scroll">
                            {rewardItems && rewardItems.map((item, index) => (
                              <Box key={index}>
                                <Box display="flex" className={checkedItems2 && checkedItems2[item.name] ? clsx(classes.stakingNFTBlock, classes.selectedNFT) : classes.stakingNFTBlock} >
                                  <img className={checkedItems2 && checkedItems2[item.name] ? clsx(classes.stakingImg, classes.selectedNFT) : classes.stakingImg} src={item.url}></img>
                                  <Box display="flex" justifyContent="space-between" className={classes.stakingWrap}>
                                    <Box>
                                      <Box display="flex" alignItems="center" mb="12px">
                                        <Typography className={checkedItems2 && checkedItems2[item.name] ? clsx(classes.stakingInfo, classes.stakingInfoSelected) : classes.stakingInfo}>NAME</Typography>
                                        <Typography className={checkedItems2 && checkedItems2[item.name] ? clsx(classes.stakingName, classes.stakingNameSelect) : classes.stakingName}>PUFFS {item.name}</Typography>
                                      </Box>
                                      <Box display="flex" alignItems="center">
                                        <Typography className={checkedItems2 && checkedItems2[item.name] ? clsx(classes.stakingInfo1, classes.stakingInfoSelected) : classes.stakingInfo1}>REWARDS</Typography>
                                        <Typography className={checkedItems2 && checkedItems2[item.name] ? clsx(classes.stakingName, classes.stakingNameSelect) : classes.stakingName}>{item.reward}</Typography>
                                      </Box>
                                    </Box>
                                    <Box display="flex" justifyContent="end">
                                      {checkedItems2 && checkedItems2[item.name] ? (
                                        <CloseIcon onClick={() => checkNFTHandle(item.name, false, 'rewarded')} className={classes.stakingCTA}></CloseIcon>
                                      ) : (
                                        <AddIcon onClick={() => checkNFTHandle(item.name, true, 'rewarded')} className={classes.stakingCTA}></AddIcon>
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box className={classes.totalBlock}>
                              <Typography className={classes.totalTitle}>TOTAL REWARDS</Typography>
                              <Typography className={classes.gravAmount}>{totalRewards && totalRewards.toFixed(3)} xGRAV</Typography>
                            </Box>
                            <Button onClick={nftClaim} className={classes.nftStakeBtn}>CLAIM</Button>
                          </Box>
                        </TabPanel>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box id="time" className={classes.lockStakingBlock} style={{ position: "relative", overflowX: "hidden" }}>
              {!matches && (
                <Box display="flex" position="absolute" style={{ right: "0px", top: "14px" }}>
                  <Box width="217px" display="flex" justifyContent="space-around">
                    <Typography className={classes.topLabel}>6 MONTH</Typography>
                    <Typography className={classes.topLabelInfo}>~35% APR</Typography>
                  </Box>
                  <Box width="217px" display="flex" justifyContent="space-around">
                    <Typography className={classes.topLabel}>12 MONTH</Typography>
                    <Typography className={classes.topLabelInfo}>~35% APR</Typography>
                  </Box>
                </Box>
              )}
              <Typography variant="h2" className={classes.blockTitle}>
                TIME LOCKED STAKING
              </Typography>
              <Typography variant="h2" className={classes.blockTitleDesc}>
                <img style={{ marginRight: "10px" }} src="up-arrow.png"></img> Lock GRAV Token and Earn xGRAV <img style={{ marginLeft: "10px" }} src="up-arrow.png"></img>
              </Typography>
              {matches && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box width="217px" display="flex" flexDirection="column" style={{ border: "1px solid #E9D758", padding: "20px", textAlign: "center", marginBottom: "15px" }}>
                    <Typography className={classes.topLabel}>6 MONTH</Typography>
                    <Typography className={classes.topLabelInfo}>~35% APR</Typography>
                  </Box>
                  <Box width="217px" display="flex" flexDirection="column" style={{ border: "1px solid #E9D758", padding: "20px", textAlign: "center", marginBottom: "50px" }}>
                    <Typography className={classes.topLabel}>6 MONTH</Typography>
                    <Typography className={classes.topLabelInfo}>~35% APR</Typography>
                  </Box>
                </Box>
              )}
              <Grid container spacing={3} className={classes.stakeInputBlock}>
                <Grid item md={4} xs={10}>
                  <FormControl className={classes.stakedInput} variant="outlined">
                    <InputLabel style={{ transition: "none" }} shrink={true} htmlFor="staked-html">STAKED</InputLabel>
                    <OutlinedInput
                      id="staked-html"
                      type="text"
                      endAdornment={<InputAdornment className={classes.unitLabel} position="end">GRAV</InputAdornment>}
                      notched
                      value={lockStakedAmount}
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={10}>
                  <FormControl className={classes.stakedInput} variant="outlined">
                    <InputLabel style={{ transition: "none" }} shrink={true} htmlFor="staked-html">REWARDS</InputLabel>
                    <OutlinedInput
                      id="staked-html"
                      type="text"
                      endAdornment={<InputAdornment className={classes.unitLabel} position="end">xGRAV</InputAdornment>}
                      notched
                      value={lockPendingReward}
                      labelWidth={90}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item md={4} xs={10}>
                  <Button variant="contained" onClick={getRewards} className={classes.claimBtn}>
                    Claim
                  </Button>
                </Grid> */}
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography className={classes.stakeAndLockTitle} variant="h1">STAKE AND LOCK</Typography>
                  <Typography className={classes.stakeAndLockSubTitle} variant="h1">BALANCE: <span style={{ color: '#fff', fontSize: "20px", marginLeft: "20px" }}>{lockStakedAmount}</span></Typography>
                </Grid>
                <Grid container item md={6} xs={12} className={classes.stakeAndLockRight}>
                  <Grid item container xs={12} className={classes.stakeAndLockRightTop}>
                    <Grid item md={8}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          placeholder="ENTER AMOUNT TO STAKE"
                          onChange={(event) => {
                            dispatch({
                              type: 'SET_MONTH_STAKE_AMOUNT',
                              monthStakingInputAmount: event.target.value
                            });
                          }}
                          className={classes.stakeAmountInput}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <Box display="flex" alignItems="center" justifyContent="end" height="100%">
                        <Typography className={classes.unitLabel1}>GRAV</Typography>
                        <Button className={classes.maxBtn}>MAX</Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item md={6} xs={12} className={classes.stakeAndLockRightBottomLeft}>
                      <Button onClick={staking6Months} className={clsx(classes.stake6btn, classes.mobileCTA)}>STAKE 6 MONTHS</Button>
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.stakeAndLockRightBottomRight}>
                      <Button onClick={staking12Month} className={classes.stake6btn}>STAKE 12 MONTHS</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography className={classes.stakeAndLockTitle} variant="h1">DEPOSIT</Typography>
                  <Typography className={classes.stakeAndLockSubTitle1} variant="h1">Add to your initial stake with zero additional time added!</Typography>
                </Grid>
                <Grid container item md={6} xs={12} className={classes.stakeAndLockRight}>
                  <Grid item container xs={12} className={classes.stakeAndLockRightTop}>
                    <Grid item md={8}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          placeholder="ENTER AMOUNT TO DEPOSIT"
                          className={classes.stakeAmountInput}
                          onChange={(event) => {
                            dispatch({
                              type: 'SET_LOCK_DEPOSIT_AMOUNT',
                              lockDepositAmount: event.target.value
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <Box display="flex" alignItems="center" justifyContent="end" height="100%">
                        <Typography className={classes.unitLabel1}>GRAV</Typography>
                        <Button className={classes.maxBtn}>MAX</Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} className={classes.stakeAndLockRightBottomRight}>
                    <Button onClick={lockDeposit} className={clsx(classes.stake6btn, classes.mobileCTA)}>DEPOSIT</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography className={classes.stakeAndLockTitle} variant="h1">UNSTAKE</Typography>
                </Grid>
                <Grid container item md={6} xs={12} className={classes.stakeAndLockRight}>
                  <Grid item container xs={12} className={classes.stakeAndLockRightTop}>
                    <Grid item md={8}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          placeholder="ENTER AMOUNT TO UNSTAKE"
                          className={classes.stakeAmountInput}
                          onChange={(event) => {
                            dispatch({
                              type: 'SET_UNSTAKE_AMOUNT',
                              lockUnstakeAmount: event.target.value
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <Box display="flex" alignItems="center" justifyContent="end" height="100%">
                        <Typography className={classes.unitLabel1}>GRAV</Typography>
                        <Button onClick={() => {
                          dispatch({
                            type: 'SET_UNSTAKE_AMOUNT',
                            lockUnstakeAmount: parseInt(lockStakedAmount)
                          });
                        }} className={classes.maxBtn}>MAX</Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} className={classes.stakeAndLockRightBottomRight}>
                    <Button onClick={lockUnStake} className={clsx(classes.stake6btn, classes.mobileCTA)}>UNSTAKE</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid >
      </Container >
      <ToastContainer />
      <UnlocksModal open={openUnlocksModal} handleModalClose={handleModalClose}></UnlocksModal>
    </Layout >
  );
};

export default Staking;
