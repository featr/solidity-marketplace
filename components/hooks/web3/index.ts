import { useHooks } from "@components/providers/web3";
import { TCreateUseAccountHookReturn } from "@components/providers/web3/hooks/useAccount";
import { TCreateUseNetworkHookReturn } from "@components/providers/web3/hooks/useNetwork";

// const enhanceHook = (swrRes) => {
//   return {
//     ...swrRes,
//     hasInitialResponse: swrRes.data || swrRes.error,
//   };
// };

export const useNetwork = (): TCreateUseNetworkHookReturn => {
  return useHooks((hooks) => hooks.useNetwork)();
};

export const useAccount = (): TCreateUseAccountHookReturn => {
  return useHooks((hooks) => hooks?.useAccount)();
};
