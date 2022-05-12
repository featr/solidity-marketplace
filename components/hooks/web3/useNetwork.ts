import { useHooks } from "@components/providers/web3";
import { TCreateUseNetworkHookReturn } from "@components/providers/web3/hooks/useNetwork";

export const useNetwork = (): TCreateUseNetworkHookReturn => {
  return useHooks((hooks) => hooks.useNetwork)();
};
