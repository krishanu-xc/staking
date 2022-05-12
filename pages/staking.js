import Layout from "components/layout/Layout";

import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Switch,
  Select,
  Input,
  MenuItem,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-scroll";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Modal from "@mui/material/Modal";

import React, { useContext, useEffect, useReducer, useState } from "react";
import Web3 from "web3";
import {
  singleContractAddress,
  singleAbi,
  lockContractAddress,
  lockAbi,
  tokenAddress,
  tokenAbi,
  nftContractAddress,
  nftContractABI,
  nftAddress,
  nftABI,
  lockXGRAVContractAddress,
  lockXGRAVAbi,
  rarityStakingContractAddress,
  rarityStakingContractABI,
  harmoleculesContractAddress,
  harmoleculesContractABI,
} from "../public/config";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link as Links } from "@material-ui/core";

import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UnlocksModal from "../components/Staking/UnlocksModal";
import { ethers } from "ethers";
import {
  Provider as MulticallProvider,
  Contract as MulticallContract,
} from "ethers-multicall";
import axios from "axios";
import Countdown, { zeroPad } from "react-countdown";
import LazyLoad from "react-lazyload";
import Web3Context from "context/Web3Context";

const useStyles = makeStyles((theme) => ({
  connectBtn: {
    minWidth: "100%",
    padding: "10px 0px",
    textAlign: "center",
    color: "#E9D758",
    border: "1px solid #E9D758",
    borderRadius: "0",
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
    },
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
      color: "#fff",
    },
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
    },
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
    },
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
    },
  },
  lockStakingBlock: {
    backgroundImage: "url('nft-staking-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "left",
    padding: "0px 67px",
    paddingBottom: "30px",
    marginBottom: "100px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 16px",
      backgroundSize: "216% 100%",
      paddingBottom: "10px",
    },
  },
  rarityStakingBlock: {
    backgroundImage: "url('nft-staking-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "left",
    padding: "0px 67px",
    paddingBottom: "30px",
    marginBottom: "100px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 16px",
      backgroundSize: "216% 100%",
      paddingBottom: "10px",
    },
  },
  blockTitle: {
    paddingTop: "16px",
    color: "#E9D758",
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
    marginBottom: "48px",
  },
  flexibleContent: {
    paddingTop: "60px",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "20px",
    },
  },
  nftStakingContent: {
    paddingTop: "40px",
    paddingBottom: "55px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "80px",
    },
  },
  leftFlexBlock: {
    backgroundImage: "url('flex-left.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "263px",
    textAlign: "center",
    "& .MuiButtonGroup-grouped": {
      minWidth: "100px",
    },
  },
  leftStakingBlock: {
    backgroundImage: "url('incubator-illo.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "430px",
    height: "540px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  rightRarityBlock: {
    marginTop: "100px",
    transform: "scaleX(-1)",
    backgroundImage: "url('incubator-illo.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "300px",
    height: "360px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  flyInto: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "22px",
    color: "#E9D758",
    paddingTop: "12px",
  },
  flyInto1: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "22px",
    color: "#E9D758",
  },
  flyInto2: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "22px",
    color: "#E9D758",
    marginBottom: 10,
  },
  stakeOv: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "18px",
    color: "#E9D758",
    paddingTop: "28px",
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
      height: "14px",
    },
    "& .rc-input-number-handler-up": {
      border: "0",
    },
    "& .rc-input-number-handler-wrap": {
      border: "0",
    },
  },
  darkMatter: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "13px",
    marginBottom: "24px",
  },
  stakeBtn: {
    color: "#000",
    background: "#E9D758",
    border: "1px solid #E9D758",
    "&:hover": {
      border: "1px solid #E9D758",
      background: "#E9D758",
    },
  },
  unstakeBtn: {
    color: "#fff",
    border: "1px solid #E9D758",
    "&:hover": {
      border: "1px solid #E9D758",
    },
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
      height: "230px",
    },
  },
  stakedBlock: {
    width: "270px",
    background: "#fff",
    padding: "10px",
    marginTop: "60px",
    marginBottom: "12px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
      marginTop: "50px",
    },
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
    fontWeight: 600,
  },
  rewardLabel: {
    textAlign: "left",
    color: "#000",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "13px",
    fontWeight: 600,
  },
  stakedAmount: {
    color: "#000",
    fontWeight: "normal",
    marginRight: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  rewardedAmount: {
    color: "#000",
    fontWeight: "normal",
    marginRight: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  stakingNFT: {
    width: "100%",
    background: "#06070E",
    [theme.breakpoints.down("xs")]: {
      marginTop: "30px",
      marginBottom: "50px",
    },
  },
  nftTitle: {
    width: "fit-content",
    border: "1px solid #E9D758",
    padding: "10px 90px 10px 20px",
    borderBottom: "none",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 40px 10px 15px",
    },
  },
  totalBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E9D758",
    marginRight: "20px",
    padding: "5px 20px",
  },
  totalBlock2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E9D758",
    marginRight: "20px",
    padding: "5px 20px",
    marginTop: "20px",
  },
  totalTitle: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#FFFFFF",
    marginRight: "50px",
  },
  totalTitle2: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#FFFFFF",
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
    },
  },
  nftStakeBtn2: {
    borderRadius: "0",
    border: "1px solid #E9D758",
    color: "#fff",
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
      color: "#121212",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "16px",
      width: "160px",
    },
  },
  closeBtn: {
    borderRadius: "0",
    background: "#E9D758",
    color: "#000",
    paddingTop: "6px",
    paddingBottom: "6px",
    width: "150px",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    marginLeft: "auto",
    marginRight: "auto",
    "&:hover": {
      backgroundColor: "#E9D758",
    },
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "16px",
      width: "120px",
    },
  },
  rarityStakeBtn: {
    marginLeft: "6px",
    borderRadius: "0",
    background: "#E9D758",
    color: "#000",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "160px",
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
    },
  },
  rollBtn: {
    borderRadius: "0",
    background: "#E9D758",
    color: "#000",
    paddingTop: "4px",
    paddingBottom: "4px",
    width: "100px",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#E9D758",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "16px",
    },
  },
  selectedRollBtn: {
    background: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  countdownBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E9D758",
    marginRight: "20px",
    padding: "5px 20px",
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
    },
  },
  singleStakeInput: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "60%",
    transition: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
      borderWidth: "1px",
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
    },
  },
  stakedInput: {
    marginRight: "20px",
    width: "100%",
    transition: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E9D758",
      borderWidth: "1px",
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
    },
  },
  unitLabel: {
    "& p": {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "26px",
      color: "#fff",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  },
  unitLabel1: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  stakeAmountInput: {
    width: "100vh",
    [theme.breakpoints.down("xs")]: {
      width: "inherit",
    },
    "& input": {
      color: "#fff",
      border: "0",
      padding: "14px",
    },
    "& input::placeholder": {
      fontFamily: "Archivo",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "17px",
      color: "#aaa",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
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
      fontWeight: "800",
    },
  },
  topLabel: {
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#E9D758",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
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
      border: "0",
    },
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
    },
  },
  stakeAndLockRight: {
    borderLeft: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderLeft: "6px solid #E9D758",
    },
  },
  stakeAndLockRightTop: {
    borderBottom: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderRight: "1px solid #E9D758",
    },
  },
  stakeAndLockRightBottomLeft: {
    borderRight: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "1px solid #E9D758",
    },
  },
  stakeAndLockRightBottomRight: {
    borderRight: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      borderBottom: "1px solid #E9D758",
    },
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
    marginBottom: "17px",
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
    },
  },
  stakeInputBlock: {
    marginBottom: "70px",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
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
      color: "#06070E",
    },
  },
  mobileCTA: {
    [theme.breakpoints.down("xs")]: {
      background: "#E9D758",
      color: "#000",
      "&:hover": {
        background: "#E9D758",
        color: "#000",
      },
    },
  },
  customLeftArrow: {
    display: "block",
    top: "40%",
    "&::before": {
      display: "none",
    },
    right: "-20px",
    [theme.breakpoints.down("xs")]: {
      top: "45%",
      "& img": {
        width: "20px",
        height: "30px",
      },
    },
  },
  customRightArrow: {
    display: "block",
    top: "40%",
    "&::before": {
      display: "none",
    },
    left: "-30px",
    [theme.breakpoints.down("xs")]: {
      top: "45%",
      left: "-20px",
      "& img": {
        width: "20px",
        height: "30px",
      },
    },
  },
  nftItem: {
    display: "flex !important",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    border: "none",
  },
  nftImgContainer: {
    padding: "10px 55px",
    border: "2px solid #333745",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 35px",
    },
  },
  selectBtn: {
    fontFamily: "Archivo",
    fontWeight: "600",
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
    },
  },
  selectBtn1: {
    fontFamily: "Archivo",
    fontWeight: "600",
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
    },
  },
  nftNFTs: {
    border: "1px solid #E9D758",
    padding: "13px 20px 29px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 15px 20px 15px",
    },
  },
  statCard: {
    height: "100%",
    padding: "12px 20px 10px 20px",
    marginLeft: "30px",
    backgroundImage: "url('nft-staking-frame.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      padding: "20px",
    },
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
    },
  },
  myNft: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#FFFFFF",
    marginRight: "57px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
    },
  },
  myNft2: {
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#E9D758",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
    },
  },
  bigNumber: {
    marginTop: "10px",
    fontFamily: "Archivo",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "22px",
    lineHeight: "17px",
    color: "#ffffff",
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
      background: "#E9D758 !important",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0",
      minWidth: "100px !important",
    },
  },
  muiTabs: {
    minHeight: "unset !important",
  },
  stakingImg: {
    width: "88px",
    height: "88px",
    flexShrink: "0",
    borderRight: "1px solid #333745",
    [theme.breakpoints.down("xs")]: {
      width: "65px",
      height: "65px",
    },
  },
  stakingWrap: {
    padding: "21px",
    flexGrow: "1",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  stakingWrap2: {
    padding: "16px",
    flexGrow: "1",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
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
    },
  },
  stakingInfo2: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "13px",
    letterSpacing: "0.05em",
    color: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      marginRight: "15px",
    },
  },
  stakingInfo1: {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "13px",
    letterSpacing: "0.05em",
    color: "#FFFFFF",
    marginRight: "18px",
  },
  stakingInfoSelected: {
    color: "#333745",
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
    },
  },
  stakingName2: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "17px",
    color: "#aaa",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
      lineHeight: "15px",
    },
  },
  stakingNameSelect: {
    color: "#06070E",
  },
  stakingCTA: {
    color: "#333745",
    fontSize: "40px",
  },
  stakingNFTBlock: {
    background: "#06070E",
    border: "1px solid #333745",
    marginBottom: "12px",
    cursor: "pointer",
  },
  stakingNFTBlock2: {
    width: "100%",
    background: "#06070E",
    border: "1px solid #333745",
    padding: "16px",
    marginBottom: "10px",
  },
  selectedNFT: {
    borderColor: "#E9D758",
    background: "#E9D758",
  },
  nftCheckbox: {
    color: "#333745",
    padding: "1px",
    borderRadius: "0",
    "&.Mui-checked": {
      color: "#E9D758",
    },
  },
  nftScroll: {
    height: "260px",
    overflowY: "auto",
    paddingRight: "20px",
    marginBottom: "55px",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "10px",
      marginBottom: "35px",
    },
  },
  nftScroll2: {
    height: "260px",
    overflowY: "auto",
    marginBottom: "55px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "35px",
    },
  },
  unitMobile: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  itemMargin: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "12px",
    },
  },
  lockXgrav: {
    fontSize: "15px !important",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "12px",
      width: "230px",
    },
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
        height: "226px",
      },
    },
  },
  whiteBg: {
    background: "#fff",
    minHeight: "16px",
    flexGrow: "1",
  },
  antiGrav: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "17px",
    color: "#FFFFFF",
    flexShrink: "0",
    marginRight: "16px",
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
    marginRight: "10px",
  },
  antiGravDescBottom: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#FFFFFF",
    marginTop: "10px",
    marginBottom: "16px",
  },
  whiteWrap: {
    border: "1px solid #fff",
    padding: "16px",
  },
  swapInputBlock: {
    marginBottom: "40px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  penalty: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "15px",
    color: "#FFFFFF",
    marginBottom: "10px",
  },
  mb0: {
    marginBottom: "0",
  },
  toggleBtn: {
    width: "48px",
    height: "24px",
    padding: "0",
    "& .MuiSwitch-switchBase": {
      top: "-5px",
      left: "-5px",
    },
    "& .MuiSwitch-track": {
      background: "#333745",
      opacity: "1",
      borderRadius: "0",
    },
    "& .MuiSwitch-thumb": {
      borderRadius: "0",
      width: "20px",
      height: "16px",
    },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      background: "#E9D758",
      opacity: "1",
    },
  },
  mobileLocked: {
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
  },
  lockedRightTop: {
    right: "0px",
    top: "0",
    padding: "15px 33px",
    border: "1px solid #E9D758",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
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
      paddingLeft: "70px",
    },
    "& svg": {
      fontSize: "40px",
      top: "3px",
      fill: "#E9D758",
    },
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontFamily: "Archivo",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    backgroundColor: "#121212",
    border: "1px solid #E9D758",
    padding: 10,
  },
  modalResult: {
    border: "1px solid #E9D758",
    display: "flex",
    justifyContent: "space-between",
    padding: 6,
    marginTop: 6,
  },
}));

