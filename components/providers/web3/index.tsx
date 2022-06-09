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
import { SetupHooks, setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";

type Props = {
  children?: ReactNode;
};

type Web3Api = {
  provider: MetaMaskInpageProvider;
  web3: Web3;
  contract: any;
  isLoading: boolean;
  hooks: SetupHooks | null;
};

type TUseWeb3 = {
  requireInstall: boolean;
  connect: () => void;
} & Web3Api;
const Web3Context = createContext(null);

const Web3Provider = ({ children }: Props) => {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks(null, null),
  });
  useEffect(() => {
    const loadProvider = async () => {
      const provider = (await detectEthereumProvider()) as MetaMaskInpageProvider;

      if (provider) {
        const web3 = new Web3(provider as any);
        const contract = await loadContract("CourseMarketplace", web3);
        setWeb3Api({
          provider,
          web3,
          contract,
          isLoading: false,
          hooks: setupHooks(web3, provider),
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

  const _web3Api: TUseWeb3 = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
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

interface cbInterface<T> {
  (hooks: SetupHooks): () => T;
}

export const useWeb3 = (): TUseWeb3 => {
  return useContext(Web3Context);
};

export const useHooks = <T,>(cb: cbInterface<T>) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};

export default Web3Provider;
