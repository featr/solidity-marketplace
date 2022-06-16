import { ethers } from "ethers";

export const createArticleHash = (articleId: string, account: string) => {
  const hexCourseId = ethers.utils.id(articleId);
  const courseHash = ethers.utils.solidityKeccak256(
    ["bytes32", "address"],
    [hexCourseId, account]
  );
  return courseHash;
};
