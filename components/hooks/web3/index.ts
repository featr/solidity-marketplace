import { useHooks } from "@components/providers/web3";
import {
  AccountType,
  TCreateUseAccountHookReturn,
} from "@components/providers/web3/hooks/useAccount";
import { TCreateUseNetworkHookReturn } from "@components/providers/web3/hooks/useNetwork";
import { TCreateUseOwnedCoursesHookReturn } from "@components/providers/web3/hooks/useOwnedCourses";
import { CourseContent } from "@content/courses/fetcher";

export const useNetwork = (): TCreateUseNetworkHookReturn => {
  return useHooks((hooks) => hooks.useNetwork)();
};

export const useAccount = (): TCreateUseAccountHookReturn => {
  return useHooks((hooks) => hooks?.useAccount)();
};

export const useOwnedCourses = (
  ...args: [CourseContent[], AccountType]
): TCreateUseOwnedCoursesHookReturn => {
  return useHooks((hooks) => hooks?.useOwnedCourses)(...args);
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};
