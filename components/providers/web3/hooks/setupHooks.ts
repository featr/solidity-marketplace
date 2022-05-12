import { handler as createUseAccount } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

const DEFAULT_HOOKS = {
  useAccount: () => {},
};

export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
    useNetwork: createNetworkHook(web3),
  };
};
