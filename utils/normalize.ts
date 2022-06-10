import { CourseContent } from "@content/courses/fetcher";
import Web3 from "web3";

enum CourseStates {
  Purchased = "purchased",
  Activated = "activated",
  Deactivated = "deactivated",
}

export const COURSE_STATES: Record<number, CourseStates> = {
  0: CourseStates.Purchased,
  1: CourseStates.Activated,
  2: CourseStates.Deactivated,
};

export type normalizedOwnedCourse = CourseContent & {
  ownedCourseId: string;
  proof: string;
  owner: string;
  price: string;
  state: CourseStates;
};

export const normalizeOwnedCourse = (web3: Web3) => (
  course,
  ownedCourse
): normalizedOwnedCourse => {
  return {
    ...course,
    ownedCourseId: ownedCourse.id,
    proof: ownedCourse.proof,
    owner: ownedCourse.owner,
    price: web3.utils.fromWei(ownedCourse.price),
    state: COURSE_STATES[ownedCourse.state],
  };
};
