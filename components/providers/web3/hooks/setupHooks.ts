import { handler as createUseAccount } from "./useAccount";

const DEFAULT_HOOKS = {
  useAccount: () => {},
};

export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
  };
};
