import Web3 from "web3";
import { Contract } from "web3-eth-contract";
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
  name: string,
  web3: Web3
): Promise<Contract> => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  let contract: Contract | null = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch (e) {
    console.log(`Contract ${name} cannot be loaded`, e);
  }

  return contract;
};
