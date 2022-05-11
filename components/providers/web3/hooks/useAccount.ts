export const handler = (web3) => () => {
  return {
    accounts: web3 ? "Test Account" : "null",
  };
};
