import { CourseContent } from "@content/courses/fetcher";
import { createArticleHash } from "@utils/hash";
import { normalizedOwnedCourse, normalizeOwnedCourse } from "@utils/normalize";
import useSWR, { SWRResponse } from "swr";
import { ArticleMarketplace } from "typechain";
import { AccountType } from "./useAccount";

export interface OwnedCoursesType
  extends SWRResponse<normalizedOwnedCourse, any> {
  hasInitialResponse: boolean;
}

export type TCreateUseOwnedCourseHookReturn = {
  ownedCourse: OwnedCoursesType;
};

export const handler = (contract: ArticleMarketplace) => (
  course: CourseContent,
  account: AccountType
): TCreateUseOwnedCourseHookReturn => {
  const { data, error, ...rest } = useSWR(
    () => (contract && account ? `web3/ownedCourse/${account.data}` : null),
    async () => {
      const courseHash = createArticleHash(course.id, account.data);

      const ownedCourse = await contract.getArticleByHash(courseHash);

      if (ownedCourse.owner === account.data) {
        return normalizeOwnedCourse(course, ownedCourse);
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
