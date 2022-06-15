import { CourseContent } from "@content/courses/fetcher";
import { createArticleHash } from "@utils/hash";
import { normalizedOwnedCourse, normalizeOwnedCourse } from "@utils/normalize";
import useSWR, { SWRResponse } from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AccountType } from "./useAccount";

export interface OwnedCoursesType
  extends SWRResponse<normalizedOwnedCourse, any> {
  hasInitialResponse: boolean;
}

export type TCreateUseOwnedCourseHookReturn = {
  ownedCourse: OwnedCoursesType;
};

export const handler = (web3: Web3, contract: Contract) => (
  course: CourseContent,
  account: AccountType
): TCreateUseOwnedCourseHookReturn => {
  const { data, error, ...rest } = useSWR(
    () =>
      web3 && contract && account ? `web3/ownedCourse/${account.data}` : null,
    async () => {
      const courseHash = createArticleHash(web3)(course.id, account.data);
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      if (ownedCourse.owner === account.data) {
        return normalizeOwnedCourse(web3)(course, ownedCourse);
      }
      return null;
    }
  );
  return {
    ownedCourse: {
      data: data,
      error,
      hasInitialResponse: data || error,
      ...rest,
    },
  };
};
