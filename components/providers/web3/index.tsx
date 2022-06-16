import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { SetupHooks, setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";

type Props = {
  children?: ReactNode;
};

type Web3Api = {
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  contract: ethers.Contract | null;
  isLoading: boolean;
  hooks: SetupHooks | null;
};

type TUseWeb3 = {
  requireInstall: boolean;
  connect: () => void;
} & Web3Api;
const Web3Context = createContext(null);

const createWeb3State = ({
  provider,
  contract,
  isLoading,
  signer,
}): Web3Api => {
  return {
    // web3,
    provider,
    signer,
    contract,
    isLoading,
    hooks: setupHooks(provider, contract),
  };
};

const Web3Provider = ({ children }: Props) => {
  const [web3Api, setWeb3Api] = useState<Web3Api>(
    createWeb3State({
      provider: null,
      signer: null,
      contract: null,
      isLoading: true,
    })
  );
  useEffect(() => {
    const loadProvider = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        const signer = provider.getSigner();
        const contract = await loadContract("ArticleMarketplace", signer);
        setWeb3Api(
          createWeb3State({
            provider,
            signer,
            contract,
            isLoading: false,
          })
        );
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
    const { provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !provider,
      connect: provider
        ? async () => {
            try {
              await provider.send("eth_requestAccounts", []);
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
  (hooks: SetupHooks): (...args: any[]) => T;
}

export const useWeb3 = (): TUseWeb3 => {
  return useContext(Web3Context);
};

export const useHooks = <T,>(cb: cbInterface<T>) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};

export default Web3Provider;
