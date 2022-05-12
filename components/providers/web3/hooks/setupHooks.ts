import { handler as createUseAccount } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

const DEFAULT_HOOKS = {
  useAccount: () => {},
};

export const setupHooks = (web3, provider) => {
  return {
    useAccount: createUseAccount(web3, provider),
    useNetwork: createNetworkHook(web3, provider),
  };
};
