import { CourseContent } from "@content/courses/fetcher";
import { createArticleHash } from "@utils/hash";
import { normalizedOwnedCourse, normalizeOwnedCourse } from "@utils/normalize";
import useSWR, { SWRResponse } from "swr";
import { ArticleMarketplace } from "typechain";
import { AccountType } from "./useAccount";
export interface OwnedCoursesType
  extends SWRResponse<normalizedOwnedCourse[], any> {
  hasInitialResponse: boolean;
}

export type TCreateUseOwnedCoursesHookReturn = {
  ownedCourses: OwnedCoursesType;
};

export const handler = (contract: ArticleMarketplace) => (
  courses: CourseContent[],
  account: AccountType
): TCreateUseOwnedCoursesHookReturn => {
  const { data, error, ...rest } = useSWR(
    () => (account && contract ? `web3/ownedCourses/${account.data}` : null),
    async () => {
      const ownedCourses: normalizedOwnedCourse[] = [];
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          continue;
        }

        const courseHash = createArticleHash(course.id, account.data);

        const ownedCourse = await contract.getArticleByHash(courseHash);

        if (ownedCourse.owner === account.data) {
          const normalized = normalizeOwnedCourse(course, ownedCourse);
          ownedCourses.push(normalized);
        }
      }
      return ownedCourses;
    }
  );
  return {
    ownedCourses: {
      data: data,
      error,
      hasInitialResponse: data || error,
      ...rest,
    },
  };
};
