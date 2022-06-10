import { CourseContent } from "@content/courses/fetcher";
import { normalizedOwnedCourse, normalizeOwnedCourse } from "@utils/normalize";
import useSWR, { SWRResponse } from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AccountType } from "./useAccount";

export interface OwnedCoursesType
  extends SWRResponse<normalizedOwnedCourse[], any> {}

export type TCreateUseOwnedCoursesHookReturn = {
  ownedCourses: OwnedCoursesType;
};

export const handler = (web3: Web3, contract: Contract) => (
  courses: CourseContent[],
  account: AccountType
): TCreateUseOwnedCoursesHookReturn => {
  const { data, ...rest } = useSWR(
    () =>
      web3 && contract && account ? `web3/ownedCourses/${account.data}` : null,
    async () => {
      const ownedCourses: normalizedOwnedCourse[] = [];
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          continue;
        }

        const hexCourseId = web3.utils.utf8ToHex(course.id);
        const courseHash = web3.utils.soliditySha3(
          {
            type: "bytes16",
            value: hexCourseId,
          },
          {
            type: "address",
            value: account.data,
          }
        );
        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();
        if (ownedCourse.owner === account.data) {
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
          ownedCourses.push(normalized);
        }
      }
      return ownedCourses;
    }
  );
  return {
    ownedCourses: {
      data: data,
      ...rest,
    },
  };
};
