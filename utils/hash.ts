import Web3 from "web3";

export const createArticleHash = (web3: Web3) => (articleId, account) => {
  const hexCourseId = web3.utils.utf8ToHex(articleId);
  const courseHash = web3.utils.soliditySha3(
    {
      type: "bytes16",
      value: hexCourseId,
    },
    {
      type: "address",
      value: account,
    }
  );
  return courseHash;
};
