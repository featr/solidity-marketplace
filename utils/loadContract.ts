import { IGenericContract } from "@components/providers/web3";
import { ethers } from "ethers";

// const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const loadContract = async <T extends ethers.Contract>(
  name: string,
  contractAddress: string,
  signer: ethers.providers.JsonRpcSigner | ethers.providers.Web3Provider
): Promise<T> => {
  const res = await fetch(`/contracts/${name}.sol/${name}.json`);
  const Artifact = await res.json();

  console.log("Artifact", Artifact);

  let contract: IGenericContract<T> = null;
  try {
    contract = new ethers.Contract(contractAddress, Artifact.abi, signer);
  } catch (e) {
    console.log(`Contract ${name} cannot be loaded`, e);
  }

  return contract as T;
};
