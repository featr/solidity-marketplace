import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Contract } from "web3-eth-contract";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";
import { SetupHooks, setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";

type Props = {
  children?: ReactNode;
};

type Web3Api = {
  provider: MetaMaskInpageProvider;
  web3: Web3;
  contract: Contract | null;
  isLoading: boolean;
  hooks: SetupHooks | null;
};

type TUseWeb3 = {
  requireInstall: boolean;
  connect: () => void;
} & Web3Api;
const Web3Context = createContext(null);

const createWeb3State = ({ web3, provider, contract, isLoading }): Web3Api => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks(web3, provider, contract),
  };
};

const Web3Provider = ({ children }: Props) => {
  const [web3Api, setWeb3Api] = useState<Web3Api>(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );
  useEffect(() => {
    const loadProvider = async () => {
      const provider = (await detectEthereumProvider()) as MetaMaskInpageProvider;

      if (provider) {
        const web3 = new Web3(provider as any);
        const contract = await loadContract("CourseMarketplace", web3);
        setWeb3Api(
          createWeb3State({
            web3,
            provider,
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
  (hooks: SetupHooks): (...args: any) => T;
}

export const useWeb3 = (): TUseWeb3 => {
  return useContext(Web3Context);
};

export const useHooks = <T,>(cb: cbInterface<T>) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};

export default Web3Provider;
