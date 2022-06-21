import {
  AccountType,
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
import {
  handler as createOwnedCourseHook,
  TCreateUseOwnedCourseHookReturn,
} from "./useOwnedCourse";
import { CourseContent } from "@content/courses/fetcher";
import { ethers } from "ethers";
import { TContracts } from "..";

export type SetupHooks = {
  useAccount: () => TCreateUseAccountHookReturn;
  useNetwork: () => TCreateUseNetworkHookReturn;
  useOwnedCourses: (
    courses: CourseContent[],
    account: AccountType
  ) => TCreateUseOwnedCoursesHookReturn;
  useOwnedCourse: (
    course: CourseContent,
    account: AccountType
  ) => TCreateUseOwnedCourseHookReturn;
};

export const setupHooks = (
  provider: ethers.providers.Web3Provider | null,
  contracts?: TContracts
): SetupHooks => {
  return {
    useAccount: createUseAccount(provider),
    useNetwork: createNetworkHook(provider),
    useOwnedCourses: createOwnedCoursesHook(
      contracts.articleMarketplaceContract
    ),
    useOwnedCourse: createOwnedCourseHook(contracts.articleMarketplaceContract),
  };
};
