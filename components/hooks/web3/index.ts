import { useHooks, useWeb3 } from "@components/providers/web3";
import {
  AccountType,
  TCreateUseAccountHookReturn,
} from "@components/providers/web3/hooks/useAccount";
import { TCreateUseNetworkHookReturn } from "@components/providers/web3/hooks/useNetwork";
import { TCreateUseOwnedCourseHookReturn } from "@components/providers/web3/hooks/useOwnedCourse";
import { TCreateUseOwnedCoursesHookReturn } from "@components/providers/web3/hooks/useOwnedCourses";
import { CourseContent } from "@content/courses/fetcher";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";

// type GT<R> = SWRResponse<string, any> & TCreateUseOwnedCourseHookReturn;

// function enhanceHook<R>(swrRes: SWRResponse<string, any>): R {
//   return {
//     ...swrRes,
//     hasInitialResponse: swrRes.data || swrRes.error,
//   } as any;
// }

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

export const useOwnedCourse = (
  ...args: [CourseContent, AccountType]
): TCreateUseOwnedCourseHookReturn => {
  return useHooks((hooks) => hooks?.useOwnedCourse)(...args);
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();
  const { contracts } = useWeb3();

  const { mutate, data } = useSWR(
    () => (contracts ? "web3/tokenBalance" : null),
    async () => {
      // const accounts = await provider.listAccounts();
      const hasLifetimeAccess = !!(
        await contracts.passMinterContract["getTokenBalance()"]()
      ).toNumber();

      return hasLifetimeAccess;
    }
  );

  useEffect(() => {
    console.log("netowkr changed from wallet info");
    if (network.isSupported) {
      mutate(true);
    } else {
      mutate(false);
    }
  }, [network.isSupported]);

  return {
    account,
    network,
    hasLifetimeAccess: data,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};
