import useSWR, { SWRResponse } from "swr";
import { useEffect } from "react";
import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

const adminAdresses = {
  "0x5c964aa0bb889c6028c526eacbd34e3618025006be54bb82fad703edf0fd87b0": true,
};

export interface AccountType extends SWRResponse<string, any> {
  isAdmin: boolean;
}

export type TCreateUseAccountHookReturn = {
  account: AccountType;
};

export const handler = (
  web3: Web3,
  provider: MetaMaskInpageProvider
) => (): TCreateUseAccountHookReturn => {
  const { mutate, data, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider, mutate]);

  return {
    account: {
      data,
      isAdmin: (data && adminAdresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};