const initialState = {
  address: null,
  web3: null,
  singleContract: null,
  stakedAmount: "",
  pendingReward: "",
  singleInputAmount: "",
  lockContract: null,
  lockStakedAmount: "",
  lockPendingReward: "",
  monthStakingInputAmount: "",
  lockUnstakeAmount: "",
  lockDepositAmount: "",
  nftContract: null,
  currentItems: null,
  stakedItems: null,
  rewardItems: null,
  totalRewards: "",
  rarityContract: null,
  currentItemsRarity: null,
  stakedItemsRarity: null,
  rewardItemsRarity: null,
  totalRewardsRarity: "",
  lockXgravContract: null,
  lockXgravStakedAmount: "",
  lockXgravPendingReward: "",
  lockXgravStakingInput: "",
  lockXgravWithdrawal: "",
  lockStakedIds: [],
  lockStakedRewards: {},
  totalGravsStaked: null,
  totalRewardsLocked: null,
  totalAmountLocked: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_WEB3":
      return {
        ...state,
        web3: action.web3,
      };
    case "SET_SINGLE_CONTRACT":
      return {
        ...state,
        singleContract: action.singleContract,
      };
    case "SET_SINGLE_AMOUNT":
      return {
        ...state,
        singleInputAmount: action.singleInputAmount,
      };
    case "SET_LOCK_CONTRACT":
      return {
        ...state,
        lockContract: action.lockContract,
      };
    case "SET_XGRAV_LOCK_CONTRACT":
      return {
        ...state,
        lockXgravContract: action.lockXgravContract,
      };
    case "SET_NFT_CONTRACT":
      return {
        ...state,
        nftContract: action.nftContract,
      };
    case "SET_CURRENT_ITEMS":
      return {
        ...state,
        currentItems: action.currentItems,
      };
    case "SET_STAKED_ITEMS":
      return {
        ...state,
        stakedItems: action.stakedItems,
      };
    case "SET_REWARD_ITEMS":
      return {
        ...state,
        rewardItems: action.rewardItems,
      };
    case "SET_TOTAL_REWARDS":
      return {
        ...state,
        totalRewards: action.totalRewards,
      };
    case "SET_RARITY_CONTRACT":
      return {
        ...state,
        rarityContract: action.rarityContract,
      };
    case "SET_CURRENT_ITEMS_RARITY":
      return {
        ...state,
        currentItemsRarity: action.currentItemsRarity,
      };
    case "SET_STAKED_ITEMS_RARITY":
      return {
        ...state,
        stakedItemsRarity: action.stakedItemsRarity,
      };
    case "SET_REWARD_ITEMS_RARITY":
      return {
        ...state,
        rewardItemsRarity: action.rewardItemsRarity,
      };
    case "SET_TOTAL_REWARDS_RARITY":
      return {
        ...state,
        totalRewardsRarity: action.totalRewardsRarity,
      };
    case "SET_ONGOING_ITEMS_LOCKED":
      return {
        ...state,
        ongoingItemsLocked: action.ongoingItemsLocked,
      };
    case "SET_COMPLETED_ITEMS_LOCKED":
      return {
        ...state,
        completedItemsLocked: action.completedItemsLocked,
      };
    case "SET_MONTH_STAKE_AMOUNT":
      return {
        ...state,
        monthStakingInputAmount: action.monthStakingInputAmount,
      };
    case "SET_XGRAV_LOCK_STAKE_AMOUNT":
      return {
        ...state,
        lockXgravStakingInput: action.lockXgravStakingInput,
      };
    case "SET_XGRAV_LOCK_WITHDRAWAL_AMOUNT":
      return {
        ...state,
        lockXgravWithdrawal: action.lockXgravWithdrawal,
      };
    case "SET_UNSTAKE_AMOUNT":
      return {
        ...state,
        lockUnstakeAmount: action.lockUnstakeAmount,
      };
    case "SET_LOCK_DEPOSIT_AMOUNT":
      return {
        ...state,
        lockDepositAmount: action.lockDepositAmount,
      };
    case "SET_STAKED_PENDING":
      return {
        ...state,
        stakedAmount: action.stakedAmount,
        pendingReward: action.pendingReward,
      };
    case "SET_LOCK_STAKED_PENDING":
      return {
        ...state,
        lockStakedAmount: action.lockStakedAmount,
        lockPendingReward: action.lockPendingReward,
      };
    case "SET_LOCK_STAKED_IDS":
      return {
        ...state,
        lockStakedIds: action.lockStakedIds,
      };
    case "SET_LOCK_STAKED_REWARDS":
      return {
        ...state,
        lockStakedRewards: action.lockStakedRewards,
      };
    case "SET_XGRAV_LOCK_STAKED_PENDING":
      return {
        ...state,
        lockXgravStakedAmount: action.lockXgravStakedAmount,
        lockXgravPendingReward: action.lockXgravPendingReward,
      };
    case "SET_LOCK_STAKED_AMOUNT":
      return {
        ...state,
        lockStakedAmount: action.lockStakedAmount,
      };
    case "SET_LOCKED_STAKING_CONTRACT":
      return {
        ...state,
        lockedStakingContract: action.lockedStakingContract,
      };
    case "SET_TOTAL_GRAVS_STAKED":
      return {
        ...state,
        totalGravsStaked: action.totalGravsStaked,
      };

    case "SET_TOTAL_REWARDS_LOCKED":
      return {
        ...state,
        totalRewardsLocked: action.totalRewardsLocked,
      };

    case "SET_TOTAL_AMOUNT_LOCKED":
      return {
        ...state,
        totalAmountLocked: action.totalAmountLocked,
      };
    default:
      throw new Error();
  }
};

