import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";

import Web3 from "web3";
import { provider } from "web3-core";
import { setupHooks } from "./hooks/setupHooks";
type Props = {
  children?: ReactNode;
};

type Web3Api = {
  provider: MetaMaskInpageProvider;
  web3: Web3;
  contract: any;
  isLoading: boolean;
};
const Web3Context = createContext(null);

const Web3Provider = ({ children }: Props) => {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
  });
  useEffect(() => {
    const loadProvider = async () => {
      const provider = (await detectEthereumProvider()) as MetaMaskInpageProvider;

      if (provider) {
        const web3 = new Web3(provider as provider);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
        });
      } else {
        setWeb3Api((prev) => ({
          ...prev,
          isLoading: false,
        }));
        console.error("Please, install Metamask.");
      }
    };
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider } = web3Api;
    return {
      ...web3Api,
      isWeb3Loaded: web3 != null,
      getHooks: () => setupHooks(web3, provider),
      connect: provider
        ? async () => {
            try {
              await provider.request({
                method: "eth_requestAccounts",
              });
            } catch {
              location.reload();
            }
          }
        : () => {
            console.error(
              "Cannot connect to Metamask, try to reload your browser please!"
            );
          },
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const useHooks = (cb) => {
  const { getHooks } = useWeb3();
  return cb(getHooks());
};

export default Web3Provider;
