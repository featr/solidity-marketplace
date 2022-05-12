import useSWR from "swr";
import { useEffect } from "react";
import Web3 from "web3";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

export const handler = (web3: Web3) => () => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("chainChanged", (chainId) =>
        mutate(NETWORKS[parseInt(chainId, 16)])
      );
  }, [mutate]);
  return {
    network: {
      mutate,
      ...rest,
    },
  };
};
