import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export type TCreateUseOwnedCoursesHookReturn = string;

export const handler = (
  web3: Web3,
  contract: Contract
) => (): TCreateUseOwnedCoursesHookReturn => {
  return "useOwnedCourses is working";
};
