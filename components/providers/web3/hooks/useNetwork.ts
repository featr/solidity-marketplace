import useSWR, { SWRResponse } from "swr";
import { useEffect } from "react";
import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

interface NetworkType extends SWRResponse<string, any> {
  target: string;
  isSupported: boolean;
  hasBeenInit: boolean;
}

export type TCreateUseNetworkHookReturn = {
  network: NetworkType;
};

export const handler = (
  web3: Web3,
  provider: MetaMaskInpageProvider
) => (): TCreateUseNetworkHookReturn => {
  const { mutate, data, error, ...rest } = useSWR(
    () => (web3 ? "web/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) =>
        mutate(NETWORKS[parseInt(chainId as string, 16)])
      );
  }, [provider, mutate]);
  return {
    network: {
      data,
      hasBeenInit: data || error,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest,
    },
  };
};
