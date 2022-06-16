import useSWR, { SWRResponse } from "swr";
import { useEffect } from "react";
import { ethers } from "ethers";

const adminAdresses = {
  "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9": true,
};

export interface AccountType extends SWRResponse<string, any> {
  isAdmin: boolean;
  hasInitialResponse: boolean;
}

export type TCreateUseAccountHookReturn = {
  account: AccountType;
};

export const handler = (
  provider: ethers.providers.Web3Provider
) => (): TCreateUseAccountHookReturn => {
  const { mutate, data, error, ...rest } = useSWR(
    () => (provider ? "web3/accounts" : null),
    async () => {
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      if (!account) {
        throw new Error(
          "Cannot retrieve an account. Please refresh the browser."
        );
      }
      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => {
      console.log("accounts changed");
      mutate(accounts[0] ?? null);
    };
    (provider?.provider as any)?.on("accountsChanged", mutator);

    return () => {
      (provider?.provider as any)?.removeListener("accountsChanged", mutator);
    };
  }, [provider, mutate]);

  return {
    account: {
      data,
      error,
      isAdmin: (data && adminAdresses[ethers.utils.keccak256(data)]) ?? false,
      hasInitialResponse: !!(data || error),
      mutate,
      ...rest,
    },
  };
};
