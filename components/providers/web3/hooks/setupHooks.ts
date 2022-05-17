import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";
import {
  handler as createUseAccount,
  TCreateUseAccountHookReturn,
} from "./useAccount";
import {
  handler as createNetworkHook,
  TCreateUseNetworkHookReturn,
} from "./useNetwork";

const DEFAULT_HOOKS = {
  useAccount: () => {},
};

export type SetupHooks = {
  useAccount: () => TCreateUseAccountHookReturn;
  useNetwork: () => TCreateUseNetworkHookReturn;
};

export const setupHooks = (
  web3: Web3 | null,
  provider: MetaMaskInpageProvider | null
): SetupHooks => {
  console.log("setting up hooks");
  return {
    useAccount: createUseAccount(web3, provider),
    useNetwork: createNetworkHook(web3, provider),
  };
};
