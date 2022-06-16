import useSWR, { SWRResponse } from "swr";
import { useEffect } from "react";
import { ethers } from "ethers";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
  31337: "Hardhat",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export interface NetworkType extends SWRResponse<string, any> {
  target: string;
  isSupported: boolean;
  hasBeenInit: boolean;
}

export type TCreateUseNetworkHookReturn = {
  network: NetworkType;
};

export const handler = (
  provider: ethers.providers.Web3Provider
) => (): TCreateUseNetworkHookReturn => {
  const { mutate, data, error, ...rest } = useSWR(
    () => (provider ? "web/network" : null),
    async () => {
      const network = await provider.getNetwork();
      const { chainId } = network;

      if (!chainId) {
        throw new Error("Cannot retrieve network. Please refresh the browser.");
      }
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    const mutator = (chainId) =>
      mutate(NETWORKS[parseInt(chainId as string, 16)]);
    (provider?.provider as any)?.on("chainChanged", mutator);

    return () => {
      (provider?.provider as any)?.removeListener("chainChanged", mutator);
    };
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
