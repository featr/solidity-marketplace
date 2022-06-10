import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract } from "web3-eth-contract";

import Web3 from "web3";
import {
  handler as createUseAccount,
  TCreateUseAccountHookReturn,
} from "./useAccount";
import {
  handler as createNetworkHook,
  TCreateUseNetworkHookReturn,
} from "./useNetwork";
import {
  handler as createOwnedCoursesHook,
  TCreateUseOwnedCoursesHookReturn,
} from "./useOwnedCourses";

const DEFAULT_HOOKS = {
  useAccount: () => {},
};

export type SetupHooks = {
  useAccount: () => TCreateUseAccountHookReturn;
  useNetwork: () => TCreateUseNetworkHookReturn;
  useOwnedCourses: () => TCreateUseOwnedCoursesHookReturn;
};

export const setupHooks = (
  web3: Web3 | null,
  provider: MetaMaskInpageProvider | null,
  contract?: Contract | null
): SetupHooks => {
  console.log("setting up hooks");
  return {
    useAccount: createUseAccount(web3, provider),
    useNetwork: createNetworkHook(web3, provider),
    useOwnedCourses: createOwnedCoursesHook(web3, contract),
  };
};
