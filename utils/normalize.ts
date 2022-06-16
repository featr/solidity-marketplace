import { CourseContent } from "@content/courses/fetcher";
import { ethers } from "ethers";

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

export const normalizeOwnedCourse = (
  course,
  ownedCourse
): normalizedOwnedCourse => {
  return {
    ...course,
    ownedCourseId: ownedCourse.id.toString(),
    proof: ownedCourse.proof,
    owner: ownedCourse.owner,
    price: ethers.utils.formatEther(ownedCourse.price.toString()).toString(),
    state: COURSE_STATES[ownedCourse.state],
  };
};
