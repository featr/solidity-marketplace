import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const loadContract = async (
  name: string,
  signer: ethers.providers.JsonRpcSigner | ethers.providers.Web3Provider
): Promise<ethers.Contract> => {
  const res = await fetch(`/contracts/${name}.sol/${name}.json`);
  const Artifact = await res.json();

  let contract: ethers.Contract = null;
  // console.log("ABI", Artifact.abi);
  try {
    contract = new ethers.Contract(CONTRACT_ADDRESS, Artifact.abi, signer);
    const owner = await contract.getContractOwner();
  } catch (e) {
    console.log(`Contract ${name} cannot be loaded`, e);
  }

  return contract;
};
