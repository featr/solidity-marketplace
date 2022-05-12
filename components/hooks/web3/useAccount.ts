import { useHooks } from "@components/providers/web3";
import { TCreateUseAccountHookReturn } from "@components/providers/web3/hooks/useAccount";

export const useAccount = (): TCreateUseAccountHookReturn => {
  return useHooks((hooks) => hooks.useAccount)();
};
