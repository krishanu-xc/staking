import { createContext, useEffect, useState } from "react";
import { ethers, utils, BigNumber } from "ethers";
import {
  Provider as MulticallProvider,
  Contract as MulticallContract,
} from "ethers-multicall";
import { toast } from "react-toastify";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const Web3Context = createContext();

// const RPC_URL = "https://api.s0.b.hmny.io";
// const CHAIN_ID = 1666700000;
// const NATIVE_CURRENCY = {
//   name: "one",
//   symbol: "ONE", // 2-6 characters long
//   decimals: 18,
// };
// const CHAIN_NAME = "Harmony Mainnet";
// const STAKING_CONTRACT_ADDRESS = "0xd3B0bAC866aFc43f2b376D71611bAf066980861B";
// const LP_CONTRACT_ADDRESS = "0x0D658ca6BCb02E455355a908E7F6D432b0359950";
// const UNIVERSE_CONTRACT_ADDRESS = "0xd2998765f004a3B40C65aF2f8FA90dBC81BF66c7";

import {
  harmoleculesContractABI,
  harmoleculesContractAddress,
} from "../public/config.js";
import { func } from "prop-types";
import Web3 from "web3";

export const Web3Provider = (props) => {
  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();
  const [correctChain, setCorrectChain] = useState();
  const [askSwitch, setAskSwitch] = useState(false);
  const [contractObjects, setContractObjects] = useState({});
  const [harmolecules, setHarmolecules] = useState({});

  const functionsToExport = {};

  functionsToExport.connectWallet = async () => {
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
    provider.on("disconnect", onAccountsChanged);
    provider.on("accountsChanged", onAccountsChanged);
    const address = await web3.eth.getAccounts();
    setAddress(address[0]);
  };

  functionsToExport.fetchStuff = async () => {
    const [] = await Promise.all([]);
  };

  functionsToExport.setAddress = async (_address) => {
    setAddress(_address);
  };

  functionsToExport.getHarmoleculesNFT = async () => {
    try {
      const balance = await contractObjects?.harmoleculesContract?.balanceOf(
        "0xe38c48ec0a0f98be297cdd12fa5923bf79bff089"
      );
      console.log(balance);
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

      const [multicallProvider, multicallContract] =
        await setupMultiCallContract(
          harmoleculesContractAddress,
          harmoleculesContractABI
        );

      let tokenCalls = [];
      for (let i = 0; i < balance; i++) {
        tokenCalls.push(multicallContract.tokenOfOwnerByIndex(address, i));
      }

      const userTokens = (await multicallProvider?.all(tokenCalls)).map((e) =>
        e.toString()
      );

      console.log(userTokens);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (address) {
      functionsToExport.fetchStuff();
      // functionsToExport.getHarmoleculesNFT();
    }
  }, [address]);

  const onAccountsChanged = async (accounts) => {
    setAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = provider.getSigner();
    setSigner(_signer);
  };
  useEffect(() => {
    const _signer =
      signer || new ethers.providers.Web3Provider(window.ethereum, "any");
    try {
      _signer?.getChainId().then((val) => setCorrectChain(val === CHAIN_ID));
    } catch (e) {
      setCorrectChain(false);
    }
    const harmoleculesContract = new ethers.Contract(
      harmoleculesContractAddress,
      harmoleculesContractABI,
      _signer
    );

    const _contractObjects = {
      harmoleculesContract,
    };

    setContractObjects(_contractObjects);
  }, [signer]);
  const onChainChanged = async (chainID) => {
    await promptChain();
  };
  const addNewChain = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${CHAIN_ID.toString(16)}`,
          rpcUrls: [RPC_URL],
          chainName: CHAIN_NAME,
          nativeCurrency: NATIVE_CURRENCY,
        },
      ],
    });
  };
  const switchCain = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
    });
  };
  const promptChain = async (force = false) => {
    try {
      console.log(askSwitch);
      if (!askSwitch || force) {
        setAskSwitch(true);
        await switchCain();
      }
    } catch (e) {
      await addNewChain();
      // await switchCain();
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = provider.getSigner();
    setSigner(_signer);
  };

  return (
    <Web3Context.Provider
      value={{
        address,
        ...contractObjects,
        ...functionsToExport,
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