const Staking = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const { address, setAddress } = useContext(Web3Context);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
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
    rarityContract,
    currentItemsRarity,
    stakedItemsRarity,
    rewardItemsRarity,
    totalRewardsRarity,
    ongoingItemsLocked,
    completedItemsLocked,
    lockedStakingContract,
    lockXgravContract,
    lockXgravStakedAmount,
    lockXgravPendingReward,
    lockXgravStakingInput,
    lockXgravWithdrawal,
    lockStakedIds,
    lockStakedRewards,
    totalGravsStaked,
    totalRewardsLocked,
    totalAmountLocked,
  } = state;

  const [APR, setAPR] = useState("~");

  const connectWallet = async () => {
    const providerOptions = {
      metamask: {
        display: {
          name: "Injected",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            1666600000: "https://api.harmony.one",
            // 1666700000: "https://api.s0.b.hmny.io",
          },
          network: "harmony mainnet",
        },
      },
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      disableInjectedProvider: false,
      providerOptions, // required
    });
    web3Modal.clearCachedProvider();

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    provider.on("connect", (info) => {
      toast.success(`Connected wallet`);
    });

    provider.on("error", (e) => {
      toast.success(e);
    });

    provider.on("disconnect", (error) => {
      web3Modal.clearCachedProvider();
      dispatch({
        type: "SET_ADDRESS",
        address: "",
      });
    });

    provider.on("accountsChanged", (accounts) => {
      dispatch({
        type: "SET_ADDRESS",
        address: accounts[0],
      });
    });

    const _address = await web3.eth.getAccounts();

    setAddress(_address[0]);

    dispatch({
      type: "SET_WEB3",
      web3: web3,
    });

    const singleStakingContract = new web3.eth.Contract(
      singleAbi,
      singleContractAddress
    );

    dispatch({
      type: "SET_SINGLE_CONTRACT",
      singleContract: singleStakingContract,
    });

    // const lockStakingContract = new web3.eth.Contract(lockAbi, lockContractAddress)

    // dispatch({
    //   type: 'SET_LOCK_CONTRACT',
    //   lockContract: lockStakingContract
    // });

    const ethers = require("ethers");

    const provider1 = new ethers.providers.Web3Provider(web3.currentProvider);
    const _signer = provider1.getSigner();

    const nftStakingContract = new ethers.Contract(
      nftContractAddress,
      nftContractABI,
      _signer
    );

    dispatch({
      type: "SET_NFT_CONTRACT",
      nftContract: nftStakingContract,
    });

    // const lockXgravContracts = new web3.eth.Contract(lockXGRAVAbi, lockXGRAVContractAddress);

    // dispatch({
    //   type: 'SET_XGRAV_LOCK_CONTRACT',
    //   lockXgravContract: lockXgravContracts
    // });

    const harmoleculesContract = new ethers.Contract(
      harmoleculesContractAddress,
      harmoleculesContractABI,
      _signer
    );

    dispatch({
      type: "SET_RARITY_CONTRACT",
      rarityContract: harmoleculesContract,
    });

    const _lockedStakingContract = new ethers.Contract(
      lockContractAddress,
      lockAbi,
      _signer
    );

    dispatch({
      type: "SET_LOCKED_STAKING_CONTRACT",
      lockedStakingContract: _lockedStakingContract,
    });
  };

  useEffect(() => {
    singleContract && getBalance();
  }, [singleContract]);

  useEffect(() => {
    lockContract && getLockStakingBalance();
  }, [lockContract]);

  useEffect(() => {
    lockXgravContract && getXgravLockStakingBalance();
  }, [lockXgravContract]);

  useEffect(() => {
    nftContract && getNFTBalance();
  }, [nftContract]);

  // useEffect(() => {
  //   rarityContract && getHarmoleculesNFT();
  // }, [rarityContract]);

  useEffect(() => {
    lockedStakingContract && getLockedStakingData();
  }, [lockedStakingContract]);

  const getNFTBalance = async () => {
    const startTime = Date.now();
    setLoading(true);
    setLoading1(true);
    setLoading2(true);

    let provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.hermesdefi.io/"
    );

    //Contract
    const contract = new ethers.Contract(nftAddress, nftABI, provider);
    const balance = await contract.balanceOf(address);

    const setupMultiCallContract = async (nftAddress, nftABI) => {
      const provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "any"
      );
      const ethcallProvider = new MulticallProvider(provider);

      await ethcallProvider.init();
      ethcallProvider._multicallAddress =
        "0x34b415f4d3b332515e66f70595ace1dcf36254c5";

      const multicallContract = new MulticallContract(nftAddress, nftABI);
      return [ethcallProvider, multicallContract];
    };

    let tokenCalls = [];
    let result;

    try {
      const [multicallProvider, multicallContract] =
        await setupMultiCallContract(nftAddress, nftABI);
      for (let i = 0; i < balance; i++) {
        tokenCalls.push(multicallContract.tokenOfOwnerByIndex(address, i));
      }
      const userTokens = (await multicallProvider?.all(tokenCalls)).map((e) =>
        e.toString()
      );

      const promises = userTokens.map(async (element) => {
        try {
          const uri = await contract.tokenURI(element);
          const response = await fetch(uri);

          if (!response.ok) throw new Error(response.statusText);

          const json = await response.json();
          return {
            id: element,
            name: json.name,
            key: json.dna,
            url: json.image,
          };
          // return {
          //   id: element,
          //   name: element,
          //   key: element,
          //   url: '/buy-button.png'
          // }
        } catch (err) {
          console.log(err);
        }
      });
      const itemsArr = await Promise.all(promises);
      dispatch({
        type: "SET_CURRENT_ITEMS",
        currentItems: itemsArr,
      });
      setLoading(false);

      const stakedOnes = await nftContract.getUserStaked(address);
      const stakedIds = stakedOnes.map((e) => Number(e));

      const stakedPromises = stakedIds.map(async (element) => {
        const uri = await contract.tokenURI(element);
        const response = await fetch(uri);

        if (!response.ok) throw new Error(response.statusText);

        const json = await response.json();
        return {
          id: element,
          name: json.name,
          key: json.dna,
          url: json.image,
        };
      });
      result = await Promise.all(stakedPromises);
      setLoading1(false);

      dispatch({
        type: "SET_STAKED_ITEMS",
        stakedItems: result,
      });
    } catch (error) {
      console.log(error);
    }

    let finalRewards = [];
    let sumUpRewards = 0;
    try {
      let rewarding = [];
      const [multicallProvider, multicallContract] =
        await setupMultiCallContract(nftContractAddress, nftContractABI);
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        // getRewardsByID
        rewarding.push(multicallContract.getReward(element.id));
        // const res = await nftContract.getReward(element.id);
        // rewarding.push({
        //   id: element.id,
        //   name: element.name,
        //   key: element.id,
        //   url: element.url,
        //   rewards: res / Math.pow(10, 18),
        // });
        // sumUpRewards += res / Math.pow(10, 18);
      }
      const rewards = (await multicallProvider?.all(rewarding)).map((e) =>
        ethers.utils.formatEther(e)
      );

      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        element.rewards = rewards[i];
        finalRewards.push(element);
        sumUpRewards += new Number(rewards[i]);
      }
    } catch (err) {
      console.log(err);
    }
    axios.get("https://oneverse-backend.onrender.com/price").then((res) => {
      const data = res.data;
      const multiplier = data.decrease;
      const _totalRewards = sumUpRewards * multiplier;
      const _finalRewards = finalRewards.map((e) => {
        e.rewards *= multiplier;
        return e;
      });
      dispatch({
        type: "SET_REWARD_ITEMS",
        rewardItems: _finalRewards,
      });
      dispatch({
        type: "SET_TOTAL_REWARDS",
        totalRewards: _totalRewards,
      });
      setLoading2(false);
    });
  };

  const getHarmoleculesNFT = async () => {
    console.log("H");
    const defaultUri =
      "https://harmolecules.mypinata.cloud/ipfs/QmTQfazmn4sXcte6TjVmY7NkxNqj8meqjpXxtC2xuzg6cA/1.json";

    const setupMultiCallContract = async (nftAddress, nftABI) => {
      const provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "any"
      );
      const ethcallProvider = new MulticallProvider(provider);

      await ethcallProvider.init();
      ethcallProvider._multicallAddress =
        "0x34b415f4d3b332515e66f70595ace1dcf36254c5";

      const multicallContract = new MulticallContract(nftAddress, nftABI);
      return [ethcallProvider, multicallContract];
    };

    const [multicallProvider, multicallContract] = await setupMultiCallContract(
      harmoleculesContractAddress,
      harmoleculesContractABI
    );

    const [multicallProvider2, multicallContract2] =
      await setupMultiCallContract(
        rarityStakingContractAddress,
        rarityStakingContractABI
      );

    const providerRarity = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const _signer = providerRarity.getSigner();

    const contract = new ethers.Contract(
      rarityStakingContractAddress,
      rarityStakingContractABI,
      _signer
    );

    try {
      const balance = await rarityContract?.balanceOf(address);
      let tokenCalls = [];
      for (let i = 0; i < balance; i++) {
        tokenCalls.push(multicallContract.tokenOfOwnerByIndex(address, i));
      }

      const userTokens = (await multicallProvider?.all(tokenCalls)).map((e) =>
        e.toString()
      );

      const promises = userTokens.map(async (element) => {
        try {
          const uri = await rarityContract.tokenURI(element);
          const response = await fetch(uri || defaultUri);
          if (!response.ok) throw new Error(response.statusText);
          const json = await response.json();
          return {
            id: element,
            name: uri ? json.name : `#${element}`,
            key: json.dna,
            url: json.image,
          };
          // return {
          //   id: element,
          //   name: element,
          //   key: element,
          //   url: '/buy-button.png'
          // }
        } catch (err) {
          console.log(err);
        }
      });
      const itemsArr = await Promise.all(promises);

      dispatch({
        type: "SET_CURRENT_ITEMS_RARITY",
        currentItemsRarity: itemsArr,
      });
    } catch (e) {
      console.log(e);
    }

    try {
      const stakedOnes = await contract.getUserStaked(address);
      const stakedIds = stakedOnes.map((e) => Number(e));

      const stakedPromises = stakedIds.map(async (element) => {
        const uri = await rarityContract.tokenURI(element);
        const response = await fetch(uri || defaultUri);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        return {
          id: element,
          name: uri ? json.name : `#${element}`,
          key: json.dna,
          url: json.image,
        };
      });
      const result = await Promise.all(stakedPromises);

      dispatch({
        type: "SET_STAKED_ITEMS_RARITY",
        stakedItemsRarity: result,
      });

      const infoPromises = result.map((el) => {
        return multicallContract2.stakedInfo(el.id);
      });
      const rewardsPromises = result.map((el) => {
        return multicallContract2.getRewards(el.id);
      });

      const infoTokens = await multicallProvider2.all(infoPromises);

      const rewardsTokens = await multicallProvider2.all(rewardsPromises);

      const rewardingResult = result.map((el, i) => {
        el.stakedInfo = infoTokens[i];
        el.rewards = rewardsTokens[i];
        return el;
      });

      let _totalRewardsRarity = 0;
      const _rewardItemsRarity = rewardingResult.map((el) => {
        _totalRewardsRarity += parseFloat(ethers.utils.formatEther(el.rewards));
        const rollTime =
          ethers.utils.formatUnits(el.stakedInfo.lastRoll, 0) * 1000;
        const info = {
          id: el.id,
          name: el.name,
          key: el.key,
          url: el.url,
          rollWhen: rollTime,
          rewards: ethers.utils.formatEther(el.rewards),
        };
        return info;
      });

      dispatch({
        type: "SET_REWARD_ITEMS_RARITY",
        rewardItemsRarity: _rewardItemsRarity,
      });

      dispatch({
        type: "SET_TOTAL_REWARDS_RARITY",
        totalRewardsRarity: _totalRewardsRarity,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getLockedStakingData = async () => {
    //Token contract setup
    const providerLocked = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const _signer = providerLocked.getSigner();

    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, _signer);

    //Multicall contract setup
    const setupMultiCallContract = async (nftAddress, nftABI) => {
      const provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "any"
      );
      const ethcallProvider = new MulticallProvider(provider);

      await ethcallProvider.init();
      ethcallProvider._multicallAddress =
        "0x34b415f4d3b332515e66f70595ace1dcf36254c5";

      const multicallContract = new MulticallContract(nftAddress, nftABI);
      return [ethcallProvider, multicallContract];
    };

    const [multicallProvider, multicallContract] = await setupMultiCallContract(
      lockContractAddress,
      lockAbi
    );

    //Get Balance
    try {
      const result = await tokenContract?.balanceOf(address);
      dispatch({
        type: "SET_LOCK_STAKED_AMOUNT",
        lockStakedAmount: ethers.utils.formatEther(result),
      });
    } catch (error) {
      console.log(error);
    }

    //Get Stake Data
    try {
      //ongoing data

      const stakedIds = (
        await lockedStakingContract?.getStakedIds(address)
      ).map((el) => ethers.utils.formatUnits(el, 0));
      const stakeTokens = [];

      stakedIds.forEach((el) => {
        stakeTokens.push(multicallContract?.userStaked(address, el));
      });

      const _stakeData = await multicallProvider?.all(stakeTokens);
      let totalAmount = 0;

      const stakeData = _stakeData.map((el, index) => {
        totalAmount += parseFloat(ethers.utils.formatEther(el.amount));
        return {
          id: stakedIds[index],
          amount: ethers.utils.formatEther(el.amount),
          durationCode: ethers.utils.formatUnits(el.durationCode, 0),
          stakeTime: parseInt(ethers.utils.formatUnits(el.stakeTime, 0) * 1000),
        };
      });

      const _completedItemsLocked = [];
      const _ongoingItemsLocked = [];

      stakeData.forEach((el) => {
        const months = decodeDuration(el.durationCode);
        if (el.stakeTime + months * 30 * 24 * 60 * 60 * 1000 > Date.now())
          _ongoingItemsLocked.push(el);
        else _completedItemsLocked.push(el);
      });

      dispatch({
        type: "SET_ONGOING_ITEMS_LOCKED",
        ongoingItemsLocked: _ongoingItemsLocked,
      });

      dispatch({
        type: "SET_COMPLETED_ITEMS_LOCKED",
        completedItemsLocked: _completedItemsLocked,
      });

      dispatch({
        type: "SET_TOTAL_AMOUNT_LOCKED",
        totalAmountLocked: totalAmount,
      });

      //rewards

      const rewardsTokens = [];
      const totalRewards = 0;

      stakedIds.forEach((el) => {
        rewardsTokens.push(multicallContract?.getReward(address, el));
      });

      const _rewardsData = (await multicallProvider?.all(rewardsTokens)).map(
        (el) => ethers.utils.formatEther(el)
      );

      _rewardsData.forEach((el) => (totalRewards += parseFloat(el)));

      dispatch({
        type: "SET_TOTAL_REWARDS_LOCKED",
        totalRewardsLocked: totalRewards,
      });

      dispatch({
        type: "SET_LOCK_STAKED_REWARDS",
        lockStakedRewards: _rewardsData,
      });
    } catch (error) {
      console.log(error);
    }

    //Get total gravs staked
    try {
      const totalGravs = await tokenContract?.balanceOf(lockContractAddress);
      dispatch({
        type: "SET_TOTAL_GRAVS_STAKED",
        totalGravsStaked: ethers.utils.formatEther(totalGravs),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaxLocked = () => {
    dispatch({
      type: "SET_MONTH_STAKE_AMOUNT",
      monthStakingInputAmount: lockStakedAmount,
    });
  };

  const decodeDuration = (durationCode) => {
    switch (durationCode) {
      case "0":
        return 3;
      case "1":
        return 6;
      case "2":
        return 12;
      default:
        return 0;
    }
  };

  const getBalance = async () => {
    const stakedAmount = await singleContract.methods
      .balances(address)
      .call({ from: address });
    const temp = stakedAmount / Math.pow(10, 18);
    const rewarded = await singleContract.methods
      .earned(address)
      .call({ from: address });
    const tempPending = rewarded / Math.pow(10, 18);

    dispatch({
      type: "SET_STAKED_PENDING",
      stakedAmount: temp.toFixed(5),
      pendingReward: tempPending.toFixed(5),
    });
  };

  const getAPR = async () => {
    try {
      const rewardRate = await singleContract.methods
        .rewardRate()
        .call({ from: address });
      const parsedRewardRate = parseInt(rewardRate);

      const totalReward = parsedRewardRate * 60 * 60 * 24 * 365; // Reward in an year

      let url = "https://api.harmony.one";
      const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
      const totalTokensStaked = await customHttpProvider.getStorageAt(
        "0x84653568E292677F2bE042E8E109DCbacb44aa5d",
        "0x0000000000000000000000000000000000000000000000000000000000000007"
      );
      const parsedTokens = parseInt(totalTokensStaked);
      const apr = (totalReward / parsedTokens) * 100;
      setAPR(apr.toFixed(2));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    address && getAPR();
  }, [singleContract]);

  const getLockStakingBalance = async () => {
    const total = await lockContract.methods
      .getUserStakedAmount(address)
      .call({ from: address });
    const temp = total / Math.pow(10, 18);

    await lockContract.methods
      .updatecurrentStakingTime()
      .call({ from: address });
    const reward = await lockContract.methods
      .getCurrentRewards()
      .call({ from: address });
    const tempPending = reward / Math.pow(10, 18);

    dispatch({
      type: "SET_LOCK_STAKED_PENDING",
      lockStakedAmount: temp.toFixed(3),
      lockPendingReward: tempPending.toFixed(3),
    });
  };

  const collectRewards = () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    toast.info("Please Wait Till The Transaction Succeeds");

    singleContract.methods
      .getReward()
      .send({ from: address })
      .on("receipt", (receipt) => {
        toast.success("Claiming rewards successful");
        getBalance();
      })
      .on("error", (error, reciept) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleSingleAmountChange = (event) => {
    dispatch({
      type: "SET_SINGLE_AMOUNT",
      singleInputAmount: event.target.value,
    });
  };

  const singleUnstake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (singleInputAmount < 1 || !singleInputAmount) {
      toast.error("Enter An Amount Greater Than 1 ONEverse token");
      return;
    }

    const amount = Web3.utils.toBN(
      String(Math.floor(singleInputAmount)) + "0".repeat(18)
    );

    toast.info("Please Wait Till The Transaction Succeeds");

    singleContract.methods
      .withdraw(amount)
      .send({ from: address })
      .on("receipt", (receipt) => {
        toast.success("Wormhole Withdrawal Success");
        getBalance();
      })
      .on("error", (error, reciept) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const singleStake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (singleInputAmount < 1 || !singleInputAmount) {
      toast.error("Enter An Amount Greater Than 1 ONEverse token");
      return;
    }

    const amount = Web3.utils.toBN(
      String(Math.floor(singleInputAmount)) + "0".repeat(18)
    );
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);

    toast.info("Approve Transaction To Allow ONEverse token spending");

    tokenContract.methods
      .approve(singleContractAddress, amount)
      .send({ from: address })
      .on("receipt", (receipt) => {
        toast.info("Please wait...");
        singleContract.methods
          .stake(amount)
          .send({ from: address })
          .on("receipt", (receipt) => {
            toast.success(
              "Your tokens have been sent into the Wormhole! - Amount: " +
                singleInputAmount
            );
            getBalance();
          })
          .on("error", (error, receipt) => {
            toast.error(error.message);
            console.log(error, receipt);
          });
      })
      .on("error", (error, receipt) => {
        toast.error(error.message);
        console.log(error, receipt);
      });
  };

  // useEffect(() => {
  //   if (rarityContract) {
  //     console.log(rarityContract);
  //     rarityContract.on("RaffleWin", (user, tokenId, win) => {
  //       console.log(user);
  //       console.log(tokenId);
  //       console.log(win);
  //     });
  //   }
  // }, [rarityContract]);

  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItems1, setCheckedItems1] = useState({});
  const [checkedItems2, setCheckedItems2] = useState({});
  const [checkedItems3, setCheckedItems3] = useState({});
  const [checkedItems4, setCheckedItems4] = useState({});
  const [checkedItems5, setCheckedItems5] = useState({});
  const [checkedItems6, setCheckedItems6] = useState({});
  const [checkedItems7, setCheckedItems7] = useState({});

  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedAll1, setSelectedAll1] = useState(false);
  const [selectedAll2, setSelectedAll2] = useState(false);
  const [selectedAll3, setSelectedAll3] = useState(false);
  const [selectedAll4, setSelectedAll4] = useState(false);
  const [selectedAll5, setSelectedAll5] = useState(false);
  const [selectedAll6, setSelectedAll6] = useState(false);
  const [selectedAll7, setSelectedAll7] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const [raffleModalOpen, setRaffleModalOpen] = useState(false);
  const [raffleResult, setRaffleResult] = useState([]);
  const [raffleWon, setRaffleWon] = useState(0);

  const checkNFTHandle = (name, checked, tab) => {
    if (tab == "unstaked") {
      !checked && setSelectedAll(false);
      setCheckedItems({ ...checkedItems, [name]: checked });
    } else if (tab == "staked") {
      !checked && setSelectedAll1(false);
      setCheckedItems1({ ...checkedItems1, [name]: checked });
    } else if (tab == "rewarded") {
      !checked && setSelectedAll2(false);
      setCheckedItems2({ ...checkedItems2, [name]: checked });
    } else if (tab == "unstaked_rarity") {
      !checked && setSelectedAll3(false);
      setCheckedItems3({ ...checkedItems3, [name]: checked });
    } else if (tab == "staked_rarity") {
      !checked && setSelectedAll4(false);
      setCheckedItems4({ ...checkedItems4, [name]: checked });
    } else if (tab == "rewarded_rarity") {
      !checked && setSelectedAll5(false);
      setCheckedItems5({ ...checkedItems5, [name]: checked });
    } else if (tab == "ongoing_locked") {
      !checked && setSelectedAll6(false);
      setCheckedItems6({ ...checkedItems6, [name]: checked });
    } else if (tab == "completed_locked") {
      !checked && setSelectedAll7(false);
      setCheckedItems7({ ...checkedItems7, [name]: checked });
    }
  };

  useEffect(() => {
    const defaultSelect =
      currentItems &&
      currentItems.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems(defaultSelect);
  }, [currentItems]);

  useEffect(() => {
    const defaultSelect =
      stakedItems &&
      stakedItems.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems1(defaultSelect);
  }, [stakedItems]);

  useEffect(() => {
    const defaultSelect =
      currentItemsRarity &&
      currentItemsRarity.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems2(defaultSelect);
  }, [currentItemsRarity]);

  useEffect(() => {
    const defaultSelect =
      stakedItemsRarity &&
      stakedItemsRarity.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems3(defaultSelect);
  }, [stakedItemsRarity]);

  const selectAllNFT = () => {
    const selected = currentItems.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems(selected);
    setSelectedAll(true);
  };

  const selectAllNFT1 = () => {
    const selected = stakedItems.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems1(selected);
    setSelectedAll1(true);
  };

  const selectAllNFT2 = () => {
    const selected = rewardItems.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems2(selected);
    setSelectedAll2(true);
  };

  const selectAllNFT3 = () => {
    const selected = currentItemsRarity.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems3(selected);
    setSelectedAll3(true);
  };

  const selectAllNFT4 = () => {
    const selected = stakedItemsRarity.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems4(selected);
    setSelectedAll4(true);
  };

  const selectAllNFT5 = () => {
    const selected = rewardItemsRarity.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems5(selected);
    setSelectedAll5(true);
  };

  const selectAllNFT6 = () => {
    const selected = ongoingItemsLocked.reduce(function (result, item) {
      result[item["id"]] = true;
      return result;
    }, {});
    setCheckedItems6(selected);
    setSelectedAll6(true);
  };

  const selectAllNFT7 = () => {
    const selected = completedItemsLocked.reduce(function (result, item) {
      result[item["name"]] = true;
      return result;
    }, {});
    setCheckedItems7(selected);
    setSelectedAll7(true);
  };

  const deselectAllNFT = () => {
    const defaultSelect =
      currentItems &&
      currentItems.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems(defaultSelect);
    setSelectedAll(false);
  };

  const deselectAllNFT1 = () => {
    const defaultSelect =
      stakedItems &&
      stakedItems.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems1(defaultSelect);
    setSelectedAll1(false);
  };

  const deselectAllNFT2 = () => {
    const defaultSelect =
      rewardItems &&
      rewardItems.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems2(defaultSelect);
    setSelectedAll2(false);
  };

  const deselectAllNFT3 = () => {
    const defaultSelect =
      currentItemsRarity &&
      currentItemsRarity.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems3(defaultSelect);
    setSelectedAll3(false);
  };

  const deselectAllNFT4 = () => {
    const defaultSelect =
      stakedItemsRarity &&
      stakedItemsRarity.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems4(defaultSelect);
    setSelectedAll4(false);
  };

  const deselectAllNFT5 = () => {
    const defaultSelect =
      rewardItemsRarity &&
      rewardItemsRarity.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems5(defaultSelect);
    setSelectedAll5(false);
  };

  const deselectAllNFT6 = () => {
    const defaultSelect =
      ongoingItemsLocked &&
      ongoingItemsLocked.reduce(function (result, item) {
        result[item["id"]] = false;
        return result;
      }, {});
    setCheckedItems6(defaultSelect);
    setSelectedAll6(false);
  };

  const deselectAllNFT7 = () => {
    const defaultSelect =
      completedItemsLocked &&
      completedItemsLocked.reduce(function (result, item) {
        result[item["name"]] = false;
        return result;
      }, {});
    setCheckedItems7(defaultSelect);
    setSelectedAll7(false);
  };

  const nftStake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    const notEmpty = Object.values(checkedItems).some((val) => val === true);

    if (!notEmpty) {
      toast.error("Please select at least one nft to stake");
      return;
    }

    function isSelected(elem) {
      return checkedItems[elem.name];
    }

    let filtered = currentItems.filter(isSelected).map((a) => a.id);

    const ethers = require("ethers");
    const provider1 = new ethers.providers.Web3Provider(web3.currentProvider);
    const _signer = provider1.getSigner();

    const contract = new ethers.Contract(nftAddress, nftABI, _signer);

    try {
      const checkApproval = await contract.isApprovedForAll(
        address,
        nftContractAddress
      );
      if (!checkApproval) {
        const setApproval = await contract.setApprovalForAll(
          nftContractAddress,
          true
        );
        await setApproval.wait();
      }
      const transaction = await nftContract.stakeNFT(filtered);
      const finishTxn = await transaction.wait();
      toast.success(`${filtered.length} Nfts successfully staked.`);
      getNFTBalance();
      deselectAllNFT();
    } catch (e) {
      console.log(e);
    }
  };

  const nftUnstake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    const notEmpty = Object.values(checkedItems1).some((val) => val === true);

    if (!notEmpty) {
      toast.error("Please select at least one nft to unstake");
      return;
    }

    function isSelected(elem) {
      return checkedItems1[elem.name];
    }

    let filtered = stakedItems.filter(isSelected).map((a) => a.id);

    try {
      const webRequest = await axios.get(
        "https://oneverse-backend.onrender.com/price"
      );
      const { signature, address, types, voucher, finalPrice } =
        webRequest.data;

      const ethers = require("ethers");

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${(1666600000).toString(16)}` }],
      });
      const _provider1 = new ethers.providers.Web3Provider(
        web3.currentProvider
      );
      const _signer = await _provider1.getSigner();
      let add = await _signer.getAddress();
      let _nftContract = new web3.eth.Contract(
        nftContractABI,
        nftContractAddress
      );
      const transaction = await _nftContract.methods
        ?.unstakeTokens(
          filtered.map((e) => e.toString()),
          [voucher.price, voucher.time, signature]
        )
        .send({ from: add, gas: 8000000 });

      toast.success(`${filtered.length} NFts were successfully unstaked.`);
      getNFTBalance();
      deselectAllNFT1();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const nftClaim = async () => {
    const notEmpty = Object.values(checkedItems2).some((val) => val === true);

    if (!notEmpty) {
      toast.error("Please select at least one nft to claim");
      return;
    }

    try {
      let ids = [];
      rewardItems.forEach((elem) => {
        if (checkedItems2[elem.name]) ids.push(elem.id);
      });

      const webRequest = await axios.get(
        "https://oneverse-backend.onrender.com/price"
      );
      const { signature, address, types, voucher, finalPrice } =
        webRequest.data;

      const ethers = require("ethers");

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${(1666600000).toString(16)}` }],
      });
      const _provider1 = new ethers.providers.Web3Provider(
        web3.currentProvider
      );
      const _signer = await _provider1.getSigner();
      let add = await _signer.getAddress();
      let _nftContract = new web3.eth.Contract(
        nftContractABI,
        nftContractAddress
      );
      const transaction = await _nftContract.methods
        ?.claimRewards(
          ids.map((e) => e.toString()),
          [voucher.price, voucher.time, signature]
        )
        .send({ from: add, gas: 3000000 });

      toast.success(`${ids.length} NFts were successfully claimed.`);
      getNFTBalance();
      deselectAllNFT2();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const rarityStake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    const notEmpty = Object.values(checkedItems3).some((val) => val === true);

    if (!notEmpty) {
      toast.error("Please select at least one nft to stake");
      return;
    }

    function isSelected(elem) {
      return checkedItems3[elem.name];
    }

    let filtered = currentItemsRarity.filter(isSelected).map((a) => a.id);

    const providerRarity = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const _signer = providerRarity.getSigner();

    const contract = new ethers.Contract(
      rarityStakingContractAddress,
      rarityStakingContractABI,
      _signer
    );

    const nftContract = new ethers.Contract(
      harmoleculesContractAddress,
      harmoleculesContractABI,
      _signer
    );

    const setupMultiCallContract = async (nftAddress, nftABI) => {
      const provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "any"
      );
      const ethcallProvider = new MulticallProvider(provider);

      await ethcallProvider.init();
      ethcallProvider._multicallAddress =
        "0x34b415f4d3b332515e66f70595ace1dcf36254c5";

      const multicallContract = new MulticallContract(nftAddress, nftABI);
      return [ethcallProvider, multicallContract];
    };

    const [multicallProvider, multicallContract] = await setupMultiCallContract(
      rarityStakingContractAddress,
      rarityStakingContractABI
    );

    try {
      const baseURL =
        "https://oneverse-discord-bot.herokuapp.com/tokenSignature/";

      const rarityPromises = filtered.map((id) =>
        multicallContract.tokenRarity(id)
      );
      const rarityArray = (await multicallProvider.all(rarityPromises)).map(
        (el) => ethers.utils.formatUnits(el, 0)
      );
      const uninitialisedArray = [];
      rarityArray.forEach(
        (rarity, index) =>
          parseInt(rarity) === 0 && uninitialisedArray.push(filtered[index])
      );

      if (uninitialisedArray.length) {
        const dataPromises = [];
        uninitialisedArray.forEach((id) =>
          dataPromises.push(axios.get(baseURL + id))
        );

        const dataArray = await Promise.all(dataPromises);

        const toInitialise = uninitialisedArray.map((id, i) => {
          return [id, dataArray[i].data.rarity, dataArray[i].data.signature];
        });

        const toInitialiseFiltered = toInitialise.filter(
          (el) => el !== undefined
        );

        toast.info(
          `Initializing Rarity for ${toInitialiseFiltered.length} NFTs`
        );
        const initializeRarity = await contract.initializeRarity(
          toInitialiseFiltered
        );
        await initializeRarity.wait();
        toast.success(`Initialized ${toInitialiseFiltered.length} Nfts.`);
      }

      const isApprovedForAll = await nftContract.isApprovedForAll(
        address,
        rarityStakingContractAddress
      );
      if (!isApprovedForAll) {
        const setApproval = await nftContract.setApprovalForAll(
          rarityStakingContractAddress,
          true
        );
        await setApproval.wait();
      }
      const callLimit = 100;
      const numberOfCalls = Math.ceil(filtered.length / callLimit);
      for (let index = 0; index < numberOfCalls; index++) {
        const range = filtered.slice(
          index * callLimit,
          Math.min((index + 1) * callLimit, filtered.length)
        );
        toast.info(
          `Staking ${range.length} NFTs (${index + 1}/${numberOfCalls})`
        );
        const stakeTokens = await contract?.stakeTokens(range);
        await stakeTokens.wait();
        toast.success(`${range.length} Nfts successfully staked.`);
      }

      getHarmoleculesNFT();
      deselectAllNFT3();
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

  const rarityUnstake = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    const notEmpty = Object.values(checkedItems4).some((val) => val === true);

    if (!notEmpty) {
      toast.error("Please select at least one nft to unstake");
      return;
    }

    function isSelected(elem) {
      return checkedItems4[elem.name];
    }

    let filtered = stakedItemsRarity.filter(isSelected).map((a) => a.id);

    const providerRarity = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const _signer = providerRarity.getSigner();

    const contract = new ethers.Contract(
      rarityStakingContractAddress,
      rarityStakingContractABI,
      _signer
    );

    try {
      toast.info(`Unstaking ${filtered.length} Nfts.`);
      const unstake = await contract?.unstakeTokens(filtered);
      await unstake.wait();
      toast.success(`${filtered.length} Nfts successfully unstaked.`);
      getHarmoleculesNFT();
      deselectAllNFT4();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const rarityClaim = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    const notEmpty = Object.values(checkedItems5).some((val) => val === true);

    if (!notEmpty) {
      toast.error("Please select at least one nft to stake");
      return;
    }

    function isSelected(elem) {
      return checkedItems5[elem.name];
    }

    let filtered = rewardItemsRarity.filter(isSelected).map((a) => a.id);

    const ethers = require("ethers");
    const providerRarity = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const _signer = providerRarity.getSigner();

    const contract = new ethers.Contract(
      rarityStakingContractAddress,
      rarityStakingContractABI,
      _signer
    );

    try {
      toast.info("Claiming Rewards!");
      const claimRewards = await contract.claimRewards(filtered);
      const transaction = await claimRewards.wait();
      toast.success(`${filtered.length} rewards claimed!`);
      toast.info("Updating rewards");
      getHarmoleculesNFT();
    } catch (e) {
      console.log(e);
    }
  };

  const raffleRoll = async (id) => {
    try {
      const providerRarity = new ethers.providers.Web3Provider(
        web3.currentProvider
      );
      const _signer = providerRarity.getSigner();

      const contract = new ethers.Contract(
        rarityStakingContractAddress,
        rarityStakingContractABI,
        _signer
      );

      const transaction = await contract?.raffleRoll([id]);
      toast.info("Initializing Raffle Roll");
      const result = await transaction.wait();
      const _raffleResult = [];
      let _raffleWon = 0;
      result.events.forEach((event) => {
        if (event.args) {
          if (event.args[2]) _raffleWon++;
          _raffleResult.push({
            id: ethers.utils.formatUnits(event.args[1], 0),
            result: event.args[2],
          });
        }
      });
      setRaffleResult(_raffleResult);
      setRaffleWon(_raffleWon);
      setRaffleModalOpen(true);
    } catch (error) {
      toast.error(error.data?.message);
      console.log(error);
    }
  };

  const raffleRollSelected = async () => {
    try {
      const getIdFromName = (name) => parseInt(name.slice(1));
      const keys = Object.keys(checkedItems5);
      const _id = keys
        .filter((el) => checkedItems5[el])
        .map((el) => getIdFromName(el));

      if (_id.length) {
        const providerRarity = new ethers.providers.Web3Provider(
          web3.currentProvider
        );
        const _signer = providerRarity.getSigner();

        const contract = new ethers.Contract(
          rarityStakingContractAddress,
          rarityStakingContractABI,
          _signer
        );
        const transaction = await contract?.raffleRoll(_id);
        toast.info("Initializing Raffle Roll");
        const result = await transaction.wait();
        const _raffleResult = [];
        let _raffleWon = 0;
        result.events.forEach((event) => {
          if (event.args) {
            if (event.args[2]) _raffleWon++;
            _raffleResult.push({
              id: ethers.utils.formatUnits(event.args[1], 0),
              result: event.args[2],
            });
          }
        });

        setRaffleResult(_raffleResult);
        setRaffleWon(_raffleWon);
        setRaffleModalOpen(true);
      } else toast.info("Please select a valid item", { theme: "dark" });
    } catch (error) {
      toast.error(error.data?.message);
      console.log(error);
    }
  };

  const lockedStake = async (durationCode) => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    const amount = ethers.utils.parseEther(monthStakingInputAmount);

    const providerLocked = new ethers.providers.Web3Provider(
      web3.currentProvider
    );
    const _signer = providerLocked.getSigner();

    const lockedStakingContract = new ethers.Contract(
      lockContractAddress,
      lockAbi,
      _signer
    );

    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, _signer);

    try {
      const increaseBal = await tokenContract.increaseAllowance(
        lockContractAddress,
        amount
      );
      await increaseBal.wait();

      toast.success(`Staking ${monthStakingInputAmount} GRAVs...`);

      const result = await lockedStakingContract.stake(
        [amount],
        [durationCode]
      );
      await result.wait();
      await getLockedStakingData();
      toast.success(`Successfully staked ${monthStakingInputAmount} GRAVs!`);
    } catch (e) {
      toast.error(e.data.message);
      console.log(e);
    }
  };

  const lockedClaim = async () => {
    const keys = Object.keys(checkedItems6);
    const _id = keys.filter((el) => checkedItems6[el]);

    if (_id.length) {
      const transaction = await lockedStakingContract?.claimReward(_id);
      const result = await transaction.wait();
      await getLockedStakingData();
      toast.success(`Claimed ${_id.length} Rewards!`);
      deselectAllNFT6();
      deselectAllNFT7();
    }
  };

  const lockedUnstake = async () => {
    const keys = Object.keys(checkedItems7);
    const _id = keys.filter((el) => checkedItems7[el]);

    console.log(_id);

    // if (_id.length) {
    //   const transaction = await lockedStakingContract?.unstake(_id);
    //   const result = await transaction.wait();
    //   console.log(result);
    //   await getLockedStakingData();
    //   toast.success(`Force Unstaked ${_id.length} Stakes!`);
    //   deselectAllNFT7();
    // }
  };

  const lockedUnstakeForced = async () => {
    const keys = Object.keys(checkedItems6);
    const _id = keys.filter((el) => checkedItems6[el]);

    console.log(_id);

    if (_id.length) {
      const transaction = await lockedStakingContract?.forceUnstake(_id);
      const result = await transaction.wait();
      console.log(result);
      await getLockedStakingData();
      toast.success(`Force Unstaked ${_id.length} Stakes!`);
      deselectAllNFT6();
    }
  };

  const countDownRenderer = ({ days, hours, minutes }) => (
    <span>
      {zeroPad(days)} Days {zeroPad(hours)} Hours {zeroPad(minutes)} Mins
    </span>
  );

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
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const [tabVal, setTabVal] = useState(0);
  const [tabValRarity, setTabValRarity] = useState(0);
  const [tabValLocked, setTabValLocked] = useState(0);

  const tabHandleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const tabHandleChangeRarity = (event, newValue) => {
    setTabValRarity(newValue);
  };

  const tabHandleChangeLocked = (event, newValue) => {
    setTabValLocked(newValue);
  };

  const [activePenalty, setActivePenalty] = useState(true);

  const handleTogglePenaty = () => {
    setActivePenalty(!activePenalty);
  };

  const [openUnlocksModal, setOpenUnlocksModal] = useState(false);

  const unlocksModalShow = () => {
    setOpenUnlocksModal(true);
  };

  const handleModalClose = () => {
    setOpenUnlocksModal(false);
  };

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
        top: "10px",
      },
    },
    disableScrollLock: true,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const [selectedStakedItems, setSelectedStakedItems] = useState([]);
  const handleChangeItem = (event) => {
    setSelectedStakedItems(event.target.value);
  };

  const formatAddress = (str) => {
    return str ? str.slice(0, 5) + "..." + str.slice(str.length - 5) : "";
  };

  return (
    <Layout
      // type your page title and page description.
      title="ONEVERSE"
      description="A multiplayer P2E experience on Harmony Network"
      onConnect={connectWallet}
      address={address}
    >
      <Container
        // disableGutters={matches}
        className="background-container"
        style={{ overflowX: matches ? "hidden" : "unset" }}
      >
        <Grid container spacing={5}>
          {!matches && (
            <Grid item md={2}>
              <Box className={classes.leftSide}>
                <Link
                  href="#"
                  smooth={true}
                  className={classes.leftMenu}
                  style={{ textDecoration: "none" }}
                  to="flexible"
                  duration={2000}
                  spy={true}
                >
                  <Typography variant="h2">FLEXIBLE STAKING</Typography>
                </Link>
                <Link
                  href="#"
                  smooth={true}
                  className={classes.leftMenu}
                  style={{ textDecoration: "none" }}
                  to="nft"
                  duration={2000}
                  spy={true}
                >
                  <Typography variant="h2">PUFF STAKING</Typography>
                </Link>

                <Link
                  href="#"
                  smooth={true}
                  className={classes.leftMenu}
                  style={{ textDecoration: "none" }}
                  to="rarity"
                  duration={2000}
                  spy={true}
                >
                  <Typography variant="h2">RARITY STAKING</Typography>
                </Link>
                <Link
                  href="#"
                  smooth={true}
                  className={classes.leftMenu}
                  style={{ textDecoration: "none" }}
                  to="time"
                  duration={2000}
                  spy={true}
                >
                  <Typography variant="h2">TIME LOCKED STAKING</Typography>
                </Link>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  <Links target="_blank" href="https://twitter.com/ONEverseONE">
                    <img width="20px" height="18px" src="/twitter.png"></img>
                  </Links>
                  <Links target="_blank" href="https://discord.gg/ONEverse">
                    <img width="20px" height="20px" src="/discord.png"></img>
                  </Links>
                  <Links target="_blank" href="https://ovexclusive.com/">
                    <img
                      width="20px"
                      height="20px"
                      style={{ marginRight: 0 }}
                      src="/medium.png"
                    ></img>
                  </Links>
                  <Links
                    target="_blank"
                    href="https://t.me/ONEverseONEofficial"
                  >
                    <img width="20px" height="20px" src="/telegram.png"></img>
                  </Links>
                  <Links
                    target="_blank"
                    href="https://www.reddit.com/r/ONEverse/"
                  >
                    <img width="20px" height="20px" src="/reddit.png"></img>
                  </Links>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Main Content */}
          <Grid item md={10} xs={12}>
            {matches && (
              <Box padding="50px 16px 40px 16px">
                {address ? (
                  <Button
                    variant="outlined"
                    size="medium"
                    className={classes.connectBtn}
                  >
                    <Typography variant="h2">
                      {formatAddress(address)}
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    onClick={connectWallet}
                    variant="outlined"
                    size="medium"
                    className={classes.connectBtn}
                  >
                    <Typography variant="h2">CONNECT</Typography>
                  </Button>
                )}
              </Box>
            )}
            {/* <Box
              id="swap"
              className={classes.swapBlock}
              style={{
                pointerEvents: "none",
                position: "relative",
                overflowX: "hidden",
              }}
            >
              <Typography
                variant="h2"
                className={clsx(classes.blockTitle, classes.mobileLocked)}
              >
                INCOMING - LOCKED xGRAV
              </Typography>
              {!matches ? (
                <Box
                  display="flex"
                  position="absolute"
                  className={classes.lockedRightTop}
                >
                  <Typography className={classes.topLabelInfo}>
                    1 GRAV = 1 xGRAV
                  </Typography>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" mt="50px">
                  <Box
                    style={{
                      padding: "14px 33px",
                      border: "1px solid #E9D758",
                      width: "fit-content",
                    }}
                  >
                    <Typography className={classes.topLabelInfo}>
                      1 GRAV = 1 xGRAV
                    </Typography>
                  </Box>
                </Box>
              )}
              <Box mt="65px" mb="40px" display={matches ? "block" : "flex"}>
                <Box className={classes.iconBlock}>
                  <img src="token-icon1.png"></img>
                </Box>
                <Box flexGrow={1}>
                  <Box mb="16px" className={classes.whiteWrap}>
                    <Box mb="10px" display="flex">
                      <Typography className={classes.antiGrav}>
                        ANTI-GRAV // $xGRAV
                      </Typography>
                      <Box className={classes.whiteBg}></Box>
                    </Box>
                    <Box
                      display={matches ? "block" : "flex"}
                      justifyContent="space-between"
                    >
                      <Typography
                        className={clsx(
                          classes.antiGravDesc,
                          classes.lockXgrav
                        )}
                      >
                        Lock xGRAV for 4 MONTHS to receive 1:1 GRAV rewards
                      </Typography>
                      <Typography
                        onClick={() => unlocksModalShow()}
                        style={{ fontSize: "15px" }}
                        className={classes.unlockModalLink}
                      >
                        UPCOMING UNLOCKS
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.whiteWrap}>
                    <Box mb="10px" display="flex">
                      <Typography className={classes.antiGrav}>
                        xGRAV UTILITY
                      </Typography>
                      <Box className={classes.whiteBg}></Box>
                    </Box>
                    <Grid container>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon
                            className={classes.forwardIcon}
                          ></ArrowForwardIosIcon>
                          <Box>
                            <Typography className={classes.antiGravDesc}>
                              Upgrade Your Space Pod
                            </Typography>
                            <Typography
                              className={classes.antiGravDescBottom}
                            ></Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon
                            className={classes.forwardIcon}
                          ></ArrowForwardIosIcon>
                          <Box className={classes.itemMargin}>
                            <Typography className={classes.antiGravDesc}>
                              Power the Harmonex
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon
                            className={classes.forwardIcon}
                          ></ArrowForwardIosIcon>
                          <Box className={classes.itemMargin}>
                            <Typography className={classes.antiGravDesc}>
                              PvP Games
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box display="flex" alignItems="start">
                          <ArrowForwardIosIcon
                            className={classes.forwardIcon}
                          ></ArrowForwardIosIcon>
                          <Box className={classes.itemMargin}>
                            <Typography className={classes.antiGravDesc}>
                              Buy Collectibles
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={3} className={classes.swapInputBlock}>
                <Grid item md={4} xs={10}>
                  <FormControl
                    className={classes.stakedInput}
                    variant="outlined"
                  >
                    <InputLabel
                      style={{ transition: "none" }}
                      shrink={true}
                      htmlFor="staked-html"
                    >
                      STAKED
                    </InputLabel>
                    <OutlinedInput
                      id="staked-html"
                      type="text"
                      endAdornment={
                        <InputAdornment
                          className={classes.unitLabel}
                          position="end"
                        >
                          xGRAV
                        </InputAdornment>
                      }
                      notched
                      value={lockXgravStakedAmount}
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={10}>
                  <FormControl
                    className={classes.stakedInput}
                    variant="outlined"
                  >
                    <InputLabel
                      style={{ transition: "none" }}
                      shrink={true}
                      htmlFor="staked-html"
                    >
                      REWARDS
                    </InputLabel>
                    <OutlinedInput
                      id="staked-html"
                      type="text"
                      endAdornment={
                        <InputAdornment
                          className={classes.unitLabel}
                          position="end"
                        >
                          GRAV
                        </InputAdornment>
                      }
                      notched
                      value={lockXgravPendingReward}
                      labelWidth={90}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} xs={10}>
                  <Button
                    variant="contained"
                    onClick={() => {}}
                    className={classes.claimBtn}
                  >
                    Claim
                  </Button>
                </Grid>
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography
                    className={classes.stakeAndLockTitle}
                    variant="h1"
                  >
                    LOCKED xGRAV STAKING
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  md={6}
                  xs={12}
                  className={classes.stakeAndLockRight}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    className={classes.stakeAndLockRightTop}
                  >
                    <Grid item md={8}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          placeholder="ENTER AMOUNT TO STAKE"
                          className={classes.stakeAmountInput}
                          value={lockXgravStakingInput}
                          onChange={(event) => {
                            dispatch({
                              type: "SET_XGRAV_LOCK_STAKE_AMOUNT",
                              lockXgravStakingInput: event.target.value,
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="end"
                        height="100%"
                      >
                        <Typography
                          className={clsx(
                            classes.unitLabel1,
                            classes.unitMobile
                          )}
                        >
                          xGRAV
                        </Typography>
                        <Button className={classes.maxBtn}>MAX</Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    className={classes.stakeAndLockRightBottomRight}
                  >
                    <Button
                      onClick={lockXgravStake}
                      className={clsx(classes.stake6btn, classes.activeCta)}
                    >
                      STAKE
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography
                    className={clsx(classes.stakeAndLockTitle, classes.mb0)}
                    variant="h1"
                  >
                    LOCKED xGRAV STAKING
                  </Typography>
                  <Typography className={classes.penalty} variant="h1">
                    WITH 50% PENALTY
                  </Typography>
                  <Switch
                    checked={activePenalty}
                    onClick={() => handleTogglePenaty()}
                    value="active"
                    className={classes.toggleBtn}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  md={6}
                  xs={12}
                  className={classes.stakeAndLockRight}
                >
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
                          });
                          return `${sum} XGARV`;
                        }}
                        MenuProps={MenuProps}
                        className={classes.selectItems}
                      >
                        {lockStakedIds &&
                          lockStakedIds.map((key, index) => (
                            <MenuItem
                              key={index}
                              value={key}
                              style={{
                                background: "#06070E",
                                border: "1px solid #333745",
                                padding: "0",
                                marginBottom: "5px",
                              }}
                            >
                              <Checkbox
                                style={{
                                  color: "#E9D758",
                                  padding: "5px 10px",
                                }}
                                checked={selectedStakedItems.indexOf(key) > -1}
                              />
                              <Grid container>
                                <Grid item md={6}>
                                  <Typography
                                    style={{ paddingLeft: "20px" }}
                                    className={classes.itemText}
                                  >
                                    {lockStakedRewards[key] &&
                                      lockStakedRewards[key].amount}{" "}
                                    xGRAV
                                  </Typography>
                                </Grid>
                                <Grid item md={6}>
                                  <Typography
                                    style={{ paddingLeft: "20px" }}
                                    className={classes.itemText}
                                  >
                                    {lockStakedRewards[key] &&
                                      lockStakedRewards[key].rewards}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    className={classes.stakeAndLockRightBottomRight}
                  >
                    {activePenalty ? (
                      <Button
                        onClick={lockXgravUnstake}
                        className={clsx(classes.stake6btn, classes.activeCta)}
                      >
                        EARLY WITHDRAWAL
                      </Button>
                    ) : (
                      <Button
                        disabled={true}
                        className={clsx(classes.stake6btn, classes.activeCta)}
                      >
                        EARLY WITHDRAWAL
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box> */}
            <Box id="flexible" className={classes.flexibleBlock}>
              <Typography variant="h2" className={classes.blockTitle}>
                FLEX STAKING
              </Typography>
              <Grid container className={classes.flexibleContent}>
                <Grid item md={6} xs={12}>
                  <Box className={classes.leftFlexBlock}>
                    <Typography variant="h1" className={classes.flyInto}>
                      FLY INTO THE WORMHOLE
                    </Typography>
                    <FormControl
                      className={classes.singleStakeInput}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ transition: "none" }}
                        shrink={true}
                        htmlFor="staked-html"
                      >
                        STAKE
                      </InputLabel>
                      <OutlinedInput
                        id="staked-html"
                        type="number"
                        endAdornment={
                          <InputAdornment
                            className={classes.unitLabel}
                            position="end"
                          >
                            GRAV
                          </InputAdornment>
                        }
                        notched
                        labelWidth={60}
                        onChange={handleSingleAmountChange}
                      />
                    </FormControl>
                    <Typography variant="h1" className={classes.darkMatter}>
                      {APR}% APR
                    </Typography>
                    <ButtonGroup
                      color="secondary"
                      aria-label="outlined secondary button group"
                    >
                      <Button
                        onClick={singleStake}
                        className={classes.stakeBtn}
                      >
                        STAKE
                      </Button>
                      <Button
                        onClick={singleUnstake}
                        className={classes.unstakeBtn}
                      >
                        UNSTAKE
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className={classes.rewardBlock}>
                    <Box className={classes.stakedBlock}>
                      <Typography className={classes.rewardLabel}>
                        GRAV STAKED
                      </Typography>
                      <Box
                        textAlign="right"
                        display="flex"
                        justifyContent="end"
                      >
                        <Typography
                          variant="h2"
                          className={classes.stakedAmount}
                        >
                          {stakedAmount}
                        </Typography>
                        <Typography variant="h2" style={{ color: "#000" }}>
                          GRAV
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={classes.rewardedBlock}>
                      <Typography className={classes.rewardLabel}>
                        GRAV REWARDS
                      </Typography>
                      <Box
                        textAlign="right"
                        display="flex"
                        justifyContent="end"
                      >
                        <Typography
                          variant="h2"
                          className={classes.rewardedAmount}
                        >
                          {pendingReward}
                        </Typography>
                        <Typography variant="h2" style={{ color: "#000" }}>
                          GRAV
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      onClick={collectRewards}
                      className={classes.collectBtn}
                    >
                      COLLECT
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box id="nft" className={classes.nftStakingBlock}>
              <Typography variant="h2" className={classes.blockTitle}>
                PUFF STAKING
              </Typography>
              <Grid container className={classes.nftStakingContent}>
                <Grid item md={4} xs={12}>
                  <Box className={classes.leftStakingBlock}></Box>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Box className={classes.stakingNFT}>
                    <Box className={classes.nftTitle}>
                      <Typography variant="h1" className={classes.flyInto1}>
                        INCUBATE YOUR PUFF
                      </Typography>
                      <Typography
                        variant="h1"
                        className={classes.darkMatter}
                        style={{ marginBottom: "0" }}
                      >
                        Earn Variable xGRAV
                      </Typography>
                    </Box>
                    <Box className={classes.nftNFTs}>
                      <Box
                        display={matches ? "block" : "flex"}
                        alignItems="center"
                        mb="33px"
                      >
                        <Typography className={classes.myNft}>
                          MY NFTs
                        </Typography>
                        <Tabs
                          className={classes.muiTabs}
                          TabIndicatorProps={{
                            style: { display: "none" },
                          }}
                          value={tabVal}
                          onChange={tabHandleChange}
                          aria-label="simple tabs example"
                        >
                          <Tab
                            className={classes.muiTab}
                            label="UNSTAKED"
                            {...a11yProps(0)}
                          />
                          <Tab
                            className={classes.muiTab}
                            label="STAKED"
                            {...a11yProps(1)}
                          />
                          <Tab
                            className={classes.muiTab}
                            label="REWARDS"
                            {...a11yProps(2)}
                          />
                        </Tabs>
                      </Box>
                      <Box>
                        <TabPanel value={tabVal} index={0}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems &&
                            Object.values(checkedItems).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems &&
                                Object.values(checkedItems).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box className={classes.nftScroll} id="nft-scroll">
                            {loading ? (
                              <Box alignItems="center" justify="center">
                                <CircularProgress
                                  color="#E9D758"
                                  size={20}
                                  style={{ marginRight: 10, marginTop: 20 }}
                                />
                                Loading NFTs
                              </Box>
                            ) : (
                              currentItems &&
                              currentItems.map((item, index) => (
                                <LazyLoad
                                  height={90}
                                  scrollContainer={"#nft-scroll"}
                                >
                                  <Box key={index}>
                                    <Box
                                      display="flex"
                                      className={
                                        checkedItems && checkedItems[item.name]
                                          ? clsx(
                                              classes.stakingNFTBlock,
                                              classes.selectedNFT
                                            )
                                          : classes.stakingNFTBlock
                                      }
                                    >
                                      <img
                                        className={
                                          checkedItems &&
                                          checkedItems[item.name]
                                            ? clsx(
                                                classes.stakingImg,
                                                classes.selectedNFT
                                              )
                                            : classes.stakingImg
                                        }
                                        src={item.url}
                                      ></img>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        className={classes.stakingWrap}
                                      >
                                        <Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            mb="12px"
                                          >
                                            <Typography
                                              className={
                                                checkedItems &&
                                                checkedItems[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo
                                              }
                                            >
                                              NAME
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems &&
                                                checkedItems[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            >
                                              {item.name}
                                            </Typography>
                                          </Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Typography
                                              className={
                                                checkedItems &&
                                                checkedItems[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo1,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo1
                                              }
                                            >
                                              RARITY RANK
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems &&
                                                checkedItems[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            ></Typography>
                                          </Box>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="end"
                                        >
                                          {checkedItems &&
                                          checkedItems[item.name] ? (
                                            <CloseIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  false,
                                                  "unstaked"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></CloseIcon>
                                          ) : (
                                            <AddIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  true,
                                                  "unstaked"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></AddIcon>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </LazyLoad>
                              ))
                            )}
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Button
                              onClick={nftStake}
                              className={classes.nftStakeBtn}
                            >
                              STAKE{" "}
                              {checkedItems &&
                              Object.values(checkedItems).filter(
                                (item) => item === true
                              ).length
                                ? Object.values(checkedItems).filter(
                                    (item) => item === true
                                  ).length
                                : ""}{" "}
                              NFT
                            </Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabVal} index={1}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems1 &&
                            Object.values(checkedItems1).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT1}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems1 &&
                                Object.values(checkedItems1).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems1).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT1}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box
                            className={classes.nftScroll}
                            id="nft-scroll-staked"
                          >
                            {loading1 ? (
                              <Box alignItems="center" justify="center">
                                <CircularProgress
                                  color="#E9D758"
                                  size={20}
                                  style={{ marginRight: 10, marginTop: 20 }}
                                />
                                Loading Staked NFTs
                              </Box>
                            ) : (
                              stakedItems &&
                              stakedItems.map((item, index) => (
                                <LazyLoad
                                  height={90}
                                  scrollContainer={"#nft-scroll-staked"}
                                >
                                  <Box key={index}>
                                    <Box
                                      display="flex"
                                      className={
                                        checkedItems1 &&
                                        checkedItems1[item.name]
                                          ? clsx(
                                              classes.stakingNFTBlock,
                                              classes.selectedNFT
                                            )
                                          : classes.stakingNFTBlock
                                      }
                                    >
                                      <img
                                        className={
                                          checkedItems1 &&
                                          checkedItems1[item.name]
                                            ? clsx(
                                                classes.stakingImg,
                                                classes.selectedNFT
                                              )
                                            : classes.stakingImg
                                        }
                                        src={item.url}
                                      ></img>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        className={classes.stakingWrap}
                                      >
                                        <Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            mb="12px"
                                          >
                                            <Typography
                                              className={
                                                checkedItems1 &&
                                                checkedItems1[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo
                                              }
                                            >
                                              NAME
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems1 &&
                                                checkedItems1[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            >
                                              {item.name}
                                            </Typography>
                                          </Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Typography
                                              className={
                                                checkedItems1 &&
                                                checkedItems1[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo1,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo1
                                              }
                                            >
                                              RARITY RANK
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems1 &&
                                                checkedItems1[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            ></Typography>
                                          </Box>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="end"
                                        >
                                          {checkedItems1 &&
                                          checkedItems1[item.name] ? (
                                            <CloseIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  false,
                                                  "staked"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></CloseIcon>
                                          ) : (
                                            <AddIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  true,
                                                  "staked"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></AddIcon>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </LazyLoad>
                              ))
                            )}
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Button
                              onClick={nftUnstake}
                              className={classes.nftStakeBtn}
                            >
                              UNSTAKE{" "}
                              {checkedItems1 &&
                              Object.values(checkedItems1).filter(
                                (item) => item === true
                              ).length
                                ? Object.values(checkedItems1).filter(
                                    (item) => item === true
                                  ).length
                                : ""}{" "}
                              NFT
                            </Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabVal} index={2}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems2 &&
                            Object.values(checkedItems2).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT2}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems2 &&
                                Object.values(checkedItems2).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems2).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT2}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box
                            className={classes.nftScroll}
                            id="nft-scroll-rewards"
                          >
                            {loading2 ? (
                              <Box alignItems="center" justify="center">
                                <CircularProgress
                                  color="#E9D758"
                                  size={20}
                                  style={{ marginRight: 10, marginTop: 20 }}
                                />
                                Fetching Rewards
                              </Box>
                            ) : (
                              rewardItems &&
                              rewardItems.map((item, index) => (
                                <LazyLoad
                                  height={90}
                                  scrollContainer={"#nft-scroll-rewards"}
                                >
                                  <Box key={index}>
                                    <Box
                                      display="flex"
                                      className={
                                        checkedItems2 &&
                                        checkedItems2[item.name]
                                          ? clsx(
                                              classes.stakingNFTBlock,
                                              classes.selectedNFT
                                            )
                                          : classes.stakingNFTBlock
                                      }
                                    >
                                      <img
                                        className={
                                          checkedItems2 &&
                                          checkedItems2[item.name]
                                            ? clsx(
                                                classes.stakingImg,
                                                classes.selectedNFT
                                              )
                                            : classes.stakingImg
                                        }
                                        src={item.url}
                                      ></img>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        className={classes.stakingWrap}
                                      >
                                        <Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            mb="12px"
                                          >
                                            <Typography
                                              className={
                                                checkedItems2 &&
                                                checkedItems2[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo
                                              }
                                            >
                                              NAME
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems2 &&
                                                checkedItems2[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            >
                                              {item.name}
                                            </Typography>
                                          </Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Typography
                                              className={
                                                checkedItems2 &&
                                                checkedItems2[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo1,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo1
                                              }
                                            >
                                              REWARDS
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems2 &&
                                                checkedItems2[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            >
                                              {parseFloat(item.rewards).toFixed(
                                                4
                                              )}
                                            </Typography>
                                          </Box>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="end"
                                        >
                                          {checkedItems2 &&
                                          checkedItems2[item.name] ? (
                                            <CloseIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  false,
                                                  "rewarded"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></CloseIcon>
                                          ) : (
                                            <AddIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  true,
                                                  "rewarded"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></AddIcon>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </LazyLoad>
                              ))
                            )}
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box className={classes.totalBlock}>
                              <Typography className={classes.totalTitle}>
                                TOTAL REWARDS ${" "}
                              </Typography>
                              <Typography className={classes.gravAmount}>
                                {totalRewards && totalRewards.toFixed(3)}{" "}
                              </Typography>
                            </Box>
                            <Button
                              onClick={nftClaim}
                              className={classes.nftStakeBtn}
                            >
                              CLAIM
                            </Button>
                          </Box>
                        </TabPanel>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* <Box id="rarity" className={classes.rarityStakingBlock}>
              <Typography variant="h2" className={classes.blockTitle}>
                RARITY STAKING
              </Typography>
              <Grid container className={classes.nftStakingContent}>
                <Grid item md={8} xs={12}>
                  <Box className={classes.stakingNFT}>
                    <Box className={classes.nftTitle}>
                      <Typography variant="h1" className={classes.flyInto1}>
                        HARMOLECULE SPECTROSCOPY
                      </Typography>
                      <Typography
                        variant="h1"
                        className={classes.darkMatter}
                        style={{ marginBottom: "0" }}
                      >
                        Stake your harmolecule NFTs
                      </Typography>
                    </Box>
                    <Box className={classes.nftNFTs}>
                      <Box
                        display={matches ? "block" : "flex"}
                        alignItems="center"
                        mb="33px"
                      >
                        <Typography className={classes.myNft}>
                          MY NFTs
                        </Typography>
                        <Tabs
                          className={classes.muiTabs}
                          TabIndicatorProps={{
                            style: { display: "none" },
                          }}
                          value={tabValRarity}
                          onChange={tabHandleChangeRarity}
                          aria-label="simple tabs example"
                        >
                          <Tab
                            className={classes.muiTab}
                            label="UNSTAKED"
                            {...a11yProps(0)}
                          />
                          <Tab
                            className={classes.muiTab}
                            label="STAKED"
                            {...a11yProps(1)}
                          />
                          <Tab
                            className={classes.muiTab}
                            label="REWARDS"
                            {...a11yProps(2)}
                          />
                        </Tabs>
                      </Box>
                      <Box>
                        <TabPanel value={tabValRarity} index={0}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems3 &&
                            Object.values(checkedItems3).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT3}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems3 &&
                                Object.values(checkedItems3).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems3).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT3}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box className={classes.nftScroll} id="rarity-scroll">
                            {currentItemsRarity &&
                              currentItemsRarity.map((item, index) => (
                                <LazyLoad
                                  height={90}
                                  scrollContainer={"#rarity-scroll"}
                                >
                                  <Box key={index}>
                                    <Box
                                      display="flex"
                                      className={
                                        checkedItems3 &&
                                        checkedItems3[item.name]
                                          ? clsx(
                                              classes.stakingNFTBlock,
                                              classes.selectedNFT
                                            )
                                          : classes.stakingNFTBlock
                                      }
                                    >
                                      <img
                                        className={
                                          checkedItems3 &&
                                          checkedItems3[item.name]
                                            ? clsx(
                                                classes.stakingImg,
                                                classes.selectedNFT
                                              )
                                            : classes.stakingImg
                                        }
                                        src={item.url}
                                      ></img>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        className={classes.stakingWrap}
                                      >
                                        <Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            mb="12px"
                                          >
                                            <Typography
                                              className={
                                                checkedItems3 &&
                                                checkedItems3[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo
                                              }
                                            >
                                              NAME
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems3 &&
                                                checkedItems3[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            >
                                              {item.name}
                                            </Typography>
                                          </Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Typography
                                              className={
                                                checkedItems3 &&
                                                checkedItems3[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo1,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo1
                                              }
                                            >
                                              RARITY RANK
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems3 &&
                                                checkedItems3[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            ></Typography>
                                          </Box>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="end"
                                        >
                                          {checkedItems3 &&
                                          checkedItems3[item.name] ? (
                                            <CloseIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  false,
                                                  "unstaked_rarity"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></CloseIcon>
                                          ) : (
                                            <AddIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  true,
                                                  "unstaked_rarity"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></AddIcon>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </LazyLoad>
                              ))}
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Button
                              onClick={rarityStake}
                              className={classes.nftStakeBtn}
                            >
                              STAKE{" "}
                              {checkedItems3 &&
                              Object.values(checkedItems3).filter(
                                (item) => item === true
                              ).length
                                ? Object.values(checkedItems3).filter(
                                    (item) => item === true
                                  ).length
                                : ""}{" "}
                              NFT
                            </Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabValRarity} index={1}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems4 &&
                            Object.values(checkedItems4).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT4}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems4 &&
                                Object.values(checkedItems4).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems4).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT4}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box
                            className={classes.nftScroll}
                            id="rarity-staked-scroll"
                          >
                            {stakedItemsRarity &&
                              stakedItemsRarity.map((item, index) => (
                                <LazyLoad
                                  height={90}
                                  scrollContainer={"#rarity-staked-scroll"}
                                >
                                  <Box key={index}>
                                    <Box
                                      display="flex"
                                      className={
                                        checkedItems4 &&
                                        checkedItems4[item.name]
                                          ? clsx(
                                              classes.stakingNFTBlock,
                                              classes.selectedNFT
                                            )
                                          : classes.stakingNFTBlock
                                      }
                                    >
                                      <img
                                        className={
                                          checkedItems4 &&
                                          checkedItems4[item.name]
                                            ? clsx(
                                                classes.stakingImg,
                                                classes.selectedNFT
                                              )
                                            : classes.stakingImg
                                        }
                                        src={item.url}
                                      ></img>
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        className={classes.stakingWrap}
                                      >
                                        <Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            mb="12px"
                                          >
                                            <Typography
                                              className={
                                                checkedItems4 &&
                                                checkedItems4[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo
                                              }
                                            >
                                              NAME
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems4 &&
                                                checkedItems4[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            >
                                              {item.name}
                                            </Typography>
                                          </Box>
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                          >
                                            <Typography
                                              className={
                                                checkedItems4 &&
                                                checkedItems4[item.name]
                                                  ? clsx(
                                                      classes.stakingInfo1,
                                                      classes.stakingInfoSelected
                                                    )
                                                  : classes.stakingInfo1
                                              }
                                            >
                                              RARITY RANK
                                            </Typography>
                                            <Typography
                                              className={
                                                checkedItems4 &&
                                                checkedItems4[item.name]
                                                  ? clsx(
                                                      classes.stakingName,
                                                      classes.stakingNameSelect
                                                    )
                                                  : classes.stakingName
                                              }
                                            ></Typography>
                                          </Box>
                                        </Box>
                                        <Box
                                          display="flex"
                                          justifyContent="end"
                                        >
                                          {checkedItems4 &&
                                          checkedItems4[item.name] ? (
                                            <CloseIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  false,
                                                  "staked_rarity"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></CloseIcon>
                                          ) : (
                                            <AddIcon
                                              onClick={() =>
                                                checkNFTHandle(
                                                  item.name,
                                                  true,
                                                  "staked_rarity"
                                                )
                                              }
                                              className={classes.stakingCTA}
                                            ></AddIcon>
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </LazyLoad>
                              ))}
                          </Box>
                          <Box display="flex" justifyContent="end">
                            <Button
                              onClick={rarityUnstake}
                              className={classes.nftStakeBtn}
                            >
                              UNSTAKE{" "}
                              {checkedItems4 &&
                              Object.values(checkedItems4).filter(
                                (item) => item === true
                              ).length
                                ? Object.values(checkedItems4).filter(
                                    (item) => item === true
                                  ).length
                                : ""}{" "}
                              NFT
                            </Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabValRarity} index={2}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems5 &&
                            Object.values(checkedItems5).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT5}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>
                                {checkedItems5 &&
                                Object.values(checkedItems5).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems5).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT5}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box
                            className={classes.nftScroll}
                            id="rarity-scroll-rewards"
                          >
                            {rewardItemsRarity &&
                              rewardItemsRarity.map((item, index) => {
                                return (
                                  <LazyLoad
                                    height={90}
                                    scrollContainer={"#rarity-scroll-rewards"}
                                  >
                                    <Box key={index}>
                                      <Box
                                        display="flex"
                                        className={
                                          checkedItems5 &&
                                          checkedItems5[item.name]
                                            ? clsx(
                                                classes.stakingNFTBlock,
                                                classes.selectedNFT
                                              )
                                            : classes.stakingNFTBlock
                                        }
                                      >
                                        <img
                                          className={
                                            checkedItems5 &&
                                            checkedItems5[item.name]
                                              ? clsx(
                                                  classes.stakingImg,
                                                  classes.selectedNFT
                                                )
                                              : classes.stakingImg
                                          }
                                          src={item.url}
                                        ></img>
                                        <Box
                                          display="flex"
                                          justifyContent="space-between"
                                          className={classes.stakingWrap}
                                        >
                                          <Box>
                                            <Box
                                              display="flex"
                                              alignItems="center"
                                              mb="12px"
                                            >
                                              <Typography
                                                className={
                                                  checkedItems5 &&
                                                  checkedItems5[item.name]
                                                    ? clsx(
                                                        classes.stakingInfo,
                                                        classes.stakingInfoSelected
                                                      )
                                                    : classes.stakingInfo
                                                }
                                              >
                                                NAME
                                              </Typography>
                                              <Typography
                                                className={
                                                  checkedItems5 &&
                                                  checkedItems5[item.name]
                                                    ? clsx(
                                                        classes.stakingName,
                                                        classes.stakingNameSelect
                                                      )
                                                    : classes.stakingName
                                                }
                                              >
                                                {item.name}
                                              </Typography>
                                            </Box>
                                            <Box
                                              display="flex"
                                              alignItems="center"
                                            >
                                              <Typography
                                                className={
                                                  checkedItems5 &&
                                                  checkedItems5[item.name]
                                                    ? clsx(
                                                        classes.stakingInfo1,
                                                        classes.stakingInfoSelected
                                                      )
                                                    : classes.stakingInfo1
                                                }
                                              >
                                                REWARDS
                                              </Typography>
                                              <Typography
                                                className={
                                                  checkedItems5 &&
                                                  checkedItems5[item.name]
                                                    ? clsx(
                                                        classes.stakingName,
                                                        classes.stakingNameSelect
                                                      )
                                                    : classes.stakingName
                                                }
                                              >
                                                {parseFloat(
                                                  item.rewards
                                                ).toFixed(4)}
                                              </Typography>
                                            </Box>
                                          </Box>
                                          <Box
                                            display="flex"
                                            justifyContent="end"
                                          >
                                            <Button
                                              onClick={() =>
                                                raffleRoll(item.id)
                                              }
                                              className={
                                                checkedItems5 &&
                                                checkedItems5[item.name]
                                                  ? clsx([
                                                      classes.rollBtn,
                                                      classes.selectedRollBtn,
                                                    ])
                                                  : classes.rollBtn
                                              }
                                            >
                                              {item.rollWhen +
                                                12 * 60 * 60 * 1000 >
                                              Date.now() ? (
                                                <Countdown
                                                  daysInHours
                                                  date={
                                                    item.rollWhen +
                                                    12 * 60 * 60 * 1000
                                                  }
                                                />
                                              ) : (
                                                "Roll"
                                              )}
                                            </Button>
                                            {checkedItems5 &&
                                            checkedItems5[item.name] ? (
                                              <CloseIcon
                                                onClick={() =>
                                                  checkNFTHandle(
                                                    item.name,
                                                    false,
                                                    "rewarded_rarity"
                                                  )
                                                }
                                                className={classes.stakingCTA}
                                              ></CloseIcon>
                                            ) : (
                                              <AddIcon
                                                onClick={() =>
                                                  checkNFTHandle(
                                                    item.name,
                                                    true,
                                                    "rewarded_rarity"
                                                  )
                                                }
                                                className={classes.stakingCTA}
                                              ></AddIcon>
                                            )}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </LazyLoad>
                                );
                              })}
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box className={classes.totalBlock}>
                              <Typography className={classes.totalTitle}>
                                TOTAL REWARDS ${" "}
                              </Typography>
                              <Typography className={classes.gravAmount}>
                                {totalRewardsRarity &&
                                  parseFloat(totalRewardsRarity).toFixed(
                                    4
                                  )}{" "}
                              </Typography>
                            </Box>
                            <Button
                              onClick={raffleRollSelected}
                              className={classes.rarityStakeBtn}
                            >
                              ROLL
                            </Button>
                            <Button
                              onClick={rarityClaim}
                              className={classes.rarityStakeBtn}
                            >
                              CLAIM
                            </Button>
                          </Box>
                        </TabPanel>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box className={classes.rightRarityBlock}></Box>
                </Grid>
              </Grid>
            </Box> */}
            <Box
              id="time"
              className={classes.lockStakingBlock}
              style={{
                position: "relative",
                overflowX: "hidden",
              }}
            >
              {!matches && (
                <Box
                  display="flex"
                  position="absolute"
                  style={{ right: "0px", top: "14px" }}
                >
                  <Box
                    width="190px"
                    display="flex"
                    justifyContent="space-around"
                    border="1px solid #E9D758"
                    padding="11px"
                  >
                    <Typography className={classes.topLabel}>
                      3 MONTH
                    </Typography>
                    <Typography className={classes.topLabelInfo}>
                      40% APR
                    </Typography>
                  </Box>
                  <Box
                    width="190px"
                    display="flex"
                    justifyContent="space-around"
                    border="1px solid #E9D758"
                    padding="11px"
                  >
                    <Typography className={classes.topLabel}>
                      6 MONTH
                    </Typography>
                    <Typography className={classes.topLabelInfo}>
                      50% APR
                    </Typography>
                  </Box>
                  <Box
                    width="200px"
                    display="flex"
                    justifyContent="space-around"
                    border="1px solid #E9D758"
                    padding="11px"
                  >
                    <Typography className={classes.topLabel}>
                      12 MONTH
                    </Typography>
                    <Typography className={classes.topLabelInfo}>
                      60% APR
                    </Typography>
                  </Box>
                </Box>
              )}
              <Typography variant="h2" className={classes.blockTitle}>
                TIME LOCKED
              </Typography>
              <Typography variant="h2" className={classes.blockTitleDesc}>
                <img style={{ marginRight: "10px" }} src="up-arrow.png"></img>{" "}
                Lock GRAV Token and Earn xGRAV{" "}
                <img style={{ marginLeft: "10px" }} src="up-arrow.png"></img>
              </Typography>
              {matches && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box
                    width="217px"
                    display="flex"
                    flexDirection="column"
                    style={{
                      border: "1px solid #E9D758",
                      padding: "20px",
                      textAlign: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography className={classes.topLabel}>
                      3 MONTH
                    </Typography>
                    <Typography className={classes.topLabelInfo}>
                      40% APR
                    </Typography>
                  </Box>
                  <Box
                    width="217px"
                    display="flex"
                    flexDirection="column"
                    style={{
                      border: "1px solid #E9D758",
                      padding: "20px",
                      textAlign: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography className={classes.topLabel}>
                      6 MONTH
                    </Typography>
                    <Typography className={classes.topLabelInfo}>
                      50% APR
                    </Typography>
                  </Box>
                  <Box
                    width="217px"
                    display="flex"
                    flexDirection="column"
                    style={{
                      border: "1px solid #E9D758",
                      padding: "20px",
                      textAlign: "center",
                      marginBottom: "50px",
                    }}
                  >
                    <Typography className={classes.topLabel}>
                      12 MONTH
                    </Typography>
                    <Typography className={classes.topLabelInfo}>
                      60% APR
                    </Typography>
                  </Box>
                </Box>
              )}

              <Grid container className={classes.stakeAndLockBlock}>
                <Grid item md={6} xs={12} className={classes.stakeAndLockLeft}>
                  <Typography
                    className={classes.stakeAndLockTitle}
                    variant="h1"
                  >
                    STAKE AND LOCK
                  </Typography>
                  <Typography
                    className={classes.stakeAndLockSubTitle}
                    variant="h1"
                  >
                    BALANCE:{" "}
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      {parseFloat(lockStakedAmount).toFixed(4)}
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  md={6}
                  xs={12}
                  className={classes.stakeAndLockRight}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    className={classes.stakeAndLockRightTop}
                  >
                    <Grid item md={8}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          placeholder="ENTER AMOUNT TO STAKE"
                          value={monthStakingInputAmount}
                          onChange={(event) => {
                            dispatch({
                              type: "SET_MONTH_STAKE_AMOUNT",
                              monthStakingInputAmount: event.target.value,
                            });
                          }}
                          className={classes.stakeAmountInput}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={4}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="end"
                        height="100%"
                      >
                        <Typography className={classes.unitLabel1}>
                          GRAV
                        </Typography>
                        <Button
                          onClick={handleMaxLocked}
                          className={classes.maxBtn}
                        >
                          MAX
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid
                      item
                      md={4}
                      xs={12}
                      className={classes.stakeAndLockRightBottomLeft}
                    >
                      <Button
                        onClick={() => lockedStake(0)}
                        className={clsx(classes.stake6btn)}
                      >
                        3 MONTHS
                      </Button>
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                      className={classes.stakeAndLockRightBottomLeft}
                    >
                      <Button
                        onClick={() => lockedStake(1)}
                        className={clsx(classes.stake6btn, classes.mobileCTA)}
                      >
                        6 MONTHS
                      </Button>
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                      className={classes.stakeAndLockRightBottomRight}
                    >
                      <Button
                        onClick={() => lockedStake(2)}
                        className={classes.stake6btn}
                      >
                        12 MONTHS
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className={classes.nftStakingContent}>
                <Grid item md={8} xs={12}>
                  <Box className={classes.stakingNFT}>
                    <Box className={classes.nftNFTs}>
                      <Box
                        display={matches ? "block" : "flex"}
                        alignItems="center"
                        mb="33px"
                      >
                        <Typography className={classes.myNft}>
                          STAKED GRAVs
                        </Typography>
                        <Tabs
                          className={classes.muiTabs}
                          TabIndicatorProps={{
                            style: { display: "none" },
                          }}
                          value={tabValLocked}
                          onChange={tabHandleChangeLocked}
                          aria-label="simple tabs example"
                        >
                          <Tab
                            className={classes.muiTab}
                            label="ONGOING"
                            {...a11yProps(0)}
                          />
                          <Tab
                            className={classes.muiTab}
                            label="COMPLETED"
                            {...a11yProps(1)}
                          />
                        </Tabs>
                      </Box>
                      <Box>
                        <TabPanel value={tabValLocked} index={0}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems6 &&
                            Object.values(checkedItems6).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT6}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems6 &&
                                Object.values(checkedItems6).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems6).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT6}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box
                            className={classes.nftScroll2}
                            id="locked-scroll-ongoing"
                          >
                            {ongoingItemsLocked &&
                              ongoingItemsLocked.map((item, index) => (
                                <Box key={index}>
                                  <Grid
                                    container
                                    display="flex"
                                    className={
                                      checkedItems6 && checkedItems6[item.id]
                                        ? clsx(
                                            classes.stakingNFTBlock,
                                            classes.selectedNFT
                                          )
                                        : classes.stakingNFTBlock
                                    }
                                  >
                                    <Grid
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      xs={12}
                                      md={2}
                                    >
                                      <Box
                                        style={
                                          checkedItems6 &&
                                          checkedItems6[item.id]
                                            ? {
                                                fontSize: "32px",
                                                fontWeight: "800",
                                                color: "#121212",
                                              }
                                            : {
                                                fontSize: "32px",
                                                fontWeight: "800",
                                                color: "#E9D758",
                                              }
                                        }
                                      >
                                        {decodeDuration(item.durationCode)}
                                      </Box>
                                      <Box
                                        style={
                                          checkedItems6 &&
                                          checkedItems6[item.id]
                                            ? {
                                                fontWeight: "600",
                                                color: "#121212",
                                                marginTop: "-6px",
                                              }
                                            : {
                                                fontWeight: "800",
                                                color: "#E9D758",
                                                marginTop: "-6px",
                                              }
                                        }
                                      >
                                        MONTHS
                                      </Box>
                                    </Grid>

                                    <Grid
                                      container
                                      display="flex"
                                      justifyContent="space-between"
                                      className={classes.stakingWrap2}
                                      xs={12}
                                      md={8}
                                    >
                                      <Grid xs={12} md={5}>
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          mb="12px"
                                          justifyContent="space-between"
                                        >
                                          <Typography
                                            className={
                                              checkedItems6 &&
                                              checkedItems6[item.id]
                                                ? clsx(
                                                    classes.stakingInfo2,
                                                    classes.stakingInfoSelected
                                                  )
                                                : classes.stakingInfo2
                                            }
                                          >
                                            AMOUNT
                                          </Typography>
                                          <Typography
                                            className={
                                              checkedItems6 &&
                                              checkedItems6[item.id]
                                                ? clsx(
                                                    classes.stakingName2,
                                                    classes.stakingNameSelect
                                                  )
                                                : classes.stakingName2
                                            }
                                          >
                                            {item.amount}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid
                                        xs={12}
                                        md={5}
                                        style={
                                          matchesMd
                                            ? { paddingLeft: "12px" }
                                            : { paddingTop: "12px" }
                                        }
                                      >
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          mb="12px"
                                          justifyContent="space-between"
                                        >
                                          <Typography
                                            className={
                                              checkedItems6 &&
                                              checkedItems6[item.id]
                                                ? clsx(
                                                    classes.stakingInfo2,
                                                    classes.stakingInfoSelected
                                                  )
                                                : classes.stakingInfo2
                                            }
                                          >
                                            REWARDS{" "}
                                          </Typography>
                                          <Typography
                                            className={
                                              checkedItems6 &&
                                              checkedItems6[item.id]
                                                ? clsx(
                                                    classes.stakingName2,
                                                    classes.stakingNameSelect
                                                  )
                                                : classes.stakingName2
                                            }
                                          >
                                            {parseFloat(
                                              lockStakedRewards[index]
                                            ).toFixed(4)}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid xs={12} md={12}>
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                        >
                                          <Typography
                                            className={
                                              checkedItems6 &&
                                              checkedItems6[item.id]
                                                ? clsx(
                                                    classes.stakingInfo2,
                                                    classes.stakingInfoSelected
                                                  )
                                                : classes.stakingInfo2
                                            }
                                          >
                                            TIME LEFT
                                          </Typography>
                                          <Typography
                                            className={
                                              checkedItems6 &&
                                              checkedItems6[item.id]
                                                ? clsx(
                                                    classes.stakingName2,
                                                    classes.stakingNameSelect
                                                  )
                                                : classes.stakingName2
                                            }
                                          >
                                            <Countdown
                                              renderer={countDownRenderer}
                                              date={
                                                item.stakeTime +
                                                decodeDuration(
                                                  item.durationCode
                                                ) *
                                                  30 *
                                                  24 *
                                                  60 *
                                                  60 *
                                                  1000
                                              }
                                            />
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      container
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      xs={12}
                                      md={2}
                                    >
                                      {checkedItems6 &&
                                      checkedItems6[item.id] ? (
                                        <CloseIcon
                                          onClick={() =>
                                            checkNFTHandle(
                                              item.id,
                                              false,
                                              "ongoing_locked"
                                            )
                                          }
                                          className={classes.stakingCTA}
                                        ></CloseIcon>
                                      ) : (
                                        <AddIcon
                                          onClick={() =>
                                            checkNFTHandle(
                                              item.id,
                                              true,
                                              "ongoing_locked"
                                            )
                                          }
                                          className={classes.stakingCTA}
                                        ></AddIcon>
                                      )}
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Button
                              onClick={lockedUnstakeForced}
                              className={classes.nftStakeBtn2}
                            >
                              FORCE UNSTAKE{" "}
                              {checkedItems6 &&
                              Object.values(checkedItems6).filter(
                                (item) => item === true
                              ).length
                                ? "(" +
                                  Object.values(checkedItems6).filter(
                                    (item) => item === true
                                  ).length +
                                  ")"
                                : ""}{" "}
                            </Button>
                            <Button
                              onClick={lockedClaim}
                              className={classes.nftStakeBtn}
                            >
                              CLAIM REWARDS{" "}
                              {checkedItems6 &&
                              Object.values(checkedItems6).filter(
                                (item) => item === true
                              ).length
                                ? "(" +
                                  Object.values(checkedItems6).filter(
                                    (item) => item === true
                                  ).length +
                                  ")"
                                : ""}{" "}
                            </Button>
                          </Box>
                        </TabPanel>
                        <TabPanel value={tabValLocked} index={1}>
                          <Box display="flex" justifyContent="end">
                            {checkedItems6 &&
                            Object.values(checkedItems6).filter(
                              (item) => item === true
                            ).length ? (
                              <Button
                                onClick={deselectAllNFT7}
                                className={classes.selectAllBtn}
                              >
                                <CloseIcon
                                  style={{ fontSize: "15px" }}
                                ></CloseIcon>{" "}
                                {checkedItems7 &&
                                Object.values(checkedItems7).filter(
                                  (item) => item === true
                                ).length
                                  ? Object.values(checkedItems7).filter(
                                      (item) => item === true
                                    ).length
                                  : ""}{" "}
                                SELECTED
                              </Button>
                            ) : (
                              <Button
                                onClick={selectAllNFT7}
                                className={classes.selectAllBtn}
                              >
                                Select All
                              </Button>
                            )}
                          </Box>
                          <Box
                            className={classes.nftScroll}
                            id="locked-scroll-completed"
                          >
                            {completedItemsLocked &&
                              completedItemsLocked.map((item, index) => (
                                <Box key={index}>
                                  <Grid
                                    container
                                    display="flex"
                                    className={
                                      checkedItems7 && checkedItems7[item.id]
                                        ? clsx(
                                            classes.stakingNFTBlock,
                                            classes.selectedNFT
                                          )
                                        : classes.stakingNFTBlock
                                    }
                                  >
                                    <Grid
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      xs={12}
                                      md={2}
                                    >
                                      <Box
                                        style={
                                          checkedItems7 &&
                                          checkedItems7[item.id]
                                            ? {
                                                fontSize: "32px",
                                                fontWeight: "800",
                                                color: "#121212",
                                              }
                                            : {
                                                fontSize: "32px",
                                                fontWeight: "800",
                                                color: "#E9D758",
                                              }
                                        }
                                      >
                                        {decodeDuration(item.durationCode)}
                                      </Box>
                                      <Box
                                        style={
                                          checkedItems7 &&
                                          checkedItems7[item.id]
                                            ? {
                                                fontWeight: "600",
                                                color: "#121212",
                                                marginTop: "-6px",
                                              }
                                            : {
                                                fontWeight: "800",
                                                color: "#E9D758",
                                                marginTop: "-6px",
                                              }
                                        }
                                      >
                                        MONTHS
                                      </Box>
                                    </Grid>

                                    <Grid
                                      container
                                      display="flex"
                                      justifyContent="space-between"
                                      className={classes.stakingWrap2}
                                      xs={12}
                                      md={10}
                                    >
                                      <Grid xs={12} md={5}>
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          mb="12px"
                                          justifyContent="space-between"
                                        >
                                          <Typography
                                            className={
                                              checkedItems7 &&
                                              checkedItems7[item.id]
                                                ? clsx(
                                                    classes.stakingInfo2,
                                                    classes.stakingInfoSelected
                                                  )
                                                : classes.stakingInfo2
                                            }
                                          >
                                            AMOUNT
                                          </Typography>
                                          <Typography
                                            className={
                                              checkedItems7 &&
                                              checkedItems7[item.id]
                                                ? clsx(
                                                    classes.stakingName2,
                                                    classes.stakingNameSelect
                                                  )
                                                : classes.stakingName2
                                            }
                                          >
                                            {item.amount}
                                          </Typography>
                                        </Box>
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                        >
                                          <Typography
                                            className={
                                              checkedItems7 &&
                                              checkedItems7[item.id]
                                                ? clsx(
                                                    classes.stakingInfo2,
                                                    classes.stakingInfoSelected
                                                  )
                                                : classes.stakingInfo2
                                            }
                                          >
                                            TIME LEFT
                                          </Typography>
                                          <Typography
                                            className={
                                              checkedItems7 &&
                                              checkedItems7[item.id]
                                                ? clsx(
                                                    classes.stakingName2,
                                                    classes.stakingNameSelect
                                                  )
                                                : classes.stakingName2
                                            }
                                          >
                                            COMPLETED
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid
                                        xs={12}
                                        md={5}
                                        style={
                                          matchesMd
                                            ? { paddingLeft: "12px" }
                                            : { paddingTop: "12px" }
                                        }
                                      >
                                        <Box
                                          display="flex"
                                          alignItems="center"
                                          mb="12px"
                                          justifyContent="space-between"
                                        >
                                          <Typography
                                            className={
                                              checkedItems7 &&
                                              checkedItems7[item.id]
                                                ? clsx(
                                                    classes.stakingInfo2,
                                                    classes.stakingInfoSelected
                                                  )
                                                : classes.stakingInfo2
                                            }
                                          >
                                            REWARDS{" "}
                                          </Typography>
                                          <Typography
                                            className={
                                              checkedItems7 &&
                                              checkedItems7[item.id]
                                                ? clsx(
                                                    classes.stakingName2,
                                                    classes.stakingNameSelect
                                                  )
                                                : classes.stakingName2
                                            }
                                          >
                                            {parseFloat(
                                              lockStakedRewards[index]
                                            ).toFixed(4)}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid
                                        container
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        xs={12}
                                        md={2}
                                      >
                                        {checkedItems7 &&
                                        checkedItems7[item.id] ? (
                                          <CloseIcon
                                            onClick={() =>
                                              checkNFTHandle(
                                                item.id,
                                                false,
                                                "completed_locked"
                                              )
                                            }
                                            className={classes.stakingCTA}
                                          ></CloseIcon>
                                        ) : (
                                          <AddIcon
                                            onClick={() =>
                                              checkNFTHandle(
                                                item.id,
                                                true,
                                                "completed_locked"
                                              )
                                            }
                                            className={classes.stakingCTA}
                                          ></AddIcon>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Button
                              onClick={lockedUnstake}
                              className={classes.nftStakeBtn2}
                            >
                              UNSTAKE{" "}
                              {checkedItems7 &&
                              Object.values(checkedItems7).filter(
                                (item) => item === true
                              ).length
                                ? "(" +
                                  Object.values(checkedItems7).filter(
                                    (item) => item === true
                                  ).length +
                                  ")"
                                : ""}{" "}
                            </Button>
                            <Button
                              onClick={lockedClaim}
                              className={classes.nftStakeBtn}
                            >
                              CLAIM REWARDS{" "}
                              {checkedItems7 &&
                              Object.values(checkedItems7).filter(
                                (item) => item === true
                              ).length
                                ? "(" +
                                  Object.values(checkedItems7).filter(
                                    (item) => item === true
                                  ).length +
                                  ")"
                                : ""}{" "}
                            </Button>
                          </Box>
                        </TabPanel>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    className={classes.statCard}
                    display="flex"
                    flexDirection="column"
                  >
                    <Typography className={classes.myNft2}>STATS</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flex={1}
                      flexDirection="column"
                    >
                      <Box
                        className={classes.stakingNFTBlock2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        <Typography className={classes.myNft2}>
                          TOTAL STAKED GRAVS
                        </Typography>
                        <Typography className={classes.bigNumber}>
                          {parseInt(totalGravsStaked)}
                        </Typography>
                      </Box>
                      <Box
                        className={classes.stakingNFTBlock2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        <Typography className={classes.myNft2}>
                          YOUR STAKED GRAVS
                        </Typography>
                        <Typography className={classes.bigNumber}>
                          {parseInt(totalAmountLocked)}
                        </Typography>
                      </Box>
                      <Box
                        className={classes.stakingNFTBlock2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        <Typography className={classes.myNft2}>
                          UNCLAIMED REWARDS
                        </Typography>
                        <Typography className={classes.bigNumber}>
                          {parseFloat(totalRewardsLocked).toFixed(4)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ToastContainer />
      <Modal
        open={raffleModalOpen}
        onClose={() => setRaffleModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography variant="h1" className={classes.flyInto2}>
            RAFFLE RESULT
          </Typography>
          <Box style={{ maxHeight: 400, overflow: "scroll" }}>
            {raffleResult.length &&
              raffleResult.map((el) => {
                return (
                  <>
                    <Box className={classes.modalResult}>
                      <Grid style={{ color: "#E9D758", fontWeight: "800" }}>
                        #{el.id}
                      </Grid>
                      <Grid
                        style={
                          el.result
                            ? { color: "#E9D758", fontWeight: "800" }
                            : { fontWeight: "800" }
                        }
                      >
                        {el.result ? "WON" : "LOST"}
                      </Grid>
                    </Box>
                  </>
                );
              })}
          </Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box className={classes.totalBlock2}>
              <Typography className={classes.totalTitle2}>
                WON {raffleWon}/{raffleResult.length}
              </Typography>
            </Box>
            <Button
              onClick={() => setRaffleModalOpen(false)}
              className={classes.closeBtn}
            >
              <CloseIcon style={{ fontSize: "15px" }}></CloseIcon> CLOSE
            </Button>
          </Box>
        </Box>
      </Modal>
      <UnlocksModal
        open={openUnlocksModal}
        handleModalClose={handleModalClose}
      ></UnlocksModal>
    </Layout>
  );
};

export default Staking;
